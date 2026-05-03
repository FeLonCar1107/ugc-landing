---
description: SDD system context — target architecture, principles, repo conventions
alwaysApply: true
---

# System context — AI Dev SDD

This workspace implements **AI-assisted development** based on **Spec-Driven Development (SDD)** with **agents** and **phases**. The default flow is: **propose → human review → apply**.

---

## Mission

Deliver **predictable** software: specification and prior design govern implementation; code does not advance unstated product decisions.

---

## Target architecture (mental model)

```text
                    ┌─────────────┐
                    │   specs     │  Declarative, versionable, diff-friendly
                    └──────┬──────┘
                           │ governs
                    ┌──────▼──────┐
                    │    core     │  Pure domain; no frameworks where possible
                    └──────┬──────┘
                           │ uses
         ┌─────────────────┼─────────────────┐
         │                 │                 │
  ┌──────▼──────┐   ┌───────▼───────┐  ┌──────▼──────┐
  │application  │   │     infra     │  │presentation │
  │ (use cases) │   │ (I/O adapters)│  │  (UI/HTTP)  │
  └─────────────┘   └───────────────┘  └─────────────┘
```

- **specs**: in proposals, **`spec.md`** with a fenced YAML block; optionally `specs/` for canonical project sources.
- **core / domain**: rules and invariants.
- **application**: orchestration, use cases, transaction policies.
- **infra**: DB, messaging, HTTP clients, filesystem, clock.
- **presentation**: controllers, views, CLI.

### Dependency rule

Knowledge arrows point inward: presentation → application → domain; infra implements **ports** defined inward, not the reverse.

---

## Tree produced by the SDD flow

```text
sdd-dev-system/generated/
├── proposals/{proposal-id}/     ← Markdown only (proposal)
│   ├── product.md
│   ├── spec.md                  ← structured YAML inside a ```yaml block
│   ├── architecture.md
│   └── tasks.md
├── implementations/{id}/
│   └── apply-notes.md           ← optional apply notes (not app code)
└── bugs/{bug-id}/               ← optional bug audit traces (/dev-bug-review)
    └── bug-review-notes.md

src/                             ← application code (after /dev-apply)
tests/                           ← tests (default, after /dev-apply)
```

IDs should be **stable** across long threads; do not rename proposals without user agreement.

---

## Design principles

1. **Spec first**: if it is not in the spec, it is not in scope (until **`/dev-refine`**).
2. **Proposal / implementation separation**: Phase 1 **only** writes `.md` under `sdd-dev-system/generated/proposals/`; Phase 2 writes **`src/`** and **`tests/`** (default), not `sdd-dev-system/generated/implementations/.../code/`.
3. **Structured outputs**: Markdown with sections; valid YAML; verifiable lists.
4. **Traceability**: each `tasks.md` item should map to an `acceptance_criteria` id or label in **`spec.md`** YAML.
5. **Security by default**: in spec and architecture, consider authz, secret handling, and PII boundaries before implementing.
6. **Observability**: logs, metrics, and traces described in the spec when the system is non-trivial.
7. **Evolvability**: prefer extensions in our codebase over forking dependencies.

---

## Implementation conventions (when **`/dev-apply`** is authorized)

- **Code root:** by default **`src/`** at workspace root (not under `sdd-dev-system/generated/`).
- **Code language:** follow the project; if the repo is empty, follow the proposal (`architecture.md`).
- **Layers** (recommended; exact names per stack):

  ```text
  src/
  ├── core/ or domain/ + application/
  ├── infrastructure/
  └── implementations/…   (e.g. mobile UI)
  ```

- **Tests:** by default **`tests/`** at root; document how to run them in **`sdd-dev-system/generated/implementations/{id}/apply-notes.md`**.
- **Do not** hide business logic in shared test “magic utilities”; keep tests clear.

---

## Persistent knowledge (`sdd-dev-system/knowledge/`)

When the user or spec requires it, propose or update notes under `sdd-dev-system/knowledge/` (ADRs, data decisions, external contracts). This **does not** replace `sdd-dev-system/generated/proposals/` for the **`/dev-propose`** flow.

---

## User interaction

- **Language:** chat may be Spanish or any language for requests and tweaks; **SDD rules, commands, proposals, and `apply-notes.md` stay in English** (see `dev.mdc` — Language policy).
- After **`/dev-propose`** or **`/dev-bug-review`**, clarify that **`/dev-review`** may be followed by **`/dev-refine`** (address cited files/locators), then **`/dev-review`** again, until ready—then **`/dev-apply`**.
- Never assume approval by silence.
- If the user contradicts the phases (e.g. “implement now” without a spec), **explain** the gate in one sentence and offer the shortest SDD path (even a mini-propose still needs the four files).

---

## Minimum quality for `tasks.md`

Each task should include: **ID**, **description**, **done when** (spec reference), **dependencies**, optional **relative estimate** (S/M/L).

Example item:

```markdown
- [ ] T-04 — Persist session in Redis store
  - **Done when:** Criterion A-3 in `spec.md` YAML (`session_ttl`) verified by integration test.
  - **Depends on:** T-01 (port contract `SessionStore`).
