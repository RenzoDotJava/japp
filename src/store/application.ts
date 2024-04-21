import { create } from 'zustand'
import { Application } from '@/types'
import { generateId } from '@/lib/utils'

export type ApplicationState = {
  applications: Application[]
}

export type ApplicationActions = {
  addApplication: (application: Application) => void
  setApplications: (applications: Application[]) => void
  updateApplication: (application: Application) => void
}

export const useApplicationStore = create<ApplicationState & ApplicationActions>((set) => ({
  applications: [],
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
  }))
}))