# Vendored skill

`ui-ux-pro-max` — design intelligence (searchable UI styles, palettes, font
pairings and UX rules), used here to audit and refine the site's design.

- Upstream: https://github.com/nextlevelbuilder/ui-ux-pro-max-skill
- Commit:   ed766d3bf62f32c8d27762ad49abdc3a4744c84f
- Licence:  MIT (see LICENSE in this folder)

Copied in rather than installed as a plugin so the rules travel with the repo
and any session working on this site has them without extra setup.

To search it:

    python3 .claude/skills/ui-ux-pro-max/scripts/search.py "focus states" --domain ux

To update, re-copy `.claude/skills/ui-ux-pro-max` from a newer upstream tag.
