SDD guide — methodology, commands, recommended flow

# `/dev-guide` — SDD Guide Agent

**Identity:** you are the **SDD Guide Agent**, conductor for `/dev-guide`. You **explain** methodology, commands, and flow only; you do not run Product/Spec/Architect/Code/QA or write proposals or code unless the user explicitly asks separately.

When the user runs **`/dev-guide`** (with or without extra questions), do the following:

1. **Deliver the guide** using the sections below as the base (you may reorder bullets or add **one** short example if it helps).
2. **Language:** Keep the **SDD methodology and guide sections** in **English** (this repo standard). You may wrap or explain in the **user’s chat language** (e.g. Spanish) for comprehension, but do not translate `.cursor/rules` or proposal paths into Spanish-only replacements—cite English names as-is.
3. If they ask something specific (e.g. “when do I use refine?”), answer **after** the short guide or weave it into the relevant section.
4. **Do not** run other commands (`/dev-propose`, etc.) unless the user explicitly asks in the same message.
5. Always include **`### Next step`** at the end of the guide response: tell them how to resume SDD **from their situation** (e.g. “If you already have `workflow.json`, open it — last token in `steps` → next command per cheat sheet below”).

---

## Base guide text (for the end user)

### What this is

This workspace uses **AI-assisted Spec-Driven Development (SDD)**:

- First you **document and design** what to build (no product code or automated tests).
- **You review** that proposal.
- Only then **implementation** (code and tests) happens when you explicitly move that step forward.

The point is to separate **“what and how at design level”** from **“executable code”**, reducing rework and inconsistent decisions.

### You don’t need to memorize the chain

Conductors following **`/dev-*`** commands must end replies with **`### Next step`** (see `.cursor/rules/dev.mdc`): one primary **`/dev-<command>: {proposal-id}`** plus a short reason. Use **`sdd-dev-system/generated/proposals/{proposal-id}/workflow.json`** → **`steps`** (last token) when unsure:

| Last token in `steps` | usual next command |
|-----------------------|-------------------|
| `propose` | `/dev-refine:{proposal-id}` |
| `refine` | `/dev-review:{proposal-id}` |
| `review` | `/dev-apply:{proposal-id}` |
| `apply` | `/dev-test:{proposal-id}` |
| `test` | `/dev-verify:{proposal-id}` |
| `verify` | `/dev-archive:{proposal-id}` (optional; then `/dev-publish:{proposal-id}`) |

Full rules: `.cursor/rules/agents/workflow.mdc`.

### Mental layers of the repo

| Layer | Short role |
|-------|------------|
| **specs** | In proposals: `spec.md` with a fenced YAML block; optional `specs/` folder. |
| **core / domain** | Business rules (typically under `src/` after apply). |
| **implementations** | App code in **`src/`** (not in `sdd-dev-system/generated/`). |
| **knowledge** | ADRs, decision notes, durable documentation. |

**`sdd-dev-system/generated/proposals/`** holds **proposal Markdown only**. Code lives in **`src/`** when you run **`/dev-apply`**.

### The two big phases

**Phase 1 — Proposal**  
Only product and design documents:

- `product.md` — problem, actors, scenarios, acceptance criteria.  
- `spec.md` — narrative + **one** ` ```yaml ` block with structured requirements (criteria, model, etc.).  
- `architecture.md` — entities, use cases, contracts, **code paths** if not using default `src/`.  
- `tasks.md` — verifiable plan for future implementation.

**Output:** `sdd-dev-system/generated/proposals/{proposal-id}/` (**only** those `.md` files plus `workflow.json`).  
**Important:** this phase does **not** generate code in `src/` or tests in `tests/`.

**Phase 2 — Implementation**  
Only after a coherent proposal **and** the strict workflow reaches **`review`**:

- **`src/`** — application code (default).  
- **`tests/`** — automated tests (default; hardened under **`/dev-test`** after **`apply`**).  
- **`sdd-dev-system/generated/implementations/{id}/apply-notes.md`** — trace notes (commands, coverage, deviations, risks).

By default **`sdd-dev-system/generated/implementations/.../code/`** is **not** the main app location.

### Available slash commands

Each command activates **one conductor agent** (table in `.cursor/rules/agents/orchestrators.mdc`; index in `agents.mdc`). That conductor sequences domain agents when applicable.

| Command | Conductor agent | What it does |
|---------|-----------------|----------------|
| **`/dev-propose`** | Proposal Orchestrator Agent | **Step 1.** Creates `sdd-dev-system/generated/proposals/{id}/` (4×`.md` + `workflow.json` with `["propose"]`). **Input:** description. |
| **`/dev-refine`** | Refinement Orchestrator Agent | After `propose`, **`refine`**, or **`review`** (not after `apply`). Appends `refine`. Use after **`/dev-review`** to apply cited fixes. **Input:** `{proposal-id}`. |
| **`/dev-review`** | Proposal Audit Agent | Only if `workflow` ends with `refine`. Appends `review`. Improvements/questions MUST cite **`sdd-dev-system/generated/proposals/{id}/…`** + locator. Returns verdict (`READY_FOR_APPLY`, `CHANGES_RECOMMENDED_NON_BLOCKING`, `CHANGES_REQUIRED_BLOCKING`). **Input:** `{proposal-id}`. |
| **`/dev-apply`** | Implementation Orchestrator Agent | Only if `workflow` ends with `review`. Implements **`src/`** (+ baseline notes); appends `apply`. **Input:** `{proposal-id}`. |
| **`/dev-test`** | Test Hardening Agent | Only if `workflow` ends with `apply` or `test`. Updates **`tests/`**, runs suites; appends `test`. **Input:** `{proposal-id}`. |
| **`/dev-verify`** | Verification Agent | Only if `workflow` ends with `test` or `verify`. Runs coverage and gates; appends `verify`. **Input:** `{proposal-id}`. |
| **`/dev-guide`** | SDD Guide Agent | Explains methodology and commands; does not write SDD artifacts unless explicitly requested. |
| **`/dev-bug-review`** | Bug Audit Agent | Optional **defect triage + proposal bootstrap** for bugfixes. Initializes `track: "bugfix"`; then same chain as features through **`verify`**. |
| **`/dev-archive`** | Archive Agent | Archives minimally once `workflow` reached **`verify`**; removes `sdd-dev-system/generated/proposals/{proposal-id}/` when safe. |
| **`/dev-publish`** | Delivery Agent | Commit + push **only after `/dev-archive`** for the same proposal-id. |

ID convention: something stable like `YYYYMMDD-HHMM-short-slug` or a UUID; **the same** ID links proposal and implementation.

### Mandatory flow (strict order)

```text
/dev-propose:{id}     →  creates proposal (Markdown only) + workflow.json ["propose"]
      ↓
