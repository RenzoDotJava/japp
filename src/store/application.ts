import { create } from 'zustand'
import { Application, Id } from '@/types'
import { generateId } from '@/lib/utils'

export type ApplicationState = {
  applications: Application[]
}

export type ApplicationActions = {
  addApplication: (application: Application) => void
  setApplications: (applications: Application[]) => void
  updateApplication: (application: Application) => void
  deleteApplication: (id: Id) => void
}

export const useApplicationStore = create<ApplicationState & ApplicationActions>((set) => ({
  applications: [{ id: 1, jobPosition: '123123123', company: '123123123', jobType: 'Presencial', column: '1', salary: '', url: '' }],
  addApplication: (application: Application) => set((state) => ({
    applications: [
      ...state.applications,
      { ...application, id: generateId() }
    ]
  })),
  updateApplication: (application: Application) => set((state) => ({
    applications: state.applications.map((a) => a.id === application.id ? application : a)
  })),
  setApplications: (applications: Application[]) => set(() => ({
    applications: [...applications]
  })),
  deleteApplication: (id: Id) => set((state) => ({
    applications: state.applications.filter((a) => a.id !== id)
  }))
}))