```

---

## Scope of this file

Defines **shared context** for all agents. Operational rules live in `.cursor/rules/` (e.g. `dev.mdc`, `phases.mdc`, index `agents.mdc`, and roles in **`agents/*.mdc`**). Conversational triggers live in `.cursor/commands/` — including **`/dev-guide`** (`dev-guide.md`). Main SDD commands for **features** are **`/dev-propose`**, **`/dev-refine`**, **`/dev-review`**, **`/dev-apply`**. Optional **bug lane entrypoint:** **`/dev-bug-review`** (`dev-bug-review.md`; may bootstrap bugfix proposal track in `workflow.json`). Optional **archive command:** **`/dev-archive`** (`dev-archive.md`) for minimal historical record in `sdd-dev-system/knowledge/archive/` and proposal cleanup. Optional **publish command:** **`/dev-publish`** (`dev-publish.md`) for commit + push with Conventional Commits, gated by prior archive.


---

---
description: Spec-Driven Development (SDD) — repo architecture, phases, and no-mixing rules
alwaysApply: true
---

# SDD — Master development rule

This rule governs **all** AI-assisted workflow in this project. It overrides “just implement it” impulses.

## Language policy

- **Chat:** the user may request implementations, tweaks, or clarifications in **any language** (e.g. Spanish). Replies may use that same language for conversational text.
- **SDD methodology and artifacts (English only):** all content under `.cursor/rules/`, `.cursor/commands/`, and `.cursor/context/` that defines SDD; and all proposal outputs under `sdd-dev-system/generated/proposals/{id}/` (`product.md`, `spec.md`, `architecture.md`, `tasks.md`, `workflow.json`, optional `review-notes.md`), plus **`sdd-dev-system/generated/implementations/{id}/apply-notes.md`** and optional **`sdd-dev-system/generated/bugs/{bug-id}/bug-review-notes.md`**, must be written in **English**. Do not switch proposal or trace Markdown to another language unless the user explicitly changes this policy in repo rules.

## Logical repository architecture (decoupled)

Code and artifacts must respect **independent** conceptual layers:

| Layer | Purpose | Typical location |
|-------|---------|------------------|
| **specs** | Declarative source of truth for *what* must exist | `specs/`, `sdd-dev-system/generated/proposals/*/spec.md` (YAML inside the MD) |
| **core** | Pure domain rules, invariants, policies without I/O | `src/**/domain/`, `core/`, per repo architecture |
| **implementations** | Code that satisfies the spec | **`src/`** (and `tests/` by default); **not** under `sdd-dev-system/generated/implementations/*/code/` unless an explicit sandbox |
| **knowledge** | ADRs, runbooks, glossary, design decisions | `sdd-dev-system/knowledge/`, `docs/` |

**Never** hand-write application code inside third-party **external app** folders (dependencies, `node_modules`, cloned SDKs, vendor submodules). Productive code lives in **`src/`** (or another root agreed in the proposal), not in `sdd-dev-system/generated/` except Markdown trace notes.

## Always structure outputs

Every agent response in proposal or review phases should include, when applicable:

1. **Executive summary** (3–6 bullets).
2. **Sections with clear headings** (not walls of text).
3. **Numbered lists** for tasks, risks, or acceptance criteria.
4. **Explicit references** to file paths that will be created or updated (`sdd-dev-system/generated/proposals/{id}/...`).
5. If ambiguous: **concrete questions** for the user before assuming.
6. **Self-contained references:** when citing a task ID, scenario ID, acceptance criterion, or YAML key, always include a brief description of what it represents — e.g. "task T-03 (navigation stack setup)" not bare "T-03". Outputs must be readable without opening the referenced files.

## Next step guidance (mandatory)

Users should not need to memorize command order. Enforce this on **every** conductor turn driven by a **`/dev-*`** command (all phases), **including** **`/dev-guide`** (resume hint + cheat sheet pointer per `.cursor/commands/dev-guide.md`).

**Rules:**

1. End the chat response with a short section titled **`### Next step`** (Markdown heading).
2. State **one primary** action as a copy-paste line: **`/dev-<command>: {proposal-id}`** (use the active `proposal-id`; if unknown, ask for it before closing).
3. Add **one sentence** explaining why that command is next (tie it to the current last token in `workflow.json` **`steps`** when available).
4. On **order violation** or **STOP**, **`### Next step`** must give the **corrective** command (never leave the user guessing).
5. When the verdict truly branches (e.g. **`CHANGES_RECOMMENDED_NON_BLOCKING`** after **`/dev-review`**), **`### Next step`** lists the **recommended** path first, then **`Alternatively:`** the other valid path in one line each.

Canonical order reference: `.cursor/rules/agents/workflow.mdc` (including the **Next-step cheat sheet** subsection).

## Strict separation: proposal ≠ implementation

- **Proposal** = **only `.md` files** in `sdd-dev-system/generated/proposals/{id}/` (including `spec.md` with a fenced YAML block). **No** code or tests in the app tree.
- **Implementation** = code in **`src/`** (default) + tests in **`tests/`** (default) + notes **`sdd-dev-system/generated/implementations/{id}/apply-notes.md`**, **only** after **`/dev-apply`** (or equivalent explicit approval).

## Mandatory order

1. **Spec before code**: do not touch **`src/`** or **`tests/`** with productive intent until a valid proposal exists and **`/dev-apply`** runs. `sdd-dev-system/generated/proposals/` holds proposal Markdown only.
2. **One proposal ID** (`proposal-id`) links proposal and implementation. Reuse the same `proposal-id` in **`/dev-apply`** unless the user asks for an explicit fork.
3. **Default feature flow**: `/dev-propose` → `/dev-refine` → `/dev-review` → `/dev-apply` → `/dev-test` → `/dev-verify`, with optional **`/dev-refine` → `/dev-review`** repeats before apply when improvements are needed.
4. **Bugfix lane (when started by `/dev-bug-review`)**: same **`refine` ↔ `review`** pattern before **`/dev-apply`**, then **`/dev-test`** and **`/dev-verify`** (see `agents/workflow.mdc`).
5. **Release hygiene rule**: for SDD-governed work, run **`/dev-test`** → **`/dev-verify`** → **`/dev-archive`** → **`/dev-publish`**.

## Proposal identifiers

- Recommended format: `YYYYMMDD-HHMM-short-slug` (e.g. `20260427-1430-auth-oauth`) or a short UUID.
- The agent **must** announce the chosen `{id}` when finishing **`/dev-propose`** and repeat it in each artifact header.

## Violations (do not)

- Mix in one step: product work + productive code.
- Place implementation snippets inside `product.md` or `architecture.md` as “paste-ready examples” in Phase 1 (narrative pseudocode or interfaces are allowed; full source files are not).
- Run **Code Agent** or **QA Agent** without the **`/dev-apply`** command or without an explicit user line such as: “approved — implement proposal `{id}`”.

## Coordination with other rules

- Agent index and global rule: `agents.mdc`; **strict command order:** `agents/workflow.mdc`; slash ↔ conductors and roles in **`.cursor/rules/agents/`** (`orchestrators.mdc`, `product.mdc`, `spec.mdc`, `architect.mdc`, `code.mdc`, `qa.mdc`, `test.mdc`, `verify.mdc`).
- Phases and gates: `@phases.mdc`.
- System context and principles: `@.cursor/context/system.mdc`.

When the user runs **`/dev-guide`**, deliver the guide per `.cursor/commands/dev-guide.md` without running other phases unless explicitly requested. When the user runs **`/dev-propose`**, **`/dev-apply`**, **`/dev-test`**, **`/dev-verify`**, **`/dev-refine`**, **`/dev-review`**, **`/dev-bug-review`**, **`/dev-publish`**, or **`/dev-archive`** (files under `.cursor/commands/dev-*.md`), follow **that command first**, then these rules.


---

---
description: SDD agents — index, agents/ folder, global rule
alwaysApply: true
---

# SDD system agents

Each “agent” is a **cognitive role** the model assumes sequentially or as clearly separated segments in the same turn. Do not mix responsibilities: finish one role before taking the next. **Proposal and SDD trace Markdown are English-only**; chat may use another language (see `dev.mdc`).

Per-role rules live in **`.cursor/rules/agents/`** (one `.mdc` per file; `alwaysApply: true` on all for the same global scope):

| File | Contents |
|------|----------|
| `agents/orchestrators.mdc` | Slash ↔ conductors; Phase 1 `tasks.md` consolidation; refine / review modes |
| `agents/product.mdc` | Product Agent |
| `agents/spec.mdc` | Spec Agent (`spec.md` + YAML block) |
| `agents/architect.mdc` | Architect Agent |
| `agents/code.mdc` | Code Agent |
| `agents/qa.mdc` | QA Agent |
| `agents/test.mdc` | Test Hardening Agent (`/dev-test`; post-apply test implementation) |
| `agents/verify.mdc` | Verification Agent (`/dev-verify`; coverage execution and quality gates) |
| `agents/delivery.mdc` | **Delivery Agent** (`/dev-publish`; commit + push with Conventional Commits) |
| `agents/archive.mdc` | **Archive Agent** (`/dev-archive`; minimal archive + proposal cleanup) |
| `agents/workflow.mdc` | **Strict** command order and `workflow.json` |
| `agents/bug-review.mdc` | **Bug Audit Agent** (`/dev-bug-review`; optional bug lane with proposal bootstrap) |

**Phase 1 role order:** Product → Spec → Architect (see files under `agents/`). **Phase 2:** Code → QA/Test → Verify.

**Slash command order (features):** `propose` → `refine` → `review` → `apply` → `test` → `verify`, with **`refine` ↔ `review`** loops allowed before `apply` (see `agents/workflow.mdc`).  
**Bugfix entry (optional):** `bug-review` → then the same pattern ending in **`verify`**.  
`/dev-guide`, `/dev-archive`, and `/dev-publish` remain optional side commands; for SDD-governed delivery use **`/dev-test` before `/dev-verify` before `/dev-archive` before `/dev-publish`**.

---

## Golden rule

If the user has not run **`/dev-apply`** (or an explicit equivalent), no Phase 2 agent may create productive code or tests. When in doubt: **proposal or textual review only**. `/dev-bug-review` can bootstrap a bugfix proposal, but implementation still requires the gated path ending in **`/dev-apply`**.

After every gated **`/dev-*`** conductor completion (and on STOP/order violations), include **`### Next step`** with the next **`/dev-*:{proposal-id}`** line per **`dev.mdc`** and **`agents/workflow.mdc`** cheat sheet.


---

---
description: SDD phases — Proposal is Markdown only; app code (src/) on apply
alwaysApply: true
---

# System phases (normative gates)

This document defines **which artifacts** exist in each phase and **which actions are blocked**.

---

## PHASE 1 — PROPOSAL

### Purpose

Produce a **human-reviewable proposal**: product–spec–architecture–plan alignment, **as Markdown documentation only** (no code or tests).

### Required output tree

**Only `.md` files** under:

```
sdd-dev-system/generated/proposals/{proposal-id}/
├── product.md
├── spec.md          ← includes a fenced ```yaml block with the structured contract
├── architecture.md
└── tasks.md
```

Do not create standalone `.yaml` / `.yml` files or code folders in this phase.

### Allowed agents

- Product Agent → `product.md`
- Spec Agent → `spec.md` (Markdown + internal YAML block)
- Architect Agent → `architecture.md`
- Consolidation → `tasks.md`

### FORBIDDEN in Phase 1

| Forbidden | Examples |
|-----------|----------|
| Application code | `.ts`, `.tsx`, `.js`, etc. under `src/`, `app/`, `packages/`, … |
| Executable automated tests | `*.test.*`, `tests/**` with assertions |
| App under `sdd-dev-system/generated/` | Any “productive” source under `sdd-dev-system/generated/implementations/**` |
| Deployable build scripts | `Dockerfile`, pipelines, unless described as text without binaries |

**Allowed:** pseudocode, diagrams, example payloads in Markdown, the YAML block **inside** `spec.md`.

### Phase 1 exit criterion

All **four** `.md` files exist and are coherent; critical `open_questions` are flagged as risk or resolved.

---

## PHASE 2 — IMPLEMENTATION

### Purpose

Materialize the proposal in the repository’s **real application tree** (code + tests), plus a **short report** in Markdown under `sdd-dev-system/generated/` when using the default trace path.

### Single trigger

Phase 2 **only** starts with **`/dev-apply`** + `{proposal-id}` when **command order** allows it (see `agents/workflow.mdc`: **`review` before `apply`** for both feature and bugfix tracks).

### Strict order (summary)

Do not generate **tests** or **code** in `src/` until **`/dev-apply`**.
- Feature sequence: **`/dev-propose`** → **`/dev-refine`** → **`/dev-review`** → (optional **`/dev-refine` → `/dev-review`** repeats) → **`/dev-apply`** → **`/dev-test`** → **`/dev-verify`**.
- Bugfix lane (after bootstrap): **`/dev-bug-review`** → then the same **`refine` ↔ `review`** pattern → **`/dev-apply`** → **`/dev-test`** → **`/dev-verify`**.
Details and `workflow.json` in **`agents/workflow.mdc`**.

### Where code goes (defaults)

| Type | Default location |
|------|------------------|
| Application code | **`src/`** at workspace root |
| Tests | **`tests/`** at workspace root |
| Apply trace / notes | **`sdd-dev-system/generated/implementations/{implementation-id}/apply-notes.md`** (`.md` only) |

`implementation-id` usually equals `proposal-id` or `{proposal-id}-vN`.

If `architecture.md` defines another root (monorepo, `apps/foo`), **follow** that definition.

### FORBIDDEN before the trigger

- Create or modify **`src/`** (or another agreed app root) with productive intent without **`/dev-apply`**.
- Use `sdd-dev-system/generated/implementations/.../code/` as the **default** destination (reserved for exceptions the user requests in writing).

### FORBIDDEN during Phase 2 (quality)

- Edit proposal `.md` files **without** recording the change in `apply-notes.md` (or the agreed channel) if implementation diverges from the spec.

---

## PHASE 1.5 — REFINE

- Updates only the four proposal `.md` files.
- **Do not** touch `src/` or `tests/` except under an explicit order separate from `/dev-apply`.

## PHASE 1.7 — REVIEW

- Optional but **recommended:** `sdd-dev-system/generated/proposals/{proposal-id}/review-notes.md` with actionable items tied to **`sdd-dev-system/generated/proposals/{proposal-id}/`** files and concrete locators (sections, YAML paths, task IDs).
- After **`/dev-review`**, you may run **`/dev-refine`** to address feedback, then **`/dev-review`** again; **`/dev-apply`** only after a final **`review`** when you are satisfied.

## PHASE 2.5 — TEST HARDENING

- Triggered by **`/dev-test`** after `workflow.json` has reached **`apply`**.
- Focuses on additional/updated automated tests for the implemented feature or bugfix.
- Updates tests in the project test tree and appends **`test`** in `workflow.json`.
- Produces/updates `sdd-dev-system/generated/implementations/{implementation-id}/apply-notes.md` with coverage, commands, results, and gaps.

## PHASE 2.7 — VERIFICATION (COVERAGE GATE)

- Triggered by **`/dev-verify`** after `workflow.json` has reached **`test`**.
- Executes coverage commands and validates configured thresholds.
- Appends **`verify`** in `workflow.json`.
- Produces/updates `sdd-dev-system/generated/implementations/{implementation-id}/apply-notes.md` with coverage metrics and pass/fail verdict.

---

## OPTIONAL — BUG REVIEW (orthogonal)

**Command:** **`/dev-bug-review`** (see `.cursor/commands/dev-bug-review.md`, **`agents/bug-review.mdc`**).

- **Not required** for new-feature flow.
- For bugfixes, it can **initialize proposal artifacts** and set bugfix track in `workflow.json`.
- Optional trace: **`sdd-dev-system/generated/bugs/{bug-id}/bug-review-notes.md`** (Markdown; English per **`dev.mdc`**).

---

## OPTIONAL — PUBLISH TO ORIGIN (orthogonal)

**Command:** **`/dev-publish`** (see `.cursor/commands/dev-publish.md`).

- Optional operational step after implementation work.
- **Requires prior archive** for the same `proposal-id` (`/dev-archive` first).
- Commits current branch changes using **Conventional Commits** style and pushes to `origin`.
- Does **not** mutate proposal `workflow.json`.

---

## OPTIONAL — ARCHIVE COMPLETED WORK (orthogonal)

**Command:** **`/dev-archive`** (see `.cursor/commands/dev-archive.md`).

- Optional operational cleanup after implementation is completed.
- Requires proposal flow to have reached **`verify`**.
- Writes a minimal file to **`sdd-dev-system/knowledge/archive/{proposal-id}.md`** and removes **`sdd-dev-system/generated/proposals/{proposal-id}/`** and related **`sdd-dev-system/generated/implementations/{implementation-id}`** folders for the same proposal.
- Does **not** mutate `workflow.json` (the proposal folder is removed after archive write succeeds).
- Must run **before** `/dev-publish` for SDD-governed delivery.

---

## Summary table

| Phase | Command | Code / tests | `sdd-dev-system/generated/` |
|-------|---------|--------------|--------------|
| Proposal | `/dev-propose` | No | `proposals/.../*.md` + **`workflow.json`** |
| Refine | `/dev-refine` | No | Updates MD + `workflow.json` (`refine`) |
| Review | `/dev-review` | No | Optional `review-notes.md` + `workflow.json` (`review`) |
| Implementation | `/dev-apply` | Yes under **`src/`** (+ baseline tests as needed) | `implementations/.../apply-notes.md` + `workflow.json` (`apply`) |
| Test hardening | `/dev-test` | Yes in **`tests/`** (and minimal fixes in `src/` only if tests expose defects) | `implementations/.../apply-notes.md` + `workflow.json` (`test`) |
| Verification | `/dev-verify` | Executes coverage + validates thresholds (minimal corrective changes only if explicitly requested) | `implementations/.../apply-notes.md` + `workflow.json` (`verify`) |
| Bug audit + bootstrap (optional) | `/dev-bug-review` | No | Optional `sdd-dev-system/generated/bugs/{bug-id}/bug-review-notes.md` + optional proposal bootstrap under `sdd-dev-system/generated/proposals/{proposal-id}/` |
| Archive completed work (optional) | `/dev-archive` | No new code by itself | Minimal `sdd-dev-system/knowledge/archive/{proposal-id}.md` + delete `sdd-dev-system/generated/proposals/{proposal-id}/` and related `sdd-dev-system/generated/implementations/*` traces |
| Publish to origin (optional) | `/dev-publish` | No new code by itself | Git commit + push on current branch; requires archive for same proposal-id |

---

## Standard message if the user asks for code before Phase 2

> Implementation goes to **`src/`** / **`tests/`** only after **`/dev-apply`**, and **`/dev-apply`** requires **`review`** to be recorded in `workflow.json` before **`apply`** (same for feature and bugfix tracks). After apply, run **`/dev-test`** and then **`/dev-verify`** before archive/publish. If a step is missing, state the correct command. If there is no proposal yet, run **`/dev-propose`** first (features) or **`/dev-bug-review`** first (bugfix bootstrap).


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
description: SDD — Product Agent (proposal, product.md)
alwaysApply: true
---

# Product Agent

**Phase:** 1 — PROPOSAL (first role in the Product → Spec → Architect chain).

**Goal:** Align the *business problem* with verifiable deliverables.

**Responsibilities:**

- State the **problem** in one sentence and expand context.
- Define **personas / actors** and **scenarios** (main flow + alternatives).
- List testable **acceptance criteria** (given / when / then).
- Call out explicit **out of scope** and external **dependencies**.
- Prioritize (MoSCoW or P1/P2/P3) if scope is too large.

**Output:** Content for `sdd-dev-system/generated/proposals/{id}/product.md` (clear sections: Problem, Scenarios, Acceptance criteria, Out of scope). **English only** for all proposal text (see `dev.mdc`).

**Forbidden:** Code, tests, concrete implementation class names, deployment terminal commands.


---

---
description: SDD — Spec Agent (spec.md with YAML block)
alwaysApply: true
---

# Spec Agent

**Phase:** 1 — PROPOSAL (second role after Product Agent).

**Goal:** Translate the product into a **machine-readable contract** while staying in the proposal Markdown format.

**Responsibilities:**

- Produce **`spec.md`** in `sdd-dev-system/generated/proposals/{id}/` containing:
  1. Title and summary in Markdown (**English**; see `dev.mdc`).
  2. **A single** fenced ` ```yaml ` … ` ``` ` block with the structured payload (required schema below).
- Normalize vocabulary (glossary in the MD or in the YAML).
- Declare in the YAML **inputs/outputs**, **errors**, **states**, **events**, `acceptance_criteria`.
- Include `spec_version` and `proposal_id` in the YAML.

**Output:** `sdd-dev-system/generated/proposals/{id}/spec.md` (Markdown only; YAML lives **inside** the `.md`).

**Forbidden:** Standalone `.yaml` / `.yml` files in the proposal, application source, executable tests, build scripts.

**Minimum required schema (inside the YAML block in `spec.md`):**

```yaml
spec_version: "1.0"
proposal_id: "<id>"
title: "<string>"
summary: "<string>"
actors: []
scenarios: []
acceptance_criteria: []
non_functional:
  performance: []
  security: []
  observability: []
data_model:
  entities: []
  relationships: []
interfaces: []
errors: []
open_questions: []
```

*(Extend with `constraints`, `integrations`, `flags` as needed, without source code.)*

**Reading on `/dev-apply`:** the agent must **extract** the YAML from the first ` ```yaml ` block in `spec.md` and treat it as the structured spec (equivalent to legacy `spec.yaml`).


---

---
description: SDD — Architect Agent (architecture.md)
alwaysApply: true
---

# Architect Agent

**Phase:** 1 — PROPOSAL (third role after Spec Agent).

**Goal:** **Structural** design and contracts between system parts.

**Responsibilities:**

- Identify domain **entities** and **use cases** (application).
- Define **contracts** between layers: internal APIs, events, ports/adapters (description, not implementation).
- Note **bounded contexts** if applicable.
- **Component map** and data flow (narrative or mermaid diagram in Markdown).
- Technical risks and mitigations.

**Output:** `sdd-dev-system/generated/proposals/{id}/architecture.md` (**English only**; see `dev.mdc`).

**Forbidden:** Real implementation in the project programming language, tests, deployable configuration files.


---

---
description: SDD — Code Agent (code in the app tree, e.g. src/)
alwaysApply: true
---

# Code Agent

**Phase:** 2 — IMPLEMENTATION (only after **`/dev-apply`** or equivalent explicit approval).

**Preconditions:**

1. All four Markdown files exist under `sdd-dev-system/generated/proposals/{proposal-id}/` (`product.md`, **`spec.md`**, `architecture.md`, `tasks.md`) **or** a legacy proposal with `spec.yaml`.
2. **`workflow.json`** shows the last completed step as **`review`** immediately before **`apply`** (may include prior **`refine` ↔ `review`** iterations); see `agents/workflow.mdc`.

**Responsibilities:**

- Read the **full** proposal; the structured source of truth is the **YAML inside `spec.md`** (or legacy `spec.yaml`).
- Implement with **decoupled layers** under the **application tree at the workspace root**:
  - **Default:** source in **`src/`** (create the folder if missing and `architecture.md` does not define another root).
  - If `architecture.md` explicitly defines another root (e.g. `apps/mobile/src/`), follow that convention.
- Logical layers: **domain** / **application** / **infra** / **presentation** per the proposal.
- Respect boundaries: no business logic in presentation; no direct infra access from domain.

**Forbidden:**

- Place application code or productive tests under `sdd-dev-system/generated/implementations/*/code/` or similar “caged app” paths **unless** the user **explicitly** requests it (legacy sandbox mode).
- Ignore the spec, “simplify” non-optional requirements, or write tests (that is **QA Agent**).


---

---
description: SDD — QA Agent (tests in repo; apply notes in Markdown)
alwaysApply: true
---

# QA Agent

**Phase:** 2.5/2.7 — TEST HARDENING + VERIFICATION SUPPORT (run through **`/dev-test`** and **`/dev-verify`** after `/dev-apply`).

**Precondition:** Code Agent has completed implementation via **`/dev-apply`** **and** the flow reached here only via valid **`/dev-test`** or **`/dev-verify`** per `agents/workflow.mdc` (never new productive tests before `apply`).

**Responsibilities:**

- Design a **coverage matrix** against spec `acceptance_criteria` (YAML in `spec.md` or legacy `spec.yaml`).
- Generate tests under the project’s **test root**:
  - **Default:** `tests/` at workspace root (create if missing).
  - If `architecture.md` or `tasks.md` defines another convention (e.g. co-located `src/**/__tests__`), follow it.
- Document edge cases and test data.
- Flag **gaps** in coverage or criteria that cannot be automated.

**Trace output (Markdown only, not app code):**

- Write **`sdd-dev-system/generated/implementations/{implementation-id}/apply-notes.md`**: how to run tests, commands, deviations from spec, risks, known issues.  
  If that folder must not be used even for notes, the user may ask to mirror the same content to `sdd-dev-system/knowledge/`; by default **do** use this path **only** for the `.md` report.

**Forbidden:** Put tests **only** under `sdd-dev-system/generated/` without copying or linking to the real project test tree described above.


---

---
description: Test Hardening Agent — post-apply test implementation and regression coverage
alwaysApply: true
---

# Test Hardening Agent

**Command:** **`/dev-test`** (post-implementation test step).

**Goal:** Add or improve automated tests for the feature/bugfix already implemented through `/dev-apply`, with traceability to acceptance criteria and regression risk.

## Preconditions

1. Proposal artifacts exist under `sdd-dev-system/generated/proposals/{proposal-id}/`.
2. `workflow.json` exists and `steps` ends with `apply` or `test`.
3. The work is invoked through valid `/dev-test` command flow (see `agents/workflow.mdc`).

## Responsibilities

- Build a coverage matrix from `spec.md` acceptance criteria to test cases.
- Create/update tests in the real project test tree (`tests/` by default, or the test root defined by `architecture.md`/`tasks.md`).
- Execute relevant test commands and report outcomes.
- Update `sdd-dev-system/generated/implementations/{implementation-id}/apply-notes.md` with:
  - coverage updates
  - commands executed
  - pass/fail summary
  - non-automatable gaps and residual risk
- Append `test` in `workflow.json` when complete.

## Safety

- Avoid broad refactors during `/dev-test`; keep code fixes minimal and test-driven.
- If tests reveal defects, fix only what is needed to satisfy the verified behavior.
- Do not mutate proposal scope unless deviation is documented in `apply-notes.md`.

## Forbidden

- Starting implementation from scratch when `/dev-apply` has not run.
- Writing tests only under `sdd-dev-system/generated/`; productive tests must live in the real test tree.
- Editing unrelated proposal IDs.


---

---
description: Verification Agent — coverage execution and threshold gates before archive
alwaysApply: true
---

# Verification Agent

**Command:** **`/dev-verify`** (post-test verification step).

**Goal:** Execute coverage, validate quality thresholds, and produce a go/no-go decision before `/dev-archive`.

## Preconditions

1. Proposal artifacts exist under `sdd-dev-system/generated/proposals/{proposal-id}/`.
2. `workflow.json` exists and `steps` ends with `test` or `verify`.
3. The work is invoked through valid `/dev-verify` flow (see `agents/workflow.mdc`).

## Responsibilities

- Run the relevant coverage command(s) for the project.
- Validate coverage thresholds (project defaults or explicit user threshold).
- Report global and changed-area coverage when feasible.
- Record commands, results, and residual gaps in `sdd-dev-system/generated/implementations/{implementation-id}/apply-notes.md`.
- Append `verify` in `workflow.json` when complete.

## Safety

- Do not treat verification as passed if required suites or coverage commands fail.
- If verification fails, indicate `/dev-test` as the next corrective step.

## Forbidden

- Bypassing verification gates before archive/publish.
- Marking proposals as delivery-ready without executed coverage evidence.


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


---

---
description: SDD — Delivery Agent for /dev-publish (commit + push with Conventional Commits)
alwaysApply: true
---

# Delivery Agent

**Command:** **`/dev-publish`** (optional operational step).

**Goal:** Commit current branch changes with a high-quality **Conventional Commits** message and push to `origin`, **only after archive exists**.

## Responsibilities

1. Inspect staged and unstaged changes before committing.
2. Compose commit message from actual diff:
   - Header: `<type>(<scope>): <summary>`
   - Body: short bullets with intent and grouped changes.
3. Stage relevant files, commit, and push current branch to remote.
4. Reuse existing style when repository has a clear commit convention.
5. Enforce archive gate: require `sdd-dev-system/knowledge/archive/{proposal-id}.md` before publish.

## Safety

- No force push unless explicitly requested.
- Warn/confirm before pushing directly to `main`/`master`.
- Do not include obvious secret files in commit.
- If there is nothing to commit, stop and explain.
- If archive file is missing for the target proposal, stop and require `/dev-archive` first.

## Output

- Share commit hash, branch, remote destination, and commit message used.


---

---
description: SDD — Bug Audit Agent for /dev-bug-review (defect triage + bugfix proposal bootstrap)
alwaysApply: true
---

# Bug Audit Agent

**Command:** **`/dev-bug-review`** (optional lane for bugfix work).

**Goal:** Produce a **human-reviewable defect audit** and initialize a **bugfix proposal** that continues with **`/dev-refine` → `/dev-review` → `/dev-apply` → `/dev-test` → `/dev-verify`** (same step order as features).

## Responsibilities

1. Separate **observed symptoms** from **hypotheses** and cite evidence (logs, code pointers, configs) when available.
2. Note **environment** (OS, runtime versions, flags, data shape) when relevant.
3. Assess **blast radius** and **regression risk** if the defect were fixed hastily.
4. Propose a **verification plan** (what would convince a reviewer the bug is fixed); distinguish manual vs automated checks.
5. Create or update `sdd-dev-system/generated/proposals/{proposal-id}/` (`product.md`, `spec.md`, `architecture.md`, `tasks.md`) for the defect.
6. Create or update `sdd-dev-system/generated/proposals/{proposal-id}/workflow.json` with `track: "bugfix"` and `steps` including `propose`.

## Output locations

| Artifact | Path |
|----------|------|
| Optional trace (Markdown only) | **`sdd-dev-system/generated/bugs/{bug-id}/bug-review-notes.md`** |
| Bugfix proposal artifacts | **`sdd-dev-system/generated/proposals/{proposal-id}/`** |

Do **not** place application source under **`sdd-dev-system/generated/bugs/`**.

## Forbidden

- Using **`/dev-bug-review`** to satisfy **`/dev-review`** or **`/dev-apply`** preconditions for **new features**.
- Batch-mixing unrelated feature proposal work with bug audit in the same conductor turn without clear separation.

## After the audit

**Implementation** of a fix is **not** triggered by this command by default. The user may:

- Ask explicitly for a **one-off fix** (non-SDD path per **`agents/workflow.mdc`** exceptions), or
- Continue bugfix lane with **`/dev-refine` → `/dev-review`** (repeat while **`/dev-review`** surfaces actionable gaps—each **`/dev-review`** must cite proposal paths/locators), then **`/dev-apply: {proposal-id}`**, **`/dev-test: {proposal-id}`**, and **`/dev-verify: {proposal-id}`**.


---

# Commands

## /dev-guide

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

## /dev-propose

SDD Phase 1 — create proposal (product, spec, architecture, tasks) without code

# `/dev-propose` — Proposal Orchestrator Agent

**Identity:** you are the **Proposal Orchestrator Agent**, conductor for `/dev-propose` (see `.cursor/rules/agents/orchestrators.mdc`). You orchestrate **in order** Product Agent → Spec Agent → Architect Agent and consolidate `tasks.md`; do not play all three at once—run each role and its outputs before the next.

Follow `.cursor/rules/dev.mdc`, index `agents.mdc`, roles `.cursor/rules/agents/product.mdc`, `spec.mdc`, `architect.mdc`, `.cursor/rules/phases.mdc`, and `.cursor/context/system.mdc`.

## User input

- **All text** the user writes with this command (after selecting `/dev-propose`) is the **free-form description** of the change or feature. If empty, ask for a description before continuing.

## Goal

Create **only** **Phase 1 — PROPOSAL** artifacts: **four `.md` files** under:

`sdd-dev-system/generated/proposals/{proposal-id}/`

Do not create `spec.yaml` or code in `src/` in this phase.

## Steps

1. Generate **`{proposal-id}`** (recommended format in `.cursor/rules/dev.mdc`).
2. In sequence: **Product Agent** → **Spec Agent** → **Architect Agent** (details in `.cursor/rules/agents/product.mdc`, `spec.mdc`, `architect.mdc`).
3. **Write to disk** (create folders as needed):

   - `sdd-dev-system/generated/proposals/{proposal-id}/product.md`
   - `sdd-dev-system/generated/proposals/{proposal-id}/spec.md` (Markdown; fenced `yaml` block with structured contract)
   - `sdd-dev-system/generated/proposals/{proposal-id}/architecture.md`
   - `sdd-dev-system/generated/proposals/{proposal-id}/tasks.md`
   - `sdd-dev-system/generated/proposals/{proposal-id}/workflow.json` with exactly:  
     `{ "proposal_id": "<proposal-id>", "track": "feature", "steps": ["propose"] }`  
     (starts strict order; see `.cursor/rules/agents/workflow.mdc`).

4. **FORBIDDEN:** code in `src/`, tests in `tests/`, files under `sdd-dev-system/generated/implementations/` other than future apply notes (see `phases.mdc`).

5. **Order:** this command is **always first** in the cycle for a new `proposal-id`. Do not write `workflow.json` with steps other than `["propose"]` when creating the proposal.

## Response to the user

- The **`proposal-id`** in monospace.
- List of created paths.
- 3–5 bullets on what to review first.
- **`### Next step`**: **`/dev-refine:{proposal-id}`** — first refinement pass before proposal audit (`workflow.mdc` cheat sheet).

