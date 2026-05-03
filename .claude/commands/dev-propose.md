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
