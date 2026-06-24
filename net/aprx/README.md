# aprx -- OpenWrt package

APRS Rx/Tx iGate and Digipeater daemon. This restores the `aprx` package that
was dropped from the official OpenWrt feed (upstream went unmaintained) and
retargets it at the still-good maintained fork,
[PhirePhly/aprx](https://github.com/PhirePhly/aprx).

The source is pinned to master commit `2c84448` (v2.9.1 + two 2021-09-21 logging
fixes) -- the exact revision vendored at `~/Git/third_party/aprx`.

## Preparation

After creating and testing your OpenWrt build environment, add the feed and
update your index.

```
cd ~/openwrt ; git pull
ls -l feeds.conf
echo maybe: cp feeds.conf.default feeds.conf
echo "src-git ptudor https://github.com/ptudor/openwrt-packages.git" >> feeds.conf
./scripts/feeds update -a ; ./scripts/feeds install -a
```

## Build

Test a build of the package on its own:

```
make package/aprx/{clean,compile} V=s
```

Select **Network -> aprx** in menuconfig, then build your image:

```
make menuconfig && make V=s download && time make V=s
```

### Pin the download mirror (optional, recommended)

The Makefile intentionally omits `PKG_MIRROR_HASH`. The first download prints
the tarball checksum:

```
make package/aprx/download V=s
```

Copy the printed `PKG_MIRROR_HASH:=<sha256>` line into `net/aprx/Makefile` to
lock the source tarball.

## Configuration

aprx is **not** UCI-configured. Its rich, Apache-style config lives in
`/etc/aprx.conf`. The package ships the upstream sample as a conffile so a plain
`opkg install aprx` gives you something to edit, but in an image build your own
`~/openwrt/files/etc/aprx.conf` overlay takes precedence and survives sysupgrade
(it is a registered conffile).

At minimum you must set `mycall`, pick an interface (`serial-device` or
`ax25-device`), and -- to gate to APRS-IS -- set a valid `passcode` for your
callsign in the `<aprsis>` block.

## Service

The daemon runs under procd, started late at boot (`START=90`) so the network
and serial/USB nodes are up first. It runs `aprx -f /etc/aprx.conf -i` (the
`-i` flag keeps it in the foreground for procd to supervise).

```
service aprx restart ; logread -f
service aprx reload          # picks up /etc/aprx.conf changes
aprx-stat                    # interface / erlang statistics
```

Like kplex and the gps daemon on the existing .91/.92 boxes, this is a
long-running serial process; procd respawns it if it dies.

## Notes / list of design choices

- **Version pinning** -- `PKG_SOURCE_VERSION` is the full commit hash, matching
  the vendored `third_party/aprx` checkout. `MAKE_FLAGS += VERSION=2.9.1`
  overrides aprx's `git describe`, which would otherwise pick up OpenWrt's own
  git tags and bake the wrong version into the binary (the same trap the galmon
  package documents).
- **`--with-embedded`** -- keeps the footprint small; matches the original
  package. (In current aprx this is effectively always-on, kept for clarity.)
- **`+libpthread`** -- aprx links `-pthread` by default; the dependency is a
  no-op stub on musl but correct.
- **Cross-build safety** -- aprx's autoconf `configure` uses compile-only
  feature tests (no run-tests), so it cross-compiles cleanly.
