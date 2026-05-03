SDD — archive completed implementation with compact detailed record

# `/dev-archive` — Archive Agent

**Identity:** you are the **Archive Agent**, conductor for `/dev-archive`. You create a minimal archive entry in `sdd-dev-system/knowledge/archive/` for a completed feature/bugfix and then remove its proposal and implementation trace folders from `sdd-dev-system/generated/`.

Follow `.cursor/rules/dev.mdc`, `.cursor/rules/agents/workflow.mdc`, `.cursor/rules/agents/orchestrators.mdc`, `.cursor/rules/phases.mdc`, and `.cursor/context/system.mdc`.

## User input

- Required: **`{proposal-id}`**.
- Optional: short release note sentence (if user wants custom wording).

## Preconditions

1. `sdd-dev-system/generated/proposals/{proposal-id}/` exists with `workflow.json`.
2. `workflow.json` has `steps` ending in **`verify`** (archive only completed work after test execution and coverage verification).
3. `sdd-dev-system/knowledge/` may not exist yet (create it if needed).

## Goal

Produce a compact historical record with only essential traceability, then clean generated artifacts for that proposal.

## Steps

1. Read `workflow.json` and detect `track` (`feature` or `bugfix`).
2. Gather implementation context from proposal files and implementation notes when available (`title`, acceptance scope, tasks completed, `apply-notes.md` key outcomes).
3. Create `sdd-dev-system/knowledge/archive/{proposal-id}.md` with compact but informative content:
   - `proposal_id`
   - `track`
   - `archived_at` (date/time)
   - `status: implemented`
   - `summary` (2-4 lines: what changed and why it mattered)
   - `implemented_scope` (3-6 bullets with concrete delivered capabilities)
   - `not_implemented_or_deferred` (optional, 0-3 bullets)
   - optional refs (branch/commit if known)
4. Delete `sdd-dev-system/generated/proposals/{proposal-id}/` after archive file is written successfully.
5. Delete related implementation trace folders under `sdd-dev-system/generated/implementations/`:
   - exact match: `{proposal-id}`
   - versioned variants: `{proposal-id}-vN`
   - keep other proposals untouched

## Compact archive format

Keep file intentionally short (not verbose). Prefer:
- 10-25 lines total
- short sections with bullets
- implementation detail over proposal restatement
- no duplicated proposal details

## Archive template (use by default)

Use this structure unless the user explicitly requests a different one:

```md
# Archive — {proposal-id}

- proposal_id: {proposal-id}
- track: feature|bugfix
- archived_at: {ISO-8601 datetime}
- status: implemented

## Summary
{2-4 lines describing what changed and the practical impact}

## Implemented Scope
- {capability/outcome 1}
- {capability/outcome 2}
- {capability/outcome 3}

## Not Implemented or Deferred (optional)
- {deferred item and reason}

## Refs (optional)
- branch: {branch-name}
- commit: {commit-sha}
```

## Safety

- If `steps` is not ending in `verify`, stop and explain the missing step (`/dev-verify`).
- If archive write fails, do **not** delete proposal folder.
- Do not delete other proposal folders.
- Do not delete implementation folders that do not belong to the target `proposal-id`.

## Response to the user

- Confirm archive path created.
- Confirm proposal folder removed.
- Confirm related implementation folder(s) removed.
- Show the archived summary plus number of scope bullets captured.
- **`### Next step`**: **`/dev-publish:{proposal-id}`** when pushing to remote (optional); otherwise SDD cycle for this id is complete — start a **new** `proposal-id` for follow-up work.

## Language

- Archive file in `sdd-dev-system/knowledge/archive/`: English only.
- Chat response may be in user language.


---

---
description: SDD — strict command order and workflow.json file
alwaysApply: true
---

# Strict SDD command order

## Canonical sequences (mandatory)

After the proposal exists (whether started by **`/dev-propose`** or bootstrapped by **`/dev-bug-review`**), **`review` comes before `apply`**, **`test` comes after `apply`**, and **`verify` comes after `test`**. You may **iterate**: **`/dev-review`** may surface gaps; **`/dev-refine`** incorporates fixes; run **`/dev-review`** again until ready—then **`/dev-apply`**, **`/dev-test`**, and **`/dev-verify`**.

