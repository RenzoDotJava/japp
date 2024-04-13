import React, { useState } from 'react'
import { DraggableAttributes } from '@dnd-kit/core';
import { SyntheticListenerMap } from '@dnd-kit/core/dist/hooks/utilities';

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog'
import AplicationForm from '../molecules/application-form';

interface ApplicationModalProps {
  children: React.ReactNode;
  className?: string;
  style?: Object;
  attributes?: DraggableAttributes;
  listeners?: SyntheticListenerMap;
}

const ApplicationModal = React.forwardRef<HTMLButtonElement, ApplicationModalProps>(
  ({ children, className, style, attributes, listeners }, ref) => {
    const [open, setOpen] = useState(false)

    const handleSubmit = () => {
      setOpen(false)
    }

    return (
      <Dialog open={open} onOpenChange={(open) => setOpen(open)}>
        <DialogTrigger
          className={className}
          ref={ref}
          style={style}
          {...attributes}
          {...listeners}
        >
          {children}
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Agregar postulación de trabajo</DialogTitle>
          </DialogHeader>
          <AplicationForm handleSubmit={handleSubmit} />
        </DialogContent>
      </Dialog>
    )
  }
)

ApplicationModal.displayName = "ApplicationModal"

export default ApplicationModal