#
# randomsleep -- cryptographically secure random sleep (cron jitter)
#
# A tiny single-source C utility that sleeps for a random interval to spread
# load and avoid the "thundering herd" problem in cron jobs. Source:
#   https://github.com/ptudor/randomsleep
#
# This Makefile is free software, licensed under the GNU General Public
# License v2. randomsleep itself is ISC-licensed (see PKG_LICENSE below).
#

include $(TOPDIR)/rules.mk

PKG_NAME:=randomsleep
PKG_VERSION:=1.0.0
PKG_RELEASE:=1

# Pinned to the upstream 1.0.0 release tag (== commit f7cc6df, "Improve
# production readiness ..."). PKG_MIRROR_HASH locks the generated source
# tarball, so a moved/retagged release is rejected rather than silently pulled.
PKG_SOURCE_PROTO:=git
PKG_SOURCE_URL:=https://github.com/ptudor/randomsleep.git
PKG_SOURCE_VERSION:=1.0.0
PKG_SOURCE:=$(PKG_NAME)-$(PKG_VERSION).tar.gz
PKG_SOURCE_SUBDIR:=$(PKG_NAME)-$(PKG_VERSION)
PKG_MIRROR_HASH:=c5befbe6888fa5795bd0ded758a70de8e21a6a35955aacd211d207b6390ee457

PKG_MAINTAINER:=Patrick Tudor <openwrt@ptudor.net>
PKG_LICENSE:=ISC
PKG_LICENSE_FILES:=README.md

include $(INCLUDE_DIR)/package.mk

define Package/randomsleep
  SECTION:=utils
  CATEGORY:=Utilities
  TITLE:=Cryptographically secure random sleep (cron jitter)
  URL:=https://github.com/ptudor/randomsleep
endef

define Package/randomsleep/description
  A lightweight utility that suspends execution for a cryptographically secure
  random interval. It is meant for cron jobs, where adding jitter prevents the
  "thundering herd" problem of many devices contacting a server at the same
  second. On Linux/musl it draws from the getrandom() syscall and uses
  rejection sampling for an unbiased range. With no flags it sleeps 0-1800
  seconds; -f/-c set the floor/ceiling and -q suppresses the announcement.
endef

# Single-source utility. The upstream repo ships a BSD Makefile (randomsleep.c,
# arc4random) and a GNUmakefile (grandomsleep.c, getrandom(2)); on OpenWrt we
# want the Linux variant, so compile grandomsleep.c directly with the cross
# toolchain rather than relying on upstream's host-make selection logic.
# grandomsleep.c #defines _GNU_SOURCE itself; -D_GNU_SOURCE is belt-and-braces
# so the getrandom() prototype in <sys/random.h> is always exposed under musl.
define Build/Compile
	$(TARGET_CC) $(TARGET_CFLAGS) $(TARGET_CPPFLAGS) $(TARGET_LDFLAGS) \
		-D_GNU_SOURCE \
		-o $(PKG_BUILD_DIR)/randomsleep \
		$(PKG_BUILD_DIR)/grandomsleep.c
endef

define Package/randomsleep/install
	$(INSTALL_DIR) $(1)/usr/bin
	$(INSTALL_BIN) $(PKG_BUILD_DIR)/randomsleep $(1)/usr/bin/randomsleep
endef

$(eval $(call BuildPackage,randomsleep))
