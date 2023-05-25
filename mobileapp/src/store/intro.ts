import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'
import { zustandStorage } from '../storage/zustand'

export enum IntroStage {
  NOT_STARTED = 'not_started',
  AUCTIONS = 'auctions',
  WIDGETS = 'widgets',
  ADD_DAOS = 'add_daos',
  DONE = 'done'
}

interface IntroState {
  stage: IntroStage
  setState: (stage: IntroStage) => void
}

export const useIntroStore = create<IntroState>()(
  persist(
    (set, get) => ({
      stage: IntroStage.NOT_STARTED,
      setState: (stage: IntroStage) => set({ stage: stage })
    }),
    {
      name: 'intro',
      storage: createJSONStorage(() => zustandStorage)
    }
  )
)
