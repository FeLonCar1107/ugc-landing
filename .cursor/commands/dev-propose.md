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