/dev-refine:{id}      →  at least once (steps … "refine")
      ↓
/dev-review:{id}      →  verdict (+ file paths/locators for gaps); steps end in "review"
      ↓
      │ (optional loop if improvements needed)
      ├── /dev-refine:{id}  →  updates proposal using cited locations
      └── /dev-review:{id}  →  repeat until satisfied
      ↓
/dev-apply:{id}       →  implements src/; appends "apply"
      ↓
/dev-test:{id}        →  tests/ + run suites; appends "test"
      ↓
/dev-verify:{id}      →  coverage + gates; appends "verify"
      ↓
/dev-archive:{id}     →  optional cleanup + sdd-dev-system/knowledge/archive record
      ↓
/dev-publish:{id}     →  optional push (requires archive)

```

No shortcuts: **no** `review` without a preceding **`refine`** in `steps`; **no** consecutive **`review`** without **`refine`** in between; **no** `apply` without `review`; **no** productive tests before `apply`; **no** `archive` before `verify`. State lives in `sdd-dev-system/generated/proposals/{id}/workflow.json` (see `agents/workflow.mdc`).

**`/dev-review`** is always the **proposal audit** step (quality, risks, coherence across `product.md` ↔ `spec.md` ↔ `architecture.md` ↔ `tasks.md`). Use it for **`track=feature`** and **`track=bugfix`** alike—the only difference is how the proposal was started (`/dev-propose` vs `/dev-bug-review`).

When review findings are **non-blocking**, you can choose either path before implementation:
- Proceed directly to **`/dev-apply`**, then **`/dev-test`** → **`/dev-verify`**, or
- Run **`/dev-refine`** first to incorporate recommended improvements, then **`/dev-review`** again.

### Bugfix lane (optional entrypoint)

**`/dev-bug-review`** bootstraps a **bugfix proposal**: structured defect audit, optional notes under **`sdd-dev-system/generated/bugs/{bug-id}/`**, and the four proposal files plus **`workflow.json`** with **`track: "bugfix"`**. After that, the sequence matches features through verification: **`/dev-bug-review` → `/dev-refine` → `/dev-review` → `/dev-apply` → `/dev-test` → `/dev-verify`**.

**Naming (chat vs commands):** colloquial “bug review” often means the **`/dev-bug-review`** audit. The gated **proposal review** before code is still **`/dev-review`**—same slash command as for new features, not a separate `/dev-bug-*` command.

### Publish code (optional side command)

Use **`/dev-publish`** when you want to ship current work to remote in one step:
- **Mandatory gate:** run **`/dev-archive`** first for the same `proposal-id`.
- Analyze git changes and compose a **Conventional Commits** message (`type(scope): summary` + informative body).
- Commit only relevant changes.
- Push to `origin` on the current branch (`-u` when upstream is missing).
- Never force-push unless explicitly requested.

### Archive completed work (optional side command)

Use **`/dev-archive`** when implementation is done and you want lightweight historical trace plus cleanup:
- Preconditions: target `proposal-id` already reached **`verify`** (tests + coverage gate).
- Write minimal archive file at **`sdd-dev-system/knowledge/archive/{proposal-id}.md`** (compact, not verbose).
- Remove **`sdd-dev-system/generated/proposals/{proposal-id}/`** after successful archive write.
- After archive completes, run **`/dev-publish`** (publish without archive is not allowed in SDD-governed delivery).

### Rules the agent always follows

Project rules live in **`.cursor/rules/`** (`dev.mdc`, `agents.mdc`, **`agents/`**, `phases.mdc`) and context in **`.cursor/context/system.mdc`**: target architecture, no mixing Phase 1 and 2, and the standard message if someone asks for code before proposal + `apply`.

### Where to go deeper

- Index: `agents.mdc`; conductors: `.cursor/rules/agents/orchestrators.mdc`; roles: `.cursor/rules/agents/product.mdc`, `spec.mdc`, `architect.mdc`, `code.mdc`, `qa.mdc`, `test.mdc`, `verify.mdc`  
- Allowed/forbidden per phase: `@phases.mdc`  
- Principles and folder structure: `@.cursor/context/system.mdc`

---

## Note for the agent (no need to read aloud)

If the user only sends `/dev-guide` without context, the guide above is enough—**still** append **`### Next step`** (per command step 5). If they include a specific question, answer it without bloating the rest unnecessarily.


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
