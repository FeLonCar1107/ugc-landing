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
