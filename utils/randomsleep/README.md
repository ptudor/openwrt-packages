# randomsleep -- OpenWrt package

A tiny, cryptographically secure "sleep a random amount of time" utility,
intended for cron jobs to add jitter and avoid the *thundering herd* problem
where many devices hit a server at the same second. Upstream:
[ptudor/randomsleep](https://github.com/ptudor/randomsleep).

The source is pinned to `main` commit `f7cc6df`. The package builds the Linux
variant (`grandomsleep.c`), which uses the `getrandom(2)` syscall with rejection
sampling for an unbiased range -- this compiles cleanly against musl on the
ramips/MIPS targets with no source changes.

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
make package/randomsleep/{clean,compile} V=s
```

Select **Utilities -> randomsleep** in menuconfig, then build your image:

```
make menuconfig && make V=s download && time make V=s
```

### Pin the download mirror (optional, recommended)

The Makefile intentionally omits `PKG_MIRROR_HASH`. The first download prints
the tarball checksum:

```
make package/randomsleep/download V=s
```

Copy the printed `PKG_MIRROR_HASH:=<sha256>` line into `utils/randomsleep/Makefile`
to lock the source tarball.

## Usage

```
randomsleep [-q] [-f floor] [-c ceiling]
```

With no flags it sleeps a random 0-1800 seconds (30 minutes). `-f`/`-c` set the
floor/ceiling in seconds, `-q` suppresses the "sleeping N seconds..." line.

```
# crontab: nightly backup with up to 10 minutes of jitter
0 3 * * * /usr/bin/randomsleep -q -c 600 && /path/to/backup.sh
```

## Notes / design choices

- **No init script / no UCI.** randomsleep is a one-shot CLI tool, not a daemon;
  it ships only `/usr/bin/randomsleep`.
- **Linux variant on purpose.** The upstream repo carries both a BSD source
  (`randomsleep.c`, `arc4random_uniform`) and a Linux source
  (`grandomsleep.c`, `getrandom(2)`). The package compiles the latter directly
  with the cross toolchain instead of invoking upstream's host-make selection.
- **musl/MIPS.** `getrandom()` and `<err.h>` are provided by musl; the source
  `#define`s `_GNU_SOURCE` (and the Makefile passes `-D_GNU_SOURCE` as well), so
  the build is portable across the ramips subtargets with no patches.
