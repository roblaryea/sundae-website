import { OperatorWorkflowPage } from '@/components/seo/OperatorWorkflowPage'

export default function RestaurantTipManagementPage() {
  return (
    <OperatorWorkflowPage
      eyebrow="SUNDAE CREW · TIP WORKFLOWS"
      title="Restaurant tip workflows ready for review."
      accent="from-[#F59E0B] to-[#EC4899]"
      description="Bring tip rules, staff context, review steps and payroll readiness into one workflow that managers and payroll teams can explain."
      challenges={[
        'Tip calculations depend on rules, roles, locations and source data that are often reconciled manually.',
        'Managers and payroll teams need to review exceptions without losing the underlying evidence.',
        'The team can finish a payroll cycle without learning which staffing, attendance or service patterns changed the result.',
      ]}
      capabilities={[
        'Configurable tip pool and distribution workflows',
        'Role, location and pay-period review context',
        'Exception approval and evidence capture',
        'Payroll-ready handoff and workforce intelligence',
      ]}
      outcomes={[
        'Tip workflows become reviewable and explainable before handoff.',
        'Managers and payroll teams share one operating record for exceptions.',
        'Workforce and attendance signals can inform the decisions that follow the pay cycle.',
      ]}
      questions={[
        { question: 'What is restaurant tip management software?', answer: 'It supports the rules, calculations, review steps and handoff required to manage tips across restaurant roles, locations and pay periods.' },
        { question: 'Does tip management need to connect to payroll?', answer: 'Tip workflows are most useful when their review and evidence can move into payroll readiness or a partner handoff without recreating the work in another spreadsheet.' },
        { question: 'How does Sundae connect tip workflows to operations?', answer: 'Crew connects tip and workforce workflows to scheduling, attendance, payroll readiness and the wider decision-intelligence layer so teams can review what changed and why.' },
      ]}
      related={[{ label: 'Crew Payroll', href: '/crew/payroll' }, { label: 'Time and Attendance', href: '/crew/time-attendance' }, { label: 'Workforce Intelligence', href: '/crew/people-intelligence' }]}
    />
  )
}
