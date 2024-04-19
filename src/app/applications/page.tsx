"use client"
import { useState } from "react"
import { createPortal } from "react-dom";
import { DndContext, DragStartEvent, DragOverlay, useSensors, PointerSensor, useSensor, DragOverEvent } from "@dnd-kit/core"
import { arrayMove, SortableContext } from "@dnd-kit/sortable"
import { IoMdAdd } from "react-icons/io";

import { Typography } from "@/components/ui/typography"
import SectionContainer from "@/components/organisms/section-container";
import ApplicationCard from "@/components/molecules/application-card";
import { generateId } from "@/lib/utils";
import ApplicationModal from "@/components/organisms/application-modal";
import { sections } from "@/lib/consts";
import { Application, Id, Section } from "@/types"

// const sections: Section[] = [
//   {
//     id: 1,
//     title: 'Postulado'
//   },
//   {
//     id: 2,
//     title: 'En entrevista'
//   },
//   {
//     id: 3,
//     title: 'En negociación'
//   },
//   {
//     id: 4,
//     title: 'Aceptado'
//   },
//   {
//     id: 5,
//     title: 'Sin respuesta'
//   },
//   {
//     id: 6,
//     title: 'Rechazado'

//   }
// ]

export default function ApplicationsPage() {
  const [applications, setApplications] = useState<Application[]>([])
  const [activeApplication, setActiveApplication] = useState<Application | null>(null)
  const [activeSection, setActiveSection] = useState<Section | null>(null)

  const sectionsIds = sections.map(section => section.id)

  const sensors = useSensors(useSensor(PointerSensor, {
    activationConstraint: {
      distance: 3,
    }
  }))

  const addApplication = (sectionId: Id = 1) => {
    const newApplication: Application = {
      id: generateId(),
      sectionId,
      content: `Postulación ${applications.length + 1}`
    }

    setApplications([...applications, newApplication])
  }

  const onDragStart = (event: DragStartEvent) => {
    if (event.active.data.current?.type == "Section") {
      setActiveSection(event.active.data.current.section)
      return
    }
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
      setApplications((applications) => {
        const activeIndex = applications.findIndex(application => application.id === activeId);
        const overIndex = applications.findIndex(application => application.id === overId);

        applications[activeIndex].sectionId = applications[overIndex].sectionId;

        return arrayMove(applications, activeIndex, overIndex);
      });
    }

    const isOverSection = over.data.current?.type === "Section";

    if (isActiveApplication && isOverSection) {
      setApplications((applications) => {
        const activeIndex = applications.findIndex(application => application.id === activeId);

        applications[activeIndex].sectionId = overId;

        return arrayMove(applications, activeIndex, activeIndex);
      });
    }
  }

  return (
    <div className="flex flex-col h-full">
      <div className="flex justify-between">
        <Typography variant="h2">Tus postulaciones</Typography>
        <ApplicationModal
          className='bg-primary text-primary-foreground hover:bg-primary/90 min-h-9 rounded-md px-3 flex items-center gap-2 cursor-pointer'
          onClose={() => addApplication()}
        >
          Agregar
          <IoMdAdd className="min-h-4 min-w-4" />
        </ApplicationModal> 
        
      </div>
      <DndContext sensors={sensors} onDragStart={onDragStart} onDragEnd={onDragEnd} onDragOver={onDragOver}>
        <div className="flex h-[calc(100%-50px)] gap-3 overflow-y-hidden mt-8 justify-between pb-1">
          <SortableContext items={sectionsIds}>
            {sections.map((section) => (
              <SectionContainer
                key={section.id}
                section={section}
                applications={applications.filter(application => application.sectionId === section.id)}
                addApplication={addApplication}
              />
            ))}
          </SortableContext>
        </div>
        {createPortal(
          <DragOverlay>
            {activeSection && (
              <SectionContainer
                section={activeSection}
                applications={applications.filter(application => application.sectionId === activeSection.id)}
                addApplication={addApplication}
              />
            )}
            {activeApplication && (
              <ApplicationCard application={activeApplication} />
            )}
          </DragOverlay>,
          document.body)}
      </DndContext>
    </div>
  )
}

//https://www.youtube.com/watch?v=RG-3R6Pu_Ik&t=2107s&ab_channel=CodewithKliton