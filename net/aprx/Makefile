#
# aprx -- APRS iGate / Digipeater daemon
#
# Restored for the ptudor OpenWrt feed from the (unmaintained, since removed)
# official net/aprx package, retargeted at Kenneth Finnegan's maintained fork:
#   https://github.com/PhirePhly/aprx
#
# This Makefile is free software, licensed under the GNU General Public
# License v2. aprx itself is BSD-3-Clause (see PKG_LICENSE below).
#

include $(TOPDIR)/rules.mk

PKG_NAME:=aprx
PKG_VERSION:=2.9.1
PKG_RELEASE:=1

# Pinned to PhirePhly/aprx master @ 2c84448 -- this is v2.9.1 plus two 2021-09-21
# logging fixes, and is exactly the revision vendored at ~/Git/third_party/aprx.
PKG_SOURCE_PROTO:=git
PKG_SOURCE_URL:=https://github.com/PhirePhly/aprx.git
PKG_SOURCE_VERSION:=2c84448fe6d897980234961a87ee4c1d4fad69ec
PKG_SOURCE:=$(PKG_NAME)-$(PKG_VERSION)-$(PKG_SOURCE_VERSION).tar.gz
PKG_SOURCE_SUBDIR:=$(PKG_NAME)-$(PKG_VERSION)
# The first `make package/aprx/download` prints the tarball sha256; paste it
# back here as PKG_MIRROR_HASH:=<sha256> to pin the download mirror.

PKG_MAINTAINER:=Patrick Tudor <openwrt@ptudor.net>
PKG_LICENSE:=BSD-3-Clause
PKG_LICENSE_FILES:=LICENSE

include $(INCLUDE_DIR)/package.mk

define Package/aprx
  SECTION:=net
  CATEGORY:=Network
  TITLE:=APRS iGate and Digipeater daemon
  URL:=https://github.com/PhirePhly/aprx
  DEPENDS:=+libpthread
endef

define Package/aprx/description
  Aprx is a highly configurable APRS (Automatic Packet Reporting System)
  Rx/Tx iGate and Digipeater daemon. It bridges packet radio TNCs reached
  over serial, KISS, or AX.25 interfaces to the APRS-IS network, and can
  digipeat on RF. It needs nothing beyond the C library and runs happily in
  the small memory footprint of an OpenWrt router. Configuration lives in the
  native Apache-style /etc/aprx.conf; the service is supervised by procd.
endef

# --with-embedded keeps the on-disk/RAM footprint minimal (matches the original
# OpenWrt package). The standard --prefix/--sysconfdir/--sbindir and the cross
# toolchain are supplied automatically by package.mk.
CONFIGURE_ARGS += \
	--with-embedded

# aprx's Makefile.in derives its version from `git describe`. Inside the OpenWrt
# build tree that walks up into OpenWrt's own .git and bakes the wrong version
# into the binary; pin it explicitly so the source revision is reported instead.
MAKE_FLAGS += \
	VERSION=$(PKG_VERSION)

define Package/aprx/conffiles
/etc/aprx.conf
endef

define Package/aprx/install
	$(INSTALL_DIR) $(1)/usr/sbin
	$(INSTALL_BIN) $(PKG_BUILD_DIR)/aprx $(1)/usr/sbin/aprx
	$(INSTALL_BIN) $(PKG_BUILD_DIR)/aprx-stat $(1)/usr/sbin/aprx-stat

	$(INSTALL_DIR) $(1)/etc
	$(INSTALL_CONF) $(PKG_BUILD_DIR)/aprx.conf $(1)/etc/aprx.conf

	$(INSTALL_DIR) $(1)/etc/init.d
	$(INSTALL_BIN) ./files/aprx.init $(1)/etc/init.d/aprx
endef

$(eval $(call BuildPackage,aprx))
