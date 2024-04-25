import React from 'react'
import { IoMdAdd } from 'react-icons/io'
import { useMutation } from '@tanstack/react-query'

import ApplicationModal from './application-modal'
import { useToggle } from '@/hooks/useToogle'
import { useApplicationStore } from '@/store/application'
import { Application } from '@/types'

const AddAplicationModal = () => {
  const { addApplication } = useApplicationStore()
  const { isOpen, toggle, setIsOpen } = useToggle()

  const { mutate, isPending } = useMutation({
    mutationKey: ['add_application'],
    mutationFn: async (application: Application) => {
      const data = await fetch('/api/application', {
        method: 'POST',
        body: JSON.stringify(application)
      })

      return data.json()
    },
    onSuccess: (application) => {
      addApplication(application)
      toggle()
    }
  })

  return (
    <ApplicationModal
      className='bg-primary text-primary-foreground hover:bg-primary/90 min-h-9 rounded-md px-3 flex items-center gap-2 cursor-pointer'
      title="Agregar postulación de trabajo"
      isOpen={isOpen}
      isLoading={isPending}
      setIsOpen={setIsOpen}
      onClose={(application) => mutate(application)}
    >
      Agregar
      <IoMdAdd className="min-h-4 min-w-4" />
    </ApplicationModal>
  )
}

export default AddAplicationModal