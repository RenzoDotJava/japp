import React from 'react'
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

import { Typography } from '../ui/typography';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog"
import { Application } from '../../types';
import ApplicationModal from '../organisms/application-modal';

interface ApplicationCardProps {
  application: Application
}

const ApplicationCard: React.FC<ApplicationCardProps> = ({ application }) => {
  const { setNodeRef, attributes, listeners, transform, transition, isDragging } = useSortable({
    id: application.id,
    data: {
      type: "Application",
      application
    }
  })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  }

  if (isDragging) {
    return (
      <>
        <div
          ref={setNodeRef}
          style={style}
          className="bg-white shadow-sm p-2 rounded-md min-h-[45px] opacity-85"
        />

      </>
    )
  }

  return (
    <>
      <ApplicationModal
        className='w-full bg-white shadow-sm p-2 min-h-[45px] flex rounded-md cursor-pointer'
        style={style}
        attributes={attributes}
        listeners={listeners}
      >
        <Typography variant="p">{application.content}</Typography>
      </ApplicationModal>
      {/* <Dialog>
        <DialogTrigger
          className='w-full bg-white shadow-sm p-2 min-h-[45px] flex rounded-md cursor-pointer"'
          ref={setNodeRef}
          style={style}
          {...attributes}
          {...listeners}
        >
          <Typography variant="p">{application.content}</Typography>
        </DialogTrigger>
        <DialogContent className='w-[350px]'>
          <DialogHeader>
            <DialogTitle>Agregar postulación de trabajo</DialogTitle>
          </DialogHeader>
        </DialogContent>
      </Dialog> */}
    </>
  )
}

export default ApplicationCard