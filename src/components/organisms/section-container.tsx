import React, { useMemo } from 'react'
import { SortableContext, useSortable } from '@dnd-kit/sortable'
import { IoMdAdd } from 'react-icons/io'

import ApplicationCard from '../molecules/application-card'
import ApplicationModal from './application-modal';
import { Typography } from '../ui/typography'
import { Button } from '../ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog';
import { Application, Id, Section } from '@/types'

interface SectionContainerProps {
  section: Section
  applications: Application[]
  addApplication: (id: Id) => void
}

const SectionContainer: React.FC<SectionContainerProps> = ({ section, applications, addApplication }) => {

  const applicationsIds = useMemo(() => applications.map(application => application.id), [applications])

  const { setNodeRef } = useSortable({
    id: section.id,
    data: {
      type: "Section",
      section
    }
  })

  const onCloseModal = () => {
    addApplication(section.id)
  }

  return (
    <div
      ref={setNodeRef}
      className="bg-gray-100 min-w-[290px] min-h-full border rounded-md p-4 flex flex-col relative"
    >
      <div
        className="flex justify-between items-center sticky"
      >
        <Typography className="font-medium text-black" variant="h4">{section.title}</Typography>
        {/* <ApplicationModal
          className='min-h-8 min-w-8 px-2 py-1 rounded-full bg-primary text-primary-foreground hover:bg-primary/85'
          onClose={() => addApplication(section.id)}
        >
          <IoMdAdd className="min-h-4 min-w-4" />
        </ApplicationModal> */}
        <Button
          size={'xs'}
          onClick={() => addApplication(section.id)}
        >
          <IoMdAdd className="min-h-4 min-w-4" />
        </Button>
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