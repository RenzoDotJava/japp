import React from 'react'
import { MdWork, MdHomeWork } from "react-icons/md";
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

import { Typography } from '../ui/typography';
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
      <div
        ref={setNodeRef}
        style={style}
        className="bg-white shadow-sm rounded-md min-h-[110px] opacity-85"
      />
    )
  }

  return (
    <>
      <ApplicationModal
        className='w-full bg-white shadow-sm py-3 min-h-[95px] rounded-md cursor-pointer'
        ref={setNodeRef}
        style={style}
        attributes={attributes}
        listeners={listeners}
      >
        <div className='flex flex-col justify-center mx-4 gap-1 overflow-hidden'>
          <Typography className='text-base font-medium text-start truncate' variant="p">{application.content}</Typography>
          <div className='flex items-center gap-2 '>
            <MdWork />
            <Typography className='text-sm text-start truncate' variant="p">
              Google
            </Typography>
          </div>
          <Typography className='text-sm flex items-center gap-2' variant="p">
            <MdHomeWork />
            Híbrido
          </Typography>
        </div>
      </ApplicationModal>
    </>
  )
}

export default ApplicationCard