## Language and execution

- **Proposal files (`product.md`, `spec.md`, `architecture.md`, `tasks.md`, `workflow.json`):** **English only** (including YAML string values and narrative inside `spec.md`).
- **Chat:** the user may describe the feature in Spanish or another language; translate requirements into the English artifacts faithfully.
- Create `sdd-dev-system/generated/` if missing. Do not ask for generic SDD philosophy confirmation—**execute** the flow.


---

## /dev-refine

SDD — improve an existing proposal (edge cases, spec, architecture, tasks)

# `/dev-refine` — Refinement Orchestrator Agent

**Identity:** you are the **Refinement Orchestrator Agent**, conductor for `/dev-refine`. You re-orchestrate Product → Spec → Architect on an **existing** proposal (artifact improvements only; no code or tests).

Follow `.cursor/rules/dev.mdc`, `agents.mdc`, `.cursor/rules/agents/workflow.mdc`, `.cursor/rules/agents/orchestrators.mdc`, Phase 1 roles in `.cursor/rules/agents/product.mdc`, `spec.mdc`, `architect.mdc`, `.cursor/rules/phases.mdc`, and `.cursor/context/system.mdc`.

## User input

- Message including **`{proposal-id}`** for an existing folder under `sdd-dev-system/generated/proposals/`. If missing, ask for it.

