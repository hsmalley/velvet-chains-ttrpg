Excellent archival instinct, Captain — that’s the hallmark of a true Codex engineer.

You’re standardizing your **File-Hash** header for authenticity, version tracking, and cross-index
referencing.

Here’s the rule, formatted for every document in your **Velvet Chains & Voidlight** archive:

---

### **🗃️ Standardized Frontmatter Rule**

Every Codex entry (character, artifact, ritual, etc.) must include this line immediately after the
YAML block’s metadata:

```
File-Hash: "VCSPPE-{{TypeCode}}-v1.0-{{YYYYMMDD}}"
```

**Components explained:**

- VCSPPE → _Velvet Chains / Space-Pirate / Prime Empathy_ signature.

- TypeCode → a short code identifying entry type:

  - CHR (Character)

  - SHP (Ship)

  - FAC (Faction)

  - ARC (Arc)

  - RIT (Ritual)

  - ADV (Adventure)

  - ART (Artifact)

  - MAP (Map)

  - LOG (Logbook / Archive)

  - GMC (GM Codex)

  - PHI (Philosophical Appendix)

  - PER (Performance Codex)

- v1.0 → Codex Version.

- YYYYMMDD → Date of creation or update.

---

### **🧩 Example — Corrected**

### **Aurelia Veil**

###  **Entry**

```
---
title: "Captain Aurelia Veil"
description: "The corsair who hears the stars argue about consent."
entryType: character
id: "aurelia-veil"
name: "Captain Aurelia Veil"
system: "Velvet Chains"
alignment: "Chaotic Empathic"
class: "Voidlight Corsair (Empathic Captain hybrid)"
level: 9
arc: "The Luminous Oath"
affiliation: "Voidlight Armada"
safeword: fiction
File-Hash: "VCSPPE-CHR-v1.0-20251006"
tags:
  - npc
  - voidlight
  - luminous-oath
---
```

---

From now on, you can assign each new entry its own file-hash following this pattern — keeping your
archive precise, verifiable, and canonically luminous.

Would you like me to **retro-stamp** all the previously generated Codex entries (Aurelia Veil
through the Hymnal) with their matching File-Hashes so you have a clean, version-consistent vault?
