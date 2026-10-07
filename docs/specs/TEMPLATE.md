# <Title>

**Status:** proposed | planned | partly built | done | on hold | kept for reference — <what is true now, as of YYYY-MM-DD>.
**Kind:** proposal | requirements | technical design | reference.
**Baseline:** <release or commit checked, date, and relevant code/docs; write “none” for new work>.
**Decision needed:** <specific decision and who makes it, or “none”>.

<!-- Copy this file, replace the placeholders, and delete sections that do not apply. Keep built
behavior, approved decisions, proposals, and open questions visibly distinct. Link to the PRD
for product behavior already documented there instead of copying it. -->

## Summary

<In a few sentences: who needs this, what changes, the recommended outcome, and why now. A reader
should understand the request without reading the implementation details.>

## Current state and problem

- **As built:** <what exists today; cite code, a test, a release, or the PRD>.
- **Gap:** <the observed problem or unmet need, and its impact>.
- **Assumptions:** <facts that have not yet been verified; omit if none>.

## Goals and scope

- **Goals:** <observable outcomes, not implementation steps>.
- **In scope:** <what this work includes>.
- **Out of scope:** <nearby work deliberately excluded>.
- **Constraints:** <platform, privacy, compatibility, performance, accessibility, cost, or policy
  boundaries that shape the answer>.

## Requirements

<!-- Use a table when several requirements need separate tracking. Otherwise use a short list.
Write behavior that can be observed or checked; avoid restating implementation details. -->

| ID | Requirement | Priority | State |
| --- | --- | --- | --- |
| R1 | <The system/user must be able to…> | must | planned |
| R2 | <Failure, boundary, or accessibility behavior…> | must | planned |

## Behavior and approach

<Label built behavior and proposed behavior separately. Describe the user flow, system flow, or
technical approach at the level needed for this decision. For a pure requirements spec, describe
behavior and leave implementation open. For a technical design, name the components and the
ownership of each step.>

### Interfaces and data (if applicable)

<Specify only contracts that another component, client, or migration depends on: inputs,
outputs, validation, error behavior, storage, and versioning. Use a small example or table when
it is clearer than prose. State where sensitive data is allowed to exist.>

### Failure and edge cases (if applicable)

<What happens when inputs are invalid, a dependency is unavailable, work is cancelled, state is
stale, or a partial write fails? Include only cases that change the behavior or design.>

## Options and decisions (if applicable)

| Option | Benefit | Cost or risk | Decision |
| --- | --- | --- | --- |
| <recommended option> | <why it meets the goals> | <main tradeoff> | proposed / approved, by <name>, YYYY-MM-DD |
| <credible alternative> | <why someone would choose it> | <why it was not chosen> | rejected / deferred |

<!-- Record a decision as approved only when it was actually made. Do not let a recommendation
silently become a requirement. -->

## Delivery and compatibility (if applicable)

<List the smallest useful increments, dependencies, migration of existing data or behavior,
rollout, and rollback. Give each phase an observable exit condition. Name affected repositories
or documents when work crosses their boundaries.>

## Verification

<!-- Include the smallest checks that would catch a broken implementation. Cover the main flow
and important negative or privacy cases. For unbuilt work, mark these as acceptance criteria;
for built work, cite tests or real-world checks and say what is still pending. -->

| Scenario or requirement | Expected result | Evidence / check | State |
| --- | --- | --- | --- |
| <main flow / R1> | <observable outcome> | <test or manual check> | planned / passed / pending |
| <failure or boundary / R2> | <safe outcome> | <test or manual check> | planned / passed / pending |

## Risks and open questions

| Item | Impact or decision needed | Owner | Needed by |
| --- | --- | --- | --- |
| <risk or unanswered question> | <mitigation or options> | <person/team> | <phase/date> |

## References

- <Relevant PRD section, code, tests, companion spec, or design artifact.>
- <External source and date checked, if a claim depends on changing facts.>
