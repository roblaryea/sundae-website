import { OperatorWorkflowPage } from '@/components/seo/OperatorWorkflowPage'

export default function RestaurantManagementPlatformPage() {
  return (
    <OperatorWorkflowPage
      eyebrow="SUNDAE · HOSPITALITY AND FOOD-SERVICE OPERATING PLATFORM"
      title="Restaurant management software for every shift and every location."
      accent="from-[#1C47FF] to-[#FF5C4D]"
      description="A restaurant-management entry point into Sundae’s broader operating platform for hospitality and food-service groups. Connect people, workflows, operating data, decision support and measured recovery across every location."
      challenges={[
        'Scheduling, attendance, tasks, handovers, payroll and performance live in separate systems with no shared operating record.',
        'Regional leaders see isolated reports instead of the context behind an exception and the person responsible for the next action.',
        'An operating improvement is hard to repeat when teams cannot compare what happened, what changed and what worked.',
      ]}
      capabilities={[
        'Workforce, scheduling and attendance workflows',
        'Tasks, approvals and shift handovers',
        'Connected intelligence across operations and performance',
        'Measured action and preventable-profit recovery',
      ]}
      outcomes={[
        'Operators get one operating rhythm across brands, locations and teams.',
        'Managers can act on live context while leaders see the pattern across the group.',
        'Restaurant workflows lead into the same decision and recovery loop used across hospitality and food-service operations.',
      ]}
      questions={[
        { question: 'What is restaurant management software?', answer: 'It connects the daily systems and workflows used to run restaurant locations, including people, schedules, tasks, handovers, attendance, payroll readiness, operating data and performance review.' },
        { question: 'Is Sundae only for restaurants?', answer: 'Restaurant operations are a core search and product entry point, while Sundae’s operating platform is designed for multi-location hospitality and food-service operators more broadly.' },
        { question: 'Where does AI fit into the platform?', answer: 'AI is embedded in the operating workflow to help teams understand context, answer operating questions, recommend next actions and review what changed.' },
      ]}
      related={[{ label: 'Sundae platform', href: '/' }, { label: 'Sundae Crew', href: '/crew' }, { label: 'Profit Recovery', href: '/product/recovery' }, { label: 'Ask Sundae', href: '/product/intelligence' }]}
    />
  )
}
