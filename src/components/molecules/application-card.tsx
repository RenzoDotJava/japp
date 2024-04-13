import React from 'react'
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

import { Typography } from '../ui/typography';
import { Application } from '../../types';

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
    return <div
      ref={setNodeRef}
      style={style}
      className="bg-white shadow-sm p-2 rounded-md min-h-[45px] opacity-85"
    />
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="bg-white shadow-sm p-2 min-h-[45px] flex rounded-md cursor-pointer"
      onClick={() => console.log(application)}
    >
      <Typography variant="p">{application.content}</Typography>
    </div>
  )
}

export default ApplicationCard