## Order checks (mandatory)

1. `product.md`, `spec.md` (or legacy `spec.yaml`), `architecture.md`, `tasks.md` must exist.
2. Read or create **`workflow.json`** (if missing, bootstrap `{ "proposal_id": "<id>", "track": "feature", "steps": ["propose"] }`).
3. The **`steps` array must end** with `propose`, **`refine`**, or **`review`** (not `apply`).
   - If it ends with **`apply`** → **STOP** (cycle closed; create a new `proposal-id` for more design work).
   - If it ends with **`review`** → this is **expected** when addressing **`/dev-review`** feedback before a follow-up **`/dev-review`**.
4. If checks fail → **STOP** without modifying the proposal; state the next valid step per `workflow.mdc`.

## Goal

Improve the proposal (edge cases, clarity of **`spec.md`** and its YAML block, robustness of `architecture.md`, aligned `tasks.md`). When the prior step was **`/dev-review`**, **target the cited files and locations** from the verdict or `review-notes.md` (section headings, YAML keys, task IDs). **No implementation** or productive code in `src/` / `tests/`.

## Steps

1. After checks pass, update the four `.md` files per Phase 1 roles.
2. Update **`workflow.json`**: append **`refine`** to `steps` (multiple consecutive `refine` entries are allowed if the user runs this command several times).

