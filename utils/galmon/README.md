# Package for OpenWRT

November 2020.
Drop protobuf to 3.8 if 3.13 fails, it happened this week.

## Preparation:

After creating and testing your OpenWRT build environment, 
add the feed and update your index.

```
cd ~/openwrt ; git pull 
ls -l feeds.conf
echo maybe: cp feeds.conf.default feeds.conf
echo "src-git ptudor https://github.com/ptudor/openwrt-packages.git" >> feeds.conf
./scripts/feeds update -a ; ./scripts/feeds install -a
```

## Installation

Test a build of the package:

```
make package/galmon/{clean,compile} V=s
```

Select the Galmon package from the Utilities menu and build your image.

```
make menuconfig && make V=s download && time make V=s
```

After updating your firmware, ubxtool should be running or crashing.

```
service ubxtool restart ; logread -f
```

## Configuration

You may wish to update the configuration before compiling your image.
Consider updating your overlay files, like ~/openwrt/files/etc/config/galmon
instead of the package source in the feeds directory. Be cautious to not
hardcode values that may overlap or have unexpected results: 
Customizing the owner and remark is a timesaver but setting a valid
destination or station id in a shared image will lead to a future mistake.

Using ssh after installation to edit the file /etc/config/galmon is a simple option.

## List of Patches:

### 002-Makefile
Patch to only compile ubxtool, replace O3 with Os, and remove complex "install" target

### 010-ubxtool.cc
For poll.h vs sys/poll.h

### 099-update-git-hash-if-necessary
Reset to compiled date because otherwise it injects the openwrt git information

## To-do

Web configuration of service.
