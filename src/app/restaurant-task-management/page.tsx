import { OperatorWorkflowPage } from '@/components/seo/OperatorWorkflowPage'

export default function RestaurantTaskManagementPage() {
  return (
    <OperatorWorkflowPage
      eyebrow="SUNDAE CREW · RESTAURANT TASK MANAGEMENT"
      title="Restaurant task management that survives the rush."
      accent="from-[#FF5C4D] to-[#F59E0B]"
      description="Assign opening, closing, recurring and exception work to the right person, track completion across locations and carry the evidence into the next operating decision."
      challenges={[
        'Opening and closing checklists live in paper, chat threads or spreadsheets that no one can audit later.',
        'Regional managers see that a task was missed without seeing who owned it, what blocked it or whether the issue repeated.',
        'A task gets completed, but the operating signal never reaches the schedule, the manager or the performance review.',
      ]}
      capabilities={[
        'Opening, closing and recurring checklists',
        'Assignments by role, site, brand or region',
        'Manager approvals and completion evidence',
        'Exception escalation and follow-through',
      ]}
      outcomes={[
        'Every task has an owner, a status and a visible next step.',
        'Managers can compare execution patterns across shifts and locations.',
        'Completed work becomes context for coaching, prioritization and measured recovery.',
      ]}
      questions={[
        { question: 'What is restaurant task management software?', answer: 'It gives restaurant teams a shared way to assign, complete, approve and review daily operating work such as opening, closing, safety, maintenance and service checklists.' },
        { question: 'Can task management work across multiple locations?', answer: 'Sundae Crew is designed for role, site, brand and region ownership so operators can standardize work while keeping local accountability visible.' },
        { question: 'How does task management connect to restaurant performance?', answer: 'Task status and evidence can become operating context for manager follow-up, exception review and the decisions measured through Sundae’s operating loop.' },
      ]}
      related={[{ label: 'Sundae Crew', href: '/crew' }, { label: 'Real-time operations', href: '/product/pulse' }, { label: 'Profit Recovery', href: '/product/recovery' }]}
    />
  )
}