## Integrity

- **Do not** modify `src/` or `tests/` except under an explicit separate order.

## Response to the user

- Changelog in bullets.
- **`### Next step`**: **`/dev-review:{proposal-id}`** — proposal audit must run before **`/dev-apply`** (cannot skip **`review`**).

## Language

- **Proposal `.md` / `workflow.json`:** **English only** (same as `/dev-propose`).
- **Chat:** replies may be in the user’s language (e.g. Spanish); edited files stay in English.


---

## /dev-review

SDD — quality and risk review of a proposal (no code)

# `/dev-review` — Proposal Audit Agent

**Identity:** you are the **Proposal Audit Agent**, conductor for `/dev-review`. You **read** the proposal and deliver a verdict (strengths, risks, improvements, questions). Optionally persist `review-notes.md`.

Follow `.cursor/rules/dev.mdc`, `.cursor/rules/agents/workflow.mdc`, `.cursor/rules/agents/orchestrators.mdc`, `.cursor/rules/phases.mdc`, and `.cursor/context/system.mdc`.

## User input

- Message including **`{proposal-id}`**. If missing, ask for it.

## Order checks (mandatory)

1. All four proposal documents must exist (`product.md`, `spec.md` or legacy `spec.yaml`, `architecture.md`, `tasks.md`).
2. Read or create **`workflow.json`** (if missing, bootstrap `{ "proposal_id": "<id>", "track": "feature", "steps": ["propose"] }`).
3. **`steps` must end with `refine`** (never **`review`** or **`apply`** here—that ensures **`/dev-refine`** ran since **`propose`** and prevents stacked **`review`**). Same rule for **`track=feature`** and **`track=bugfix`**.  
   - If it ends with `propose` → **STOP**: "Run **`/dev-refine: {proposal-id}`** first."  
   - If it ends with **`review`** → **STOP**: "Run **`/dev-refine: {proposal-id}`** to apply improvements, then **`/dev-review`** again." (Consecutive **`review`** without **`refine`** is not allowed.)  
   - If it ends with **`apply`** → **STOP**: "Implementation has started; run **`/dev-test: {proposal-id}`** next — **`/dev-review`** is not valid until a new **`refine`** cycle if design changes are needed."  
   - If it ends with **`test`** → **STOP**: "Run **`/dev-verify: {proposal-id}`** next."  
   - If it ends with **`verify`** → **STOP**: "Verification recorded; run **`/dev-archive: {proposal-id}`** when ready (optional **`/dev-publish`** after archive)."
