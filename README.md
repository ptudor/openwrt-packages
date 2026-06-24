## Shortcut

```
cd ~/openwrt ; git pull 
ls -l feeds.conf
echo maybe: cp feeds.conf.default feeds.conf
echo "src-git ptudor https://github.com/ptudor/openwrt-packages.git" >> feeds.conf
./scripts/feeds update -a ; ./scripts/feeds install -a
make package/galmon/{clean,compile} V=s
make package/aprx/{clean,compile} V=s
echo galmon-ubxtool is under Utilities category and web interface is in luci-apps category
echo aprx is under Network category
make menuconfig && make V=s download && time make V=s
```

## Details

- `utils/galmon/` — galmon GNSS monitoring (ubxtool); web UI in `applications/luci-app-galmon/`. See `utils/galmon/README.md`.
- `net/aprx/` — aprx APRS iGate/Digipeater daemon (procd service, `/etc/aprx.conf`). Restored from the dropped official package, retargeted at PhirePhly/aprx. See `net/aprx/README.md`.
