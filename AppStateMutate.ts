import { CustomizeOption } from './src/ui/Home/molecules/customize_story_popup'

type Screens = 'start' | 'home'

export const initialState: Store = {
  customizeOptions: [
    {
      label: 'Two Characters',
    },
    {
      label: 'Chapters',
    },
    {
      label: 'Use me as the main character',
    },
    {
      label: 'Customize prompt',
      customAnswer: true,
    },
  ],
  currentScreen: 'start',
}

export interface Store {
  readonly customizeOptions: CustomizeOption[]
  readonly selectedCustomizedOptions?: CustomizeOption[]
  readonly customText?: string
  readonly currentScreen: Screens
}

export interface StateMutate {
  readonly store: Store
  readonly setStore: (store: Store) => void
}

export const setInitialStore = (
  store: Store,
  setStore: (store: Store) => void
) => {
  setStore({ ...store })
}

export const setSelectedCustomized = (
  store: Store,
  setStore: (store: Store) => void,
  options: CustomizeOption[]
) => {
  const customText =
    options.filter((i) => i.customAnswer === true).length >= 1
      ? store.customText
      : ''
  setStore({ ...store, selectedCustomizedOptions: options, customText })
}

export const setCustomizedText = (
  store: Store,
  setStore: (store: Store) => void,
  customText: string
) => {
  setStore({ ...store, customText })
}

export const handleNavigate = (
  store: Store,
  setStore: (store: Store) => void,
  screen: Screens
) => {
  setStore({ ...store, currentScreen: screen })
}