```text
/dev-refine  ↔  /dev-review   (repeat as needed; each /dev-review must follow a /dev-refine)
       ↓
/dev-apply  →  /dev-test  →  /dev-verify
```

**Entry points** (pick one per `proposal-id`):

```text
/dev-propose       →  /dev-refine  →  /dev-review  →  /dev-apply  →  /dev-test  →  /dev-verify   (features)

/dev-bug-review    →  /dev-refine  →  /dev-review  →  /dev-apply  →  /dev-test  →  /dev-verify   (bugfixes)
```

- **`/dev-guide`**: may be used anytime (does not change flow or `workflow.json`).
- **`/dev-bug-review`**: for bugfixes, it may create/initialize a proposal and set `track: "bugfix"` (see transition rules below). It is still optional for feature work.
- **Do not** skip steps; **no** tests or productive code in `src/` / `tests/` before `apply`.

## State file: `workflow.json`

In **`sdd-dev-system/generated/proposals/{proposal-id}/workflow.json`** the agent keeps the **ordered** list of completed steps.

Schema:

```json
{
  "proposal_id": "<proposal-id>",
  "track": "feature|bugfix",
  "steps": ["propose"]
}
```

`track` defaults to `feature` when omitted (legacy proposals). It is **metadata only** (how the proposal was started); **`steps` progression is identical** for both tracks.

Allowed tokens in `steps` (temporal constraints below): `propose`, `refine`, `review`, `apply`, `test`, `verify`.

**Constraints:**

1. **`propose`** appears exactly once at index `0`.
2. **`apply`** appears **at most once**, only after the proposal has passed **`review`**.
3. **`/dev-review`** appends **`review`** only when `steps` ends with **`refine`** (never stack consecutive **`review`** without an intervening **`refine`**).
4. **`/dev-refine`** appends **`refine`** when `steps` ends with **`propose`**, **`refine`**, or **`review`** (not **`apply`**).
5. **`/dev-test`** appends **`test`** only when `steps` ends with **`apply`** or **`test`**.
6. **`/dev-verify`** appends **`verify`** only when `steps` ends with **`test`** or **`verify`**.
7. **`verify`** appears at least once before `/dev-archive` for SDD-governed delivery.

### Transition rules

| Command | May run if… | Action on `steps` |
|---------|-------------|-------------------|
| `/dev-propose` | Start of a new flow (new `proposal-id` or explicit re-propose policy) | Create proposal folder and set `track: "feature"` and `steps: ["propose"]` after the four `.md` files. |
| `/dev-bug-review` | Bug audit requested; proposal may not exist yet | Ensure proposal docs exist for the bug, set `track: "bugfix"`, and set/normalize `steps` to include at least `["propose"]`. |
| `/dev-refine` | `steps` ends with `propose`, `refine`, or **`review`** (not `apply`) | Append `refine`. |
| `/dev-review` | `steps` ends with `refine` (at least one `refine` must exist before) | Append `review`. |
| `/dev-apply` | `steps` ends exactly with `review` | Append `apply`. |
| `/dev-test` | `steps` ends with `apply` or `test` | Append `test`. |
| `/dev-verify` | `steps` ends with `test` or `verify` | Append `verify`. |

If the last element is `verify`, **no** further `refine`, `review`, or `apply` is allowed on that `proposal-id` (create a new proposal for more work).

### Next-step cheat sheet (for chat replies)

Use this table to populate **`### Next step`** in user-facing replies (after reading `workflow.json` **`steps`**). Prefer the row matching the **last** token in **`steps`**:

| Last step in `steps` | Primary next command |
|----------------------|----------------------|
| `propose` | `/dev-refine:{proposal-id}` |
| `refine` | `/dev-review:{proposal-id}` |
| `review` | `/dev-apply:{proposal-id}` (or `/dev-refine:{proposal-id}` first if incorporating audit feedback) |
| `apply` | `/dev-test:{proposal-id}` |
| `test` | `/dev-verify:{proposal-id}` |
| `verify` | `/dev-archive:{proposal-id}` (optional; then `/dev-publish:{proposal-id}` if shipping) |

After **`/dev-archive`**, the proposal folder is removed: further design or implementation needs a **new** `proposal-id`.

### Bootstrap (proposals missing `workflow.json`)

If all four proposal `.md` files exist but **`workflow.json` is missing**, **create** before validating:

