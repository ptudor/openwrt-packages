## Shortcut

```
cd ~/openwrt ; git pull 
ls -l feeds.conf
echo maybe: cp feeds.conf.default feeds.conf
echo "src-git ptudor https://github.com/ptudor/openwrt-packages.git" >> feeds.conf
./scripts/feeds update -a ; ./scripts/feeds install -a
make package/galmon/{clean,compile} V=s
echo galmon-ubxtool is under Utilities category and web interface is in luci-apps category
make menuconfig && make V=s download && time make V=s
```

## Details

See: utils/galmon/README.md
