import React, { Dispatch, SetStateAction } from 'react'
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
  isOpen: boolean;
  isLoading?: boolean;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  onClose: (application: Application) => void;
}

const ApplicationModal = React.forwardRef<HTMLButtonElement, ApplicationModalProps>(
  ({ children, title = '', className, style, attributes, listeners, application, isOpen, isLoading, setIsOpen, onClose, onMouseEnter, onMouseLeave }, ref) => {

    const handleSubmit = (application: Application) => onClose(application)

    return (
      <Dialog open={isOpen} onOpenChange={(isOpen) => setIsOpen(isOpen)}>
        <DialogTrigger
          className={className}
          ref={ref}
          style={style}
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
          {...attributes}
          {...listeners}
        >
          {children}
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{title}</DialogTitle>
          </DialogHeader>
          <AplicationForm application={application} handleSubmit={handleSubmit} isLoading={isLoading} />
        </DialogContent>
      </Dialog>
    )
  }
)

ApplicationModal.displayName = "ApplicationModal"

export default ApplicationModal