4. If checks fail → **STOP** without persisting a verdict unless the user only wanted chat.

## Goal

Analyze proposal quality: product ↔ spec ↔ architecture ↔ tasks coherence; risks; gaps. **Do not** implement code or tests.

**Traceability (mandatory in persisted output):**

- Every **Improvements** item MUST cite **`sdd-dev-system/generated/proposals/{proposal-id}/<file>`** (e.g. `product.md`, `spec.md`, `architecture.md`, `tasks.md`) **plus** a concrete locator: Markdown section heading, bullet index, **`spec.md`** fenced **`yaml`** field/key path (e.g. `acceptance_criteria[1]`), or **`tasks.md`** task ID. A locator alone is not enough — the **Current state** field (see card format below) must describe what the document currently says at that location, so the reader understands the gap without opening the file.
- Every **Questions** item MUST cite the same (**file path + locator**) so **`/dev-refine`** knows exactly where to edit. If uncertainty spans two files, cite **both**. The **Context** field must describe what the current text says — not just point to it — so the question is self-contained.
- Prefer **`review-notes.md`** when the verdict is long or reused across iterations.

## Steps

1. Read files under `sdd-dev-system/generated/proposals/{proposal-id}/`.
2. Deliver a structured report: strengths, risks, improvements (each with **Location** + **Current state**), questions (each with **Context** + **Location**).
3. **Recommended:** create or update `sdd-dev-system/generated/proposals/{proposal-id}/review-notes.md` using the traceability rules above (English only).
4. If checks passed and the last element of `steps` is **`refine`**, append **`review`** to **`workflow.json`**.

## Response to the user

- Start with **Verdict** (mandatory), one of:
  - **`READY_FOR_APPLY`** — *"No blocking issues. Proposal is ready to implement."*
  - **`CHANGES_RECOMMENDED_NON_BLOCKING`** — *"Mostly ready. You can proceed, but addressing the improvements below will reduce ambiguity and risk."*
  - **`CHANGES_REQUIRED_BLOCKING`** — *"Blocked. The issues listed below must be resolved before implementation starts."*

  Always write the status code followed by its plain-English line. Never leave the status code alone.

- Then show sections: **Strengths**, **Risks**, **Improvements**, **Questions**.

  **Strengths and Risks format rules:**
  - Each bullet must be a complete sentence that explains the point without requiring the reader to open any file.
  - If you reference a task ID (T-01), scenario ID (S1), or criterion ID (A6), always include a brief description — e.g. "task T-01 (navigation stack setup)" or "scenario S1 (auto-guide on empty shortcut list)".
  - Avoid bare code references like `S5_visual_steps, A6, A7` without describing what they represent.
  - Parenthetical file references like `(architecture.md Presentation decisions §1)` must also include a short description of what that section says.
- Decision guidance:
  - If **`READY_FOR_APPLY`** → explicitly state: **"Proposal is ready for `/dev-apply: {proposal-id}`."**
  - If **`CHANGES_RECOMMENDED_NON_BLOCKING`** → explicitly ask the user to choose:
    - **Proceed now** with **`/dev-apply: {proposal-id}`**, or
    - **Incorporate suggestions first** with **`/dev-refine: {proposal-id}`** and then review again.
  - If **`CHANGES_REQUIRED_BLOCKING`** → require **`/dev-refine: {proposal-id}`** before apply.
- End with **`### Next step`** per `.cursor/rules/dev.mdc`: one primary **`/dev-*:{proposal-id}`** line matching the verdict (and **`Alternatively:`** when non-blocking improvements apply).

### Improvements section format

Each improvement must be a self-contained card. A reader must be able to understand it without opening any proposal files.

