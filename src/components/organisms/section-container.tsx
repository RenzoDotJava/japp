import React, { useMemo } from 'react'
import { SortableContext, useSortable } from '@dnd-kit/sortable'

import ApplicationCard from '../molecules/application-card'
import { Typography } from '../ui/typography'
import { Application, Id, Section } from '@/types'

interface SectionContainerProps {
  section: Section
  applications: Application[]
}

const SectionContainer: React.FC<SectionContainerProps> = ({ section, applications }) => {

  const applicationsIds = useMemo(() => applications.map(application => application.id!), [applications])

  const { setNodeRef } = useSortable({
    id: section.id,
    data: {
      type: "Section",
      section
    },
  })

  return (
    <div
      ref={setNodeRef}
      className="bg-gray-100 min-w-[200px] min-h-full border rounded-md p-4 flex flex-col flex-1 relative"
    >
      <div
        className="flex justify-center items-center sticky"
      >
        <Typography className="font-medium text-center text-black" variant="h4">{section.title}</Typography>
      </div>
      <div className="flex flex-1 flex-col gap-3 mt-4 overflow-y-auto overflow-x-hidden">
        <SortableContext items={applicationsIds}>
          {applications.map(application => (
            <ApplicationCard key={application.id} application={application} />
          ))}
        </SortableContext>
      </div>
    </div>
  )
}

export default SectionContainer