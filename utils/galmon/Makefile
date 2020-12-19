# Makefile for openwrt package for galmon
# Note this patches galmon source to only build ubxtool for size
# To-do: Tag a release as 1.0.0 instead of pulling master
LICENSE=GPL-3.0-only

include $(TOPDIR)/rules.mk

PKG_NAME:=galmon
#PKG_SOURCE_VERSION:=1.0.0
PKG_SOURCE_VERSION:=master
PKG_VERSION:=$(PKG_SOURCE_VERSION)

PKG_SOURCE_PROTO:=git
PKG_SOURCE_URL:=https://github.com/berthubert/galmon.git
#PKG_MAINTAINER:=Patrick Tudor <openwrt@ptudor.net>

PKG_SOURCE:=$(PKG_NAME)-$(PKG_VERSION).tar.bz2
PKG_SOURCE_SUBDIR:=$(PKG_NAME)-$(PKG_VERSION)

PKG_BUILD_DEPENDS:=libzstd protobuf protobuf-c/host libstdcpp
PKG_BUILD_PARALLEL:=0
PKG_INSTALL:=1

include $(INCLUDE_DIR)/package.mk

define Package/galmon/default
  SECTION:=utils
  CATEGORY:=Utilities
  URL:=https://galmon.eu
  #SUBMENU:=gps
endef

define Package/galmon
  $(call Package/galmon/Default)
  SECTION:=utils
  CATEGORY:=Utilities
  TITLE:=Open-Source GNSS Monitoring
  DEPENDS:=+libzstd +protobuf +libpthread +libstdcpp
endef

define Package/galmon/conffiles
/etc/config/galmon
endef

define Package/galmon/description
  Open-Source GNSS Monitoring galmon.eu
endef

define Package/galmon/install
	$(INSTALL_DIR) $(1)/etc/init.d
	$(INSTALL_BIN) ./files/etc/init.d/ubxtool \
		$(1)/etc/init.d/ubxtool

	$(INSTALL_DIR) $(1)/etc/config
	$(INSTALL_CONF) ./files/etc/config/galmon \
		$(1)/etc/config/galmon

	$(INSTALL_DIR) $(1)/usr/bin
	#$(INSTALL_BIN) $(PKG_INSTALL_DIR)/usr/bin/* $(1)/usr/bin/
	$(INSTALL_BIN) $(PKG_BUILD_DIR)/ubxtool $(1)/usr/bin/
endef

$(eval $(call BuildPackage,galmon))