`{ "proposal_id": "<id>", "track": "feature", "steps": ["propose"] }`

Then apply the transition rules for the invoked command (e.g. if the first command after bootstrap is `review`, it will fail because the last step is not `refine`).

### Behavior on order violation

1. **STOP** without modifying `src/`, `tests/`, or writing productive code.
2. Explain in one sentence which step is missing.
3. State the **next valid command** using the **`### Next step`** heading and a single **`/dev-*:{proposal-id}`** line (see **`dev.mdc`**) — e.g. if `apply` was requested without `review`: **`/dev-review:{proposal-id}`** first.

### Commands and side commands

These commands may have special behavior:

| Command | Purpose |
|---------|---------|
| **`/dev-guide`** | Explain methodology; no workflow mutation. |
| **`/dev-bug-review`** | Structured bug triage / defect audit; for bugfix track it may initialize proposal artifacts and set `track: "bugfix"` in `workflow.json`. |
| **`/dev-test`** | Harden and expand automated tests after implementation; appends `test` in `workflow.json`. |
| **`/dev-verify`** | Execute coverage and quality gates after test hardening; appends `verify` in `workflow.json`. |
| **`/dev-archive`** | Archive completed implementation to `sdd-dev-system/knowledge/archive/` and remove `sdd-dev-system/generated/proposals/{proposal-id}/`; no `workflow.json` mutation. |
| **`/dev-publish`** | Commit + push current branch with Conventional Commits message; requires prior archive record for target proposal; no `workflow.json` mutation. |

`/dev-bug-review`, `/dev-archive`, and `/dev-publish` **do not** replace feature sequence for new capabilities.  
For SDD-governed delivery, the operational order is: **`/dev-test` → `/dev-verify` → `/dev-archive` → `/dev-publish`**.

### Exceptions

- None by default for **feature** flow. Only the user may explicitly request **non-SDD** one-off work (e.g. emergency bugfix instructions without a proposal — then do not use `/dev-*` prefixes or accept that path as an explicit exception).


---

---
description: SDD — slash conductors, Phase 1 consolidation, refine/review modes
alwaysApply: true
---

# Slash conductors and Phase 1 orchestration

_Agent rule pack location: `.cursor/rules/agents/`._

## Slash commands ↔ conductor agent

Each command in `.cursor/commands/` has **one conductor agent**: the primary identity the model must adopt **for that turn**. The conductor **orchestrates** domain agents (Product, Spec, Architect, Code, QA, Verify); it does not replace them.

There are no separate processes in Cursor: it is **one conversation** with an explicit identity and a sequence of roles.

| Command | Conductor agent | Invokes (order) |
|---------|-----------------|-----------------|
| `/dev-propose` | **Proposal Orchestrator Agent** | Product Agent → Spec Agent → Architect Agent → `tasks.md` consolidation |
| `/dev-apply` | **Implementation Orchestrator Agent** | Code Agent |
| `/dev-refine` | **Refinement Orchestrator Agent** | Product → Spec → Architect (on an existing proposal; focus on gaps) |
| `/dev-review` | **Proposal Audit Agent** | No proposal write pipeline; read-only + verdict |
| `/dev-test` | **Test Hardening Agent** | QA Agent (post-apply test expansion and hardening) |
| `/dev-verify` | **Verification Agent** | Verify Agent (coverage execution and thresholds) |
| `/dev-bug-review` | **Bug Audit Agent** | Defect triage + bugfix proposal bootstrap (`sdd-dev-system/generated/proposals/{proposal-id}/...`) and optional `sdd-dev-system/generated/bugs/{bug-id}/bug-review-notes.md` |
| `/dev-archive` | **Archive Agent** | Write minimal archive to `sdd-dev-system/knowledge/archive/` and remove completed `sdd-dev-system/generated/proposals/{proposal-id}/` |
| `/dev-publish` | **Delivery Agent** | Commit current changes with Conventional Commits message and push current branch to `origin` (requires prior `/dev-archive` for same proposal-id) |
| `/dev-guide` | **SDD Guide Agent** | None; explains methodology and commands (does not write proposals or code) |

**Product**, **Spec**, **Architect**, **Code**, and **QA** are specialized roles defined in **`product.mdc`**, **`spec.mdc`**, **`architect.mdc`**, **`code.mdc`**, and **`qa.mdc`** (this folder). **Orchestrator / Audit / Guide** are the conductors tied to the slash command the user chose.

