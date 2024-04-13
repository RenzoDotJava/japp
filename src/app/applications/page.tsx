"use client"
import { useState } from "react"
import { createPortal } from "react-dom";
import { DndContext, DragStartEvent, DragOverlay, DragEndEvent, useSensors, PointerSensor, useSensor, DragOverEvent } from "@dnd-kit/core"
import { arrayMove, SortableContext } from "@dnd-kit/sortable"

import { Typography } from "@/components/ui/typography"
import SectionContainer from "@/components/organisms/section-container";
import ApplicationCard from "@/components/molecules/application-card";
import { generateId } from "@/lib/utils";
import { Application, Id, Section } from "@/types"

const sections: Section[] = [
  {
    id: 1,
    title: 'Postulado'
  },
  {
    id: 2,
    title: 'En entrevista'
  },
  {
    id: 3,
    title: 'En negociación'
  },
  {
    id: 4,
    title: 'Aceptado'
  },
  {
    id: 5,
    title: 'Sin respuesta'
  },
  {
    id: 6,
    title: 'Rechazado'

  }
]

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

  const addApplication = (sectionId: Id) => {
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

    if (isActiveApplication && !isOverApplication) {
      setApplications((applications) => {
        const activeIndex = applications.findIndex(application => application.id === activeId);

        applications[activeIndex].sectionId = overId;

        return arrayMove(applications, activeIndex, activeIndex);
      });
    }
  }

  return (
    <div className="flex flex-col h-full">
      <Typography variant="h2">Tus postulaciones</Typography>
      <DndContext sensors={sensors} onDragStart={onDragStart} onDragOver={onDragOver}>
        <div className="flex h-[calc(100%-50px)] gap-4 overflow-x-auto overflow-y-hidden mt-8 justify-between pb-1">
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