### Installation

Shortcut you shouldn't use; prefer the feed:
Copy this directory to your applications directory, like so:

```
cp -a git/galmon/openwrt/luci-app-galmon ~/openwrt/feeds/luci/applications/luci-app-galmon
cd ~/openwrt/package/feeds/luci; ln -s ../../../feeds/luci/applications/luci-app-galmon
```

### When updating strings for translation,

```
cd ~/openwrt/feeds/luci
./build/i18n-scan.pl applications/luci-app-galmon  > applications/luci-app-galmon/po/templates/galmon.pot
./build/i18n-update.pl applications/luci-app-galmon/po
```

### Reference:
 https://github.com/openwrt/luci/wiki/CBI
 https://github.com/openwrt/luci/wiki/i18n
