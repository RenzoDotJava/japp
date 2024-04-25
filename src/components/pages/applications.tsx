"use client"
import { useState } from "react"
import { createPortal } from "react-dom";
import { DndContext, DragStartEvent, DragOverlay, useSensors, PointerSensor, useSensor, DragOverEvent } from "@dnd-kit/core"
import { arrayMove, SortableContext } from "@dnd-kit/sortable"
import { useMutation, useQuery } from "@tanstack/react-query";

import { Typography } from "@/components/ui/typography"
import SectionContainer from "@/components/organisms/section-container";
import ApplicationCard from "@/components/molecules/application-card";
import { sections } from "@/lib/consts";
import { Application } from "@/types"
import { useApplicationStore } from "@/store/application";
import AddAplicationModal from "../organisms/add-application-modal";


const ApplicationsPage = () => {
  const [activeApplication, setActiveApplication] = useState<Application | null>(null)

  const { applications, setApplications, updateApplication } = useApplicationStore()

  const sectionsIds = sections.map(section => section.id)

  const { isLoading } = useQuery({
    queryKey: ['get_applications'],
    queryFn: async () => {
      const data = await fetch('/api/application')
      const applications = await data.json()

      setApplications(applications)

      return applications
    }
  })

  const { mutate } = useMutation({
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
    }
  })

  const sensors = useSensors(useSensor(PointerSensor, {
    activationConstraint: {
      distance: 5,
    }
  }))

  const onDragStart = (event: DragStartEvent) => {
    if (event.active.data.current?.type == "Application") {
      setActiveApplication(event.active.data.current.application)
      return
    }
  }

  const onDragEnd = () => setActiveApplication(null)

  const onDragOver = (event: DragOverEvent) => {
    const { active, over } = event;

    if (!over) return;

    const activeId = active.id;
    const overId = over.id;

    if (activeId === overId) return;

    const isActiveApplication = active.data.current?.type === "Application";
    const isOverApplication = over.data.current?.type === "Application";

    if (!isActiveApplication) return;

    if (isActiveApplication && isOverApplication) {

      let auxApplications = [...applications]

      const activeIndex = auxApplications.findIndex(application => application.id === activeId);
      const overIndex = auxApplications.findIndex(application => application.id === overId);

      auxApplications[activeIndex].column = auxApplications[overIndex].column;


      setApplications(arrayMove(auxApplications, activeIndex, overIndex))
    }

    const isOverSection = over.data.current?.type === "Section";

    if (isActiveApplication && isOverSection) {
      /* let auxApplications = [...applications] */

      const activeIndex = applications.findIndex(application => application.id === activeId);

      applications[activeIndex].column = overId;

      mutate(applications[activeIndex])

      /* setApplications(arrayMove(auxApplications, activeIndex, activeIndex)) */
    }
  }

  return (
    <div className="flex flex-col h-full">
      <div className="flex justify-between">
        <Typography className="text-2xl md:text-3xl" variant="h2">Tus postulaciones</Typography>
        <AddAplicationModal />
      </div>
      <DndContext sensors={sensors} onDragStart={onDragStart} onDragEnd={onDragEnd} onDragOver={onDragOver}>
        {!isLoading ?
          <div className="flex h-[calc(100%-50px)] gap-3 overflow-y-hidden mt-8 justify-between pb-1">
            <SortableContext items={sectionsIds}>
              {sections.map((section) => (
                <SectionContainer
                  key={section.id}
                  section={section}
                  applications={applications.filter(application => application.column === section.id)}
                />
              ))}
            </SortableContext>
          </div> :
          <Typography variant={'h3'} className="mt-8">Cargando...</Typography>
        }
        {createPortal(
          <DragOverlay>
            {activeApplication && (
              <ApplicationCard application={activeApplication} />
            )}
          </DragOverlay>,
          document.body)}
      </DndContext>
    </div>
  )
}

export default ApplicationsPage

//https://www.youtube.com/watch?v=RG-3R6Pu_Ik&t=2107s&ab_channel=CodewithKliton