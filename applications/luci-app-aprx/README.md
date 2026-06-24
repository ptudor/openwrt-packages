# luci-app-aprx

LuCI web interface for the [aprx](../../net/aprx/) APRS iGate/Digipeater daemon.
Adds **Services → aprx APRS iGate** with two views:

- **Configuration** — a raw editor for `/etc/aprx.conf`. aprx is *not* a UCI
  application (its rich, Apache-style config has no UCI equivalent), so the view
  loads the file into a monospace editor. **Save** writes the file; **Save &
  Apply** writes it and restarts the procd service.
- **Log** — a live tail of `logread -e aprx`, mirroring luci-app-galmon.

Depends on the `aprx` package (`LUCI_DEPENDS:=+aprx`).

### Installation

Prefer the feed (see the repo-root `README.md`). Select **LuCI → Applications →
luci-app-aprx** in menuconfig. The shortcut for hacking on it in place:

```
cp -a ~/Git/infra/openwrt-packages/applications/luci-app-aprx ~/openwrt/feeds/luci/applications/luci-app-aprx
cd ~/openwrt/package/feeds/luci; ln -s ../../../feeds/luci/applications/luci-app-aprx
```

### When updating strings for translation

```
cd ~/openwrt/feeds/luci
./build/i18n-scan.pl applications/luci-app-aprx  > applications/luci-app-aprx/po/templates/aprx.pot
./build/i18n-update.pl applications/luci-app-aprx/po
```

See `BRAND-NAMES.md` for how the APRS/ham proper nouns are treated across locales.

### Permissions

`root/usr/share/rpcd/acl.d/luci-app-aprx.json` grants exactly what the two views
need: read+write on `/etc/aprx.conf`, exec of `/sbin/logread` (Log view), and
exec of `/etc/init.d/aprx` (the restart on Save & Apply).

### Reference

- https://github.com/openwrt/luci/wiki/CBI
- https://github.com/openwrt/luci/wiki/i18n
