# Brand & technical terms in luci-app-galmon

How the proper nouns and technical identifiers in this app are rendered across
the locales in `po/`. Like the house catalog (`infra/translated-strings/BRAND-NAMES.md`)
this is a **policy plus a per-term table**, not best-effort: every term below has
a defined treatment so the strings agree across the config page, the service
menu, and the log view.

## How "keep Latin" is expressed in gettext

LuCI translations are GNU gettext `.po`. An **empty `msgstr` falls back to the
English `msgid` verbatim**, so "keep this term Latin in every locale" is encoded
by *leaving the entry untranslated* — it renders in the source Latin form. For a
term inside a sentence, the sentence is translated and the token is typed Latin
in place. `po/templates/galmon.pot` is the source of truth for the term
inventory.

## Tier 1 — Latin-verbatim, every locale (tool / wire / framework identifiers)

These are **load-bearing glyph sequences**: the operator cross-references them
against the u-blox receiver's datasheet, the `ubxtool` / `gpsd` command line, and
OpenWRT's own UI — all Latin in every market. There is no native `УАРТ` / `УСБ`
convention the way there is for `ГЛОНАСС`, so transliterating them would put two
scripts on the same identifier in adjacent fields and break cross-referencing.
This is the house **Tudor IRIG** rule (a wire-format designation stays Latin
everywhere), not the **Gemma GPS** rule (a spoken brand acronym that nativizes).

| Term | What it is | Treatment |
|---|---|---|
| `ubxtool` | the binary you run / grep for | Latin verbatim, all locales |
| `galmon.eu` | the collector domain | Latin verbatim (domains are never localized) |
| `LuCI` | the web-UI framework | Latin verbatim |
| `UART` | serial port type | Latin verbatim |
| `USB` | hardware bus | Latin verbatim |
| `TTL` | serial signal level | Latin verbatim |

The menu title `galmon.eu ubxtool`, and the sentences `Enable ubxtool.` /
`Syslog for ubxtool messages.` / the new `UART that is sending data to the
device. 3 for USB, 1 for TTL.`, keep these tokens Latin while the surrounding
words translate.

> Source fix: the section header read `uxbtool Service Configuration` — a typo
> for `ubxtool` that had propagated into every locale. Corrected at the source
> (`config.js`) and in all 18 translations.

## Tier 2 — the product wordmark `Galmon` / `galmon`

`Galmon` is the product/daemon name (per galmon.eu). It rides the house
**Gemma-style** wordmark rule:

- **Latin-script locales** keep `Galmon` — no pin.
- **Non-Latin locales** may render the established **phonetic** transliteration
  (by sound, never by meaning). Where a locale nativizes it, the bare title and
  the in-prose mentions use the same form (table below); elsewhere the
  empty-`msgstr` fallback keeps it Latin.

The one hard rule: `galmon` is **never translated by meaning**. Hindi shipped
`गैलन` ("gallon") for the daemon name — a wrong-sense mistranslation, corrected to
the phonetic `गैल्मन`.

| Locale | `Galmon` |
|---|---|
| ar / bg / ca / de / es / fr / ru / sv / uk / vi / zh-Hans / zh-Hant | Galmon *(Latin, no pin)* |
| he | גלמון |
| hi | गैल्मन |
| mr | गॅल्मन |
| bn | গ্যালমন |
| ja | ガルモン |
| ko | 갈몬 |

## Tier 3 — GNSS constellation & augmentation names

`GPS`, `Galileo`, `GLONASS`, `BeiDou`, `SBAS` follow the house **GNSS-acronym**
policy:

- **Latin-script** locales keep them Latin (empty `msgstr` → fallback).
- **CJK + JP + KO** keep the acronyms `GPS` / `SBAS` Latin (the native norm in
  CJK technical text) and may use the established Han/Kana name for a
  constellation (e.g. `北斗` for BeiDou, as zh and ja ship).
- **Other non-Latin** scripts may transliterate the name where an established
  form exists (ru `Глонасс`, `Бэйдоу`, `Галилео`; he; bn; mr).

Most locales simply leave these five entries empty (Latin fallback) — that is the
**correct** default, not a missing translation. Two audit cleanups:

- **`SBAS` stays Latin where a locale has no convention** — ru's invented `ССДК`
  was reverted to `SBAS`.
- **uk `Галілей` was the wrong proper noun** — that is the scientist *Galileo
  Galilei*; the satellite system is `Галілео`.

## `Syslog` is *not* pinned — it is a translatable concept

In `Syslog for ubxtool messages.`, `Syslog` is the **system-log concept**, so it
translates to each language's term (ru *Системный журнал*, uk *Системний журнал*)
or stays `Syslog` where that is the local norm; only `ubxtool` is held Latin.
This is the *Timecode* distinction from the house doc: translate the industry
**term**, pin the **identifier**.

## Caveats

The major-script forms (Cyrillic, CJK, Arabic, Hebrew, the Indic set) are solid;
the long-tail phonetic renderings of `Galmon` are best-effort and worth a
native-speaker spot-check, exactly as in the house catalog.

**Adding a locale:** leave the Tier-1 identifiers and the Tier-3 GNSS names
untranslated (Latin fallback). If you nativize the `Galmon` wordmark, use one
phonetic form for both the title and prose, and add it to the Tier-2 table.
