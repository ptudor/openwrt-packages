# Brand & technical terms in luci-app-aprx

How the proper nouns and technical identifiers in this app are rendered across
the locales in `po/`. Like luci-app-galmon's `BRAND-NAMES.md` (and the house
catalog `infra/translated-strings/BRAND-NAMES.md`), this is a **policy plus a
per-term table**, not best-effort: every term below has a defined treatment so
the strings agree across the config page, the service menu, and the log view.

## How "keep Latin" is expressed in gettext

LuCI translations are GNU gettext `.po`. An **empty `msgstr` falls back to the
English `msgid` verbatim**, so "keep this term Latin in every locale" is encoded
by *leaving the entry untranslated*. For a term inside a sentence, the sentence is
translated and the token is typed Latin in place. `po/templates/aprx.pot` is the
source of truth for the term inventory.

## Tier 1 — Latin-verbatim, every locale (tool / wire / framework identifiers)

These are **load-bearing glyph sequences**: the operator cross-references them
against the aprx manual, the `aprx.conf` keywords, and the APRS-IS protocol — all
Latin in every market. Transliterating them would put two scripts on one
identifier and break cross-referencing. This is the house **Tudor IRIG** rule (a
wire-format / config designation stays Latin everywhere).

| Term | What it is | Treatment |
|---|---|---|
| `aprx` | the daemon / binary you run and grep for | Latin verbatim, all locales |
| `aprx.conf` / `/etc/aprx.conf` | the config file path | Latin verbatim (paths are never localized) |
| `APRS` | Automatic Packet Reporting System (the protocol) | Latin verbatim |
| `APRS-IS` | the APRS Internet Service backbone | Latin verbatim |
| `LuCI` | the web-UI framework | Latin verbatim |
| `UCI` | OpenWrt's config system (named here only to say aprx is *not* it) | Latin verbatim |
| `mycall` | the `aprx.conf` keyword for the station callsign | Latin verbatim (it is a literal config token) |
| `passcode` | the `<aprsis>` config keyword | Latin verbatim (literal config token) |
| `serial-device` / `ax25-device` | `aprx.conf` interface keywords | Latin verbatim (literal config tokens) |

The config-page description sentence keeps `aprx`, `mycall`, `serial-device`,
`ax25-device`, and `APRS-IS passcode` Latin while the surrounding words
translate. The menu title `aprx APRS iGate` keeps `aprx`/`APRS` Latin.

## Tier 2 — `iGate` and `Digipeater`

`iGate` (Internet gateway) and `Digipeater` (digital repeater) are APRS terms of
art:

- **Latin-script locales** keep them Latin (no pin).
- **Non-Latin locales** may render an established native term where one exists,
  but `iGate`'s mixed-case `i`+`Gate` form is itself a recognized identifier in
  ham circles — prefer keeping it Latin unless a locale has a genuine convention.
  These are the *Timecode* distinction: translate the industry **concept** only
  where a real native term is in use; otherwise pin the **identifier**.

## `Syslog` / `Log` are *not* pinned — they are translatable concepts

In `Syslog for aprx messages.` the word `Syslog` is the **system-log concept** and
the menu's `Log` is the ordinary word, so both translate to each language's term
(or stay Latin where that is the local norm); only `aprx` is held Latin. Same
distinction as luci-app-galmon.

## Caveats

Major-script forms are solid; any phonetic renderings of `iGate`/`Digipeater` are
best-effort and worth a native-speaker spot-check.

**Adding a locale:** leave the Tier-1 identifiers untranslated (Latin fallback);
translate the surrounding prose, `Configuration`, `Log`, and the `Syslog` concept.
