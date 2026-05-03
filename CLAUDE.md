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
