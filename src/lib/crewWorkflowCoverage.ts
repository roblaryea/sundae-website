/** Explicit commercial scope, independent of whichever screenshot a page reuses. */
export const CREW_WORKFLOW_SCOPES = {
  'restaurant-task-management': 'operations',
  'restaurant-logbook': 'operations',
  'restaurant-tip-management': 'payroll',
} as const

export function crewWorkflowScope(slug: string) {
  return CREW_WORKFLOW_SCOPES[slug as keyof typeof CREW_WORKFLOW_SCOPES] ?? null
}
