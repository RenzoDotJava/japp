import React, { useState } from 'react'
import { MdWork, MdHomeWork } from "react-icons/md";
import { FaTrashAlt } from "react-icons/fa";
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

import { Typography } from '../ui/typography';
import { Application } from '../../types';
import ApplicationModal from '../organisms/application-modal';
import { useApplicationStore } from '@/store/application';

interface ApplicationCardProps {
  application: Application
}

const ApplicationCard: React.FC<ApplicationCardProps> = ({ application }) => {
  const [mouseIsOver, setMouseIsOver] = useState(false)
  const { setNodeRef, attributes, listeners, transform, transition, isDragging } = useSortable({
    id: application.id!,
    data: {
      type: "Application",
      application
    }
  })

  const { updateApplication, deleteApplication } = useApplicationStore()

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
        className='w-full bg-white shadow-sm py-3 min-h-[95px] rounded-md cursor-pointer relative'
        ref={setNodeRef}
        style={style}
        attributes={attributes}
        listeners={listeners}
        application={application}
        onClose={updateApplication}
        setMouseIsOver={setMouseIsOver}
        title="Editar postulación de trabajo"
      >
        <div className='flex flex-col justify-center mx-4 gap-2 overflow-hidden'>
          <Typography className='text-base font-medium text-start truncate' variant="p">{application.jobPosition}</Typography>
          <div className='flex items-center gap-2 '>
            <MdWork />
            <Typography className='text-sm text-start truncate' variant="p">
              {application.company}
            </Typography>
          </div>
          <Typography className='text-sm flex items-center gap-2' variant="p">
            <MdHomeWork />
            {application.jobType}
          </Typography>
        </div>
        {mouseIsOver && <button onClick={() => deleteApplication(application.id!)} className='absolute bottom-4 right-3.5 opacity-75 hover:opacity-100'>
          <FaTrashAlt size={16} />
        </button>}
      </ApplicationModal>
    </>
  )
}

export default ApplicationCard