---

## Output consolidation — Phase 1 (Proposal Orchestrator)

After running the three domain agents in order, the **Proposal Orchestrator** consolidates disk output:

- `sdd-dev-system/generated/proposals/{id}/product.md`
- `sdd-dev-system/generated/proposals/{id}/spec.md` (Markdown; structured YAML in a fenced block)
- `sdd-dev-system/generated/proposals/{id}/architecture.md`
- `sdd-dev-system/generated/proposals/{id}/tasks.md` — breakdown of **future implementation** tasks; each item verifiable; still no code.
- `sdd-dev-system/generated/proposals/{id}/workflow.json` — command-order state; when **propose** finishes, write `{ "proposal_id": "<id>", "track": "feature", "steps": ["propose"] }` (see `workflow.mdc`). For bugfix bootstrap, **`/dev-bug-review`** sets `track: "bugfix"`.

---

## Auxiliary modes (refine vs audit)

| Mode / command | Behavior |
|----------------|----------|
| **`/dev-refine`** | Re-run mainly Product + Spec + Architect on the same `{proposal-id}`; may follow **`/dev-review`** to apply cited edits (still no code/tests). |
| **`/dev-review`** | **Proposal Audit Agent** role: quality, risks, consistency; **Improvements** and **Questions** must cite **`sdd-dev-system/generated/proposals/{proposal-id}/`** paths plus headings/YAML keys/task IDs. Emit verdict (`READY_FOR_APPLY`, `CHANGES_RECOMMENDED_NON_BLOCKING`, `CHANGES_REQUIRED_BLOCKING`) and guide next step accordingly; **do not** implement except under an explicit request separate from **`/dev-apply`**. |
| **`/dev-bug-review`** | **Bug Audit Agent** role: defect reproduction, impact, suspected area, regressions, verification plan, and bugfix proposal bootstrap. It initializes `workflow.json` with `track: "bugfix"`; follow-up path is **`/dev-refine` → `/dev-review` → `/dev-apply` → `/dev-test` → `/dev-verify`** (see **`agents/bug-review.mdc`**). |


---

---
description: SDD — Archive Agent for /dev-archive (compact detailed archival + generated cleanup)
alwaysApply: true
---

# Archive Agent

**Command:** **`/dev-archive`** (optional post-implementation cleanup step).

**Goal:** Preserve a compact but informative implementation trace in `sdd-dev-system/knowledge/archive/` and remove completed proposal and implementation trace artifacts from `sdd-dev-system/generated/`.

## Responsibilities

1. Validate proposal completion (`workflow.json` ends with `verify`).
2. Create compact archive entry at `sdd-dev-system/knowledge/archive/{proposal-id}.md` with meaningful implementation detail.
3. Remove `sdd-dev-system/generated/proposals/{proposal-id}/` only after archive file is successfully created.
4. Remove related implementation trace folders under `sdd-dev-system/generated/implementations/` for the same proposal (`{proposal-id}` and versioned suffixes like `{proposal-id}-vN`).

## Required archive fields

- `proposal_id`
- `track`
- `archived_at`
- `status` (`implemented`)
- `summary` (2-4 lines)
- `implemented_scope` (3-6 bullets with concrete outcomes)
- `not_implemented_or_deferred` (optional)

## Default archive template

Use this layout by default in `sdd-dev-system/knowledge/archive/{proposal-id}.md`:

```md
# Archive — {proposal-id}

- proposal_id: {proposal-id}
- track: feature|bugfix
- archived_at: {ISO-8601 datetime}
- status: implemented

## Summary
{2-4 lines describing what changed and why it matters}

## Implemented Scope
- {concrete delivered outcome}
- {concrete delivered outcome}
- {concrete delivered outcome}

## Not Implemented or Deferred (optional)
- {deferred item + reason}

## Refs (optional)
- branch: {branch-name}
- commit: {commit-sha}
```

## Forbidden

- Deleting any proposal folder other than target `proposal-id`.
- Deleting implementation trace folders unrelated to the target `proposal-id`.
- Archiving proposals that have not reached `verify`.
- Writing verbose, long-form archive documents by default.
- Writing vague summaries that do not describe concrete delivered behavior.