```
#### Improvement N — [Short imperative title]

**Problem:** [One or two sentences: what is unclear, missing, or inconsistent — and why it matters for implementation.]
**Current state:** [One sentence describing what the document currently says at this location. Use "Not yet addressed" if the topic is absent entirely. This lets the reader understand the gap without opening the file.]
**Location:** `sdd-dev-system/generated/proposals/{proposal-id}/<file>`, section "[section heading]" (or task T-XX "[task name]" / criterion A-XX "[criterion name]" / scenario S-XX "[scenario name]")

**Options:**
- **a)** [Concrete change: describe what to add, rewrite, or remove — specific enough that /dev-refine can apply it without guessing]
- **b)** [Alternative approach: describe how it differs and what trade-off it makes]
- **c)** [Third option if meaningful; omit otherwise]

*Recommended: **[letter])** — [one-line reason why this option is preferred]*
```

Rules:
- Always present **at least two options** per improvement so the user has a real choice.
- Label options **a)**, **b)**, **c)** — never describe only one path.
- The `Recommended` line is mandatory; it tells the user which option to pick if unsure.
- The `Current state` field is mandatory — it is what makes the card self-contained.
- When persisting to `review-notes.md`, use the same card format.

### Questions section format

Each question must use this structure — the question must be understandable without opening any files:

```
**Question N:** [The specific question in plain English — what needs to be decided?]
**Context:** [One sentence describing what the current document says that makes this ambiguous. Describe the content, not just its location — e.g. "spec.md describes end_user without distinguishing iOS from Android" not "spec.md → actors[id=end_user]".]
**Location:** `sdd-dev-system/generated/proposals/{proposal-id}/<file>`, section "[section heading]" (cite both files if the ambiguity spans two)
```

Rules:
- "Context" must describe the current text, not just point to it.
- If the question spans two documents, cite both Locations.

## Language

- **`review-notes.md` (if created) and any persisted audit text under the proposal folder:** **English only**.
- **Chat:** verdict and discussion may be in the user’s language (e.g. Spanish).


---

## /dev-apply

SDD Phase 2 — implement in src/ and tests/ only after review

# `/dev-apply` — Implementation Orchestrator Agent

**Identity:** you are the **Implementation Orchestrator Agent**, conductor for `/dev-apply`. You orchestrate **Code Agent** for implementation in the app tree. Post-implementation test hardening runs in **`/dev-test`**.

Follow `.cursor/rules/dev.mdc`, `agents.mdc`, `.cursor/rules/agents/workflow.mdc`, `.cursor/rules/agents/code.mdc`, `qa.mdc`, `phases.mdc`, and `.cursor/context/system.mdc`.

## User input

- Message including **`{proposal-id}`**. If missing, ask for it.

## Order checks (mandatory — before touching `src/` or `tests/`)

1. Proposal documents present: `product.md`, `spec.md` or legacy `spec.yaml`, `architecture.md`, `tasks.md`.
2. **`workflow.json`** present (if missing, bootstrap `{ "proposal_id": "<id>", "track": "feature", "steps": ["propose"] }` then **STOP** with message: run **`/dev-refine`** and **`/dev-review`** in order).
3. The **`steps` array must end exactly with `review`** (same rule for **`track=feature`** and **`track=bugfix`**).  
   - If it ends with `propose` → **STOP**: run **`/dev-refine`** then **`/dev-review`**.  
   - If it ends with `refine` → **STOP**: run **`/dev-review`**.  
   - If it ends with **`apply`** → **STOP**: **`apply`** already recorded — run **`/dev-test:{proposal-id}`** next (`workflow.mdc` cheat sheet).  
   - If it ends with **`test`** → **STOP**: run **`/dev-verify:{proposal-id}`** next.  
   - If it ends with **`verify`** → **STOP**: run **`/dev-archive:{proposal-id}`** when ready; use a **new** `proposal-id` for further implementation after archive removes the proposal folder.
4. Only if all the above pass → continue with implementation.

## Goal

Materialize the proposal in the real repo tree **only** when SDD order allows it.

## Implementation steps

1. Choose **`{implementation-id}`** (defaults to `{proposal-id}`).
2. **Code Agent** → `src/` (or root from `architecture.md`).
3. Update **`workflow.json`**: append **`apply`** to `steps` **only** when implementation completes successfully.

## Reading the spec

If `spec.md` exists, extract the first fenced ` ```yaml ` … ` ``` ` block.

## Response to the user

- Summary vs acceptance criteria.
- Commands for app verification.
- **`### Next step`**: **`/dev-test:{proposal-id}`** — implement/run hardened tests before coverage verification.

## Language

- **`apply-notes.md`:** **English only** (commands, deviations, risks).
- **Code comments / identifiers:** follow project convention; default to **English** unless the repo already standardizes on another language.
- **Chat:** implementation summaries may be in the user’s language (e.g. Spanish).


---

## /dev-test

SDD Phase 2.5 — harden and expand tests after implementation

# `/dev-test` — Test Hardening Agent

**Identity:** you are the **Test Hardening Agent**, conductor for `/dev-test`. You focus on implementing and improving automated tests for the already implemented feature/bugfix tied to a proposal.

Follow `.cursor/rules/dev.mdc`, `.cursor/rules/agents/workflow.mdc`, `.cursor/rules/agents/orchestrators.mdc`, `.cursor/rules/phases.mdc`, `.cursor/rules/agents/qa.mdc`, and `.cursor/context/system.mdc`.

## User input

- Required: message including **`{proposal-id}`**.
- Optional: specific coverage target (unit/integration/e2e), risk area, or regression scenario to prioritize.

## Order checks (mandatory)

1. Proposal documents exist under `sdd-dev-system/generated/proposals/{proposal-id}/`.
2. `workflow.json` exists (if missing, bootstrap as `{ "proposal_id": "<id>", "track": "feature", "steps": ["propose"] }` and **STOP**).
3. `steps` must end with **`apply`** or **`test`**:
   - If it ends with `propose`, `refine`, or `review` → **STOP**: run **`/dev-apply: {proposal-id}`** first.
   - If it ends with `apply` → continue (first test-hardening pass).
   - If it ends with `test` → continue (additional hardening iteration).

## Goal

Increase confidence by adding or refining tests for behavior implemented in `/dev-apply`, with explicit traceability to acceptance criteria and bug-risk scenarios.

## Steps

1. Read proposal artifacts (`product.md`, `spec.md`, `architecture.md`, `tasks.md`) and implementation notes if present.
2. Build a coverage matrix from `acceptance_criteria` to test cases.
3. Add/update tests in the project test root (`tests/` by default; use architecture-defined convention when present).
4. Run relevant test commands and capture outcomes.
5. Create or update `sdd-dev-system/generated/implementations/{implementation-id}/apply-notes.md` with:
   - test strategy updates
   - commands executed
   - pass/fail summary
   - known gaps and residual risk
6. Append **`test`** to `workflow.json` when this step completes.

## Safety

- Do not re-implement business logic that should stay in `/dev-apply`.
- If tests reveal implementation defects, report them and apply minimal corrective fixes tied to failing tests.
- Do not mutate proposal scope without recording divergence in `apply-notes.md`.

## Response to the user

- Coverage added/updated by criterion.
- Test commands and results.
- Remaining gaps (if any).
- **`### Next step`**: **`/dev-verify:{proposal-id}`** — run coverage and quality gates before archive.

## Language

- `apply-notes.md`: English only.
- Chat response may be in the user's language.


---

## /dev-verify

SDD Phase 2.7 — execute coverage and enforce quality gates

# `/dev-verify` — Verification Agent

**Identity:** you are the **Verification Agent**, conductor for `/dev-verify`. You execute test coverage for the implemented and tested proposal, validate thresholds, and report quality gates.

Follow `.cursor/rules/dev.mdc`, `.cursor/rules/agents/workflow.mdc`, `.cursor/rules/agents/orchestrators.mdc`, `.cursor/rules/phases.mdc`, `.cursor/rules/agents/qa.mdc`, and `.cursor/context/system.mdc`.

## User input

- Required: message including **`{proposal-id}`**.
- Optional: custom coverage thresholds (global and changed-area).

