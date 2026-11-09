import { OperatorWorkflowPage } from '@/components/seo/OperatorWorkflowPage'

export default function RestaurantLogbookPage() {
  return (
    <OperatorWorkflowPage
      eyebrow="SUNDAE CREW · LOGBOOK AND SHIFT HANDOVER"
      title="A digital restaurant logbook for every shift."
      accent="from-[#0EA5E9] to-[#1C47FF]"
      description="Keep manager notes, shift handovers, issues and follow-up in one searchable operating record, so the next team starts with context instead of guesswork."
      challenges={[
        'Important handover details disappear into paper books, group chats or individual manager memory.',
        'The same maintenance, service or staffing issue repeats because no one can find the prior context.',
        'A note is recorded, but no owner, task or measured outcome carries it forward.',
      ]}
      capabilities={[
        'Shift notes and manager handovers',
        'Issues, alerts and follow-up records',
        'Searchable history across locations',
        'Link notes to tasks, owners and operating context',
      ]}
      outcomes={[
        'Every shift begins with the context the manager needs.',
        'Regional teams can spot recurring issues instead of treating each shift as a new event.',
        'Communication becomes a record that supports action, coaching and measured improvement.',
      ]}
      questions={[
        { question: 'What is a digital restaurant logbook?', answer: 'It is a shared operating record for shift notes, handovers, issues, manager updates and follow-up across one or more restaurant locations.' },
        { question: 'What should a restaurant shift handover include?', answer: 'A useful handover captures what happened, what needs attention, who owns the next action and what the incoming team should know before service.' },
        { question: 'Can a logbook connect to restaurant task management?', answer: 'Yes. Sundae’s operating model connects communication and follow-up so a note can lead to an assigned task, an approval or a review of the outcome.' },
      ]}
      related={[{ label: 'Sundae Crew', href: '/crew' }, { label: 'Restaurant task management', href: '/restaurant-task-management' }, { label: 'Pulse operations', href: '/product/pulse' }]}
    />
  )
}
