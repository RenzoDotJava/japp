import React, { useState } from 'react'
import { DraggableAttributes } from '@dnd-kit/core';
import { SyntheticListenerMap } from '@dnd-kit/core/dist/hooks/utilities';

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog'
import AplicationForm from '../molecules/application-form';
import { Application } from '../../types';

interface ApplicationModalProps {
  children: React.ReactNode;
  className?: string;
  title?: string;
  style?: Object;
  attributes?: DraggableAttributes;
  listeners?: SyntheticListenerMap;
  application?: Application;
  onClose?: (application: Application) => void;
}

const ApplicationModal = React.forwardRef<HTMLButtonElement, ApplicationModalProps>(
  ({ children, title = '', className, style, attributes, listeners, application, onClose }, ref) => {
    const [open, setOpen] = useState(false)

    const handleSubmit = (application: Application) => {
      onClose && onClose(application)
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
            <DialogTitle>{title}</DialogTitle>
          </DialogHeader>
          <AplicationForm application={application} handleSubmit={handleSubmit} />
        </DialogContent>
      </Dialog>
    )
  }
)

ApplicationModal.displayName = "ApplicationModal"

export default ApplicationModal