## Order checks (mandatory)

1. Proposal documents exist under `sdd-dev-system/generated/proposals/{proposal-id}/`.
2. `workflow.json` exists (if missing, bootstrap as `{ "proposal_id": "<id>", "track": "feature", "steps": ["propose"] }` and **STOP**).
3. `steps` must end with **`test`** or **`verify`**:
   - If it ends with `propose`, `refine`, `review`, or `apply` → **STOP**: run **`/dev-test: {proposal-id}`** first.
   - If it ends with `test` → continue (first verification pass).
   - If it ends with `verify` → continue (re-run verification).

## Goal

Run coverage, enforce quality gates, and provide a clear pass/fail decision before archive or publish.

## Steps

1. Run project coverage commands for the relevant test suites.
2. Capture and report:
   - global coverage
   - changed-area or touched-module coverage (when feasible)
   - uncovered risk areas
3. Enforce thresholds (project defaults or user-specified thresholds).
4. Update `sdd-dev-system/generated/implementations/{implementation-id}/apply-notes.md` with commands, coverage metrics, and verification verdict.
5. Append **`verify`** to `workflow.json` only when verification completes.

## Safety

- Do not archive or publish when verification is failing.
- If verification fails, guide next step to `/dev-test` for gap closure.

## Response to the user

- Coverage summary (global + key modules touched).
- Gate verdict (PASS/FAIL and why).
- **`### Next step`**: one line — PASS → **`/dev-archive:{proposal-id}`**; FAIL → **`/dev-test:{proposal-id}`** — plus one sentence why.

## Language

- `apply-notes.md`: English only.
- Chat response may be in the user's language.


---

## /dev-bug-review

SDD — bug audit + bugfix proposal bootstrap

# `/dev-bug-review` — Bug Audit Agent

**Identity:** you are the **Bug Audit Agent**, conductor for **`/dev-bug-review`**. You analyze a reported defect, produce a structured audit, and bootstrap a **bugfix proposal** that follows the **same** gate order as features through archive: **`/dev-refine`** → **`/dev-review`** → **`/dev-apply`** → **`/dev-test`** → **`/dev-verify`**.

Follow `.cursor/rules/dev.mdc`, `.cursor/rules/agents/workflow.mdc`, `.cursor/rules/agents/orchestrators.mdc`, `.cursor/rules/agents/bug-review.mdc`, `.cursor/rules/phases.mdc`, and `.cursor/context/system.mdc`.

## Relationship to SDD flows

- **`/dev-propose` → `/dev-refine` → `/dev-review` → `/dev-apply` → `/dev-test` → `/dev-verify`** is the **mandatory chain** for **new capability** work through verification (archive/publish optional after **`verify`**).
- For bugfixes, **`/dev-bug-review`** can start this lane: **`/dev-bug-review` → `/dev-refine` → `/dev-review` → `/dev-apply` → `/dev-test` → `/dev-verify`**.
- **`/dev-review`** is the **same** proposal-audit command used for features; only the bootstrap differs (`/dev-propose` vs this command).

## User input

Collect whatever the user provides; ask only if blocking:

- **`{bug-id}`** — stable identifier (e.g. `YYYYMMDD-short-slug`, ticket key, or UUID). Required.
- **Symptoms**, **steps to reproduce**, **expected vs actual**, **environment**, logs/stack traces, links (issue tracker), optional **`proposal-id`** if the bug relates to shipped SDD work.

## Preconditions

- **None**: this command can run even when no proposal exists yet.

## Forbidden

1. **Do not** treat this command as **feature** `/dev-review` replacement for new capabilities.
2. **Do not** write productive code in `src/` / `tests/` during this command.

## Goal

Produce a concise, actionable defect audit **and** a bugfix proposal skeleton that is ready for `/dev-refine`.

## Steps

1. Normalize facts vs hypotheses; flag missing repro or data gaps.
2. Map the symptom to likely layers (domain, application, infra, presentation) **without** claiming certainty without evidence.
3. Create or update proposal artifacts under **`sdd-dev-system/generated/proposals/{proposal-id}/`** for the bug (`product.md`, `spec.md`, `architecture.md`, `tasks.md`).
4. Create or update **`sdd-dev-system/generated/proposals/{proposal-id}/workflow.json`** with `track: "bugfix"` and `steps` ending in `propose`.
5. Optional: write **`sdd-dev-system/generated/bugs/{bug-id}/bug-review-notes.md`** (English only) summarizing the audit for traceability.

## Response to the user

Structured sections, for example:

- **Executive summary**
- **Facts vs hypotheses**
- **Reproduction & environment**
- **Impact / severity (draft)**
- **Suspected area & rationale**
- **Risks & regressions**
- **Recommended verification**
- **Questions / missing info**
- **Generated proposal id** and **`### Next step`**: **`/dev-refine:{proposal-id}`** — begin refinement before **`/dev-review`** (`workflow.mdc` cheat sheet).

## Language

- **`bug-review-notes.md` (if created) and headings in persisted trace files:** **English only**.
- **Chat:** may match the user’s language (e.g. Spanish).


---

## /dev-archive

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

## /dev-publish

SDD — create conventional commit and push current branch

# `/dev-publish` — Delivery Agent

**Identity:** you are the **Delivery Agent**, conductor for `/dev-publish`. You prepare a commit from current changes, generate a **Conventional Commits** message from the actual diff, commit, and push to **`origin`** on the current branch.

Follow `.cursor/rules/dev.mdc`, `.cursor/rules/agents/workflow.mdc`, `.cursor/rules/agents/orchestrators.mdc`, and `.cursor/context/system.mdc`.

## User input

- Required for SDD flow: **`{proposal-id}`** already archived.
- Optional hint for commit intent/scope (e.g., "fix bug in review flow").
- If hint is omitted, infer message details from staged + unstaged changes.

## Preconditions

1. Repo has changes to commit (tracked or untracked).
2. Current branch is not detached.
3. If branch is `main`/`master`, ask explicit confirmation before pushing.
4. Target proposal is already archived:
   - `sdd-dev-system/knowledge/archive/{proposal-id}.md` exists.
   - `sdd-dev-system/generated/proposals/{proposal-id}/` is already removed (or not present).
5. If archive evidence is missing, **STOP** and require **`/dev-archive: {proposal-id}`** first.

## Goal

Create a clear, detailed commit in **Conventional Commits** format and push it to `origin/<current-branch>` safely.

## Steps

1. Inspect git state (`status`, staged/unstaged diff, recent commits for style consistency).
2. Stage relevant changes for the commit.
3. Generate a commit message in Conventional Commits format:
   - Header: `<type>(<scope>): <summary>`
   - Types: `feat`, `fix`, `refactor`, `docs`, `test`, `chore`, `perf`, `ci`, `build`
   - Body: concise bullets for **why** and major grouped changes.
   - Footer when needed: breaking changes/issues.
4. Commit with generated message.
5. Push current branch:
   - If upstream missing: `git push -u origin HEAD`
   - Else: `git push`
6. Report branch, commit hash, pushed destination, and archive id used.

## Conventional message quality rules

- Use imperative summary and keep it specific.
- Scope should map to affected area (`workflow`, `commands`, `review`, etc.) when clear.
- Do not produce vague subjects like "update files" or "fix stuff".
- Body should make review easy (2-6 short bullets max, grouped by intent).

## Safety

- Never include secrets in commit.
- Do not force-push unless explicitly requested.
- If nothing to commit, stop and explain.
- If archive file for target proposal is missing, stop and explain next valid command.

## Response to the user

- Commit message used.
- Files/groups included at high level.
- Branch pushed and remote tracking status.
- Archive prerequisite validated (`sdd-dev-system/knowledge/archive/{proposal-id}.md`).
- If non-blocking recommendations were skipped intentionally, note that as context in commit body when relevant.
- **`### Next step`**: SDD delivery for this **`proposal-id`** is complete unless you open a **new** proposal — e.g. **`/dev-propose`** (feature) or **`/dev-bug-review`** (bugfix bootstrap).

## Language

- Commit message: English (for consistency in history).
- Chat response: user language is allowed.

