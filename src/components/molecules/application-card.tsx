import React, { useState } from 'react'
import { MdWork, MdHomeWork } from "react-icons/md";
import { FaTrashAlt } from "react-icons/fa";
import { useMutation } from '@tanstack/react-query';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

import { Typography } from '../ui/typography';
import { Application, Id } from '../../types';
import ApplicationModal from '../organisms/application-modal';
import { useApplicationStore } from '@/store/application';
import { useToggle } from '@/hooks/useToogle';

interface ApplicationCardProps {
  application: Application
}

const ApplicationCard: React.FC<ApplicationCardProps> = ({ application }) => {
  const { isOpen, toggle, setIsOpen } = useToggle()
  const { isOpen: isMouseOver, setIsOpen: setIsMouseOver } = useToggle()
  const { setNodeRef, attributes, listeners, transform, transition, isDragging } = useSortable({
    id: application.id!,
    data: {
      type: "Application",
      application
    }
  })

  const { updateApplication, deleteApplication } = useApplicationStore()

  const { mutate, isPending } = useMutation({
    mutationKey: ['update_application'],
    mutationFn: async (application: Application) => {
      const data = await fetch(`/api/application/${application.id}`, {
        method: 'POST',
        body: JSON.stringify(application)
      })

      return data.json()
    },
    onSuccess: (application) => {
      updateApplication(application)
      toggle()
    }
  })

  const { mutate: mutateDelete } = useMutation({
    mutationKey: ['delete_application'],
    mutationFn: async (applicationId: Id) => {
      const data = await fetch(`/api/application/${applicationId}`, {
        method: 'DELETE'
      })

      return data.json()
    },
    onSuccess: (_, applicationId) => {
      deleteApplication(applicationId)
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
        className='w-full bg-white shadow-sm py-3 min-h-[95px] rounded-md cursor-pointer relative'
        ref={setNodeRef}
        style={style}
        attributes={attributes}
        listeners={listeners}
        application={application}
        isOpen={isOpen}
        title="Editar postulación de trabajo"
        isLoading={isPending}
        setIsOpen={setIsOpen}
        onMouseEnter={() => setIsMouseOver(true)}
        onMouseLeave={() => setIsMouseOver(false)}
        onClose={(application) => mutate(application)}
      >
        <div
          className='flex flex-col justify-center mx-4 gap-2 overflow-hidden'
        >
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
        {isMouseOver && <div onClick={(e) => { e.stopPropagation(); mutateDelete(application.id!) }} className='absolute bottom-4 right-3.5 opacity-65 hover:opacity-100'>
          <FaTrashAlt size={16} />
        </div>}
      </ApplicationModal>
    </>
  )
}

export default ApplicationCard