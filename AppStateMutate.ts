import { CustomizeOption } from './src/ui/Home/molecules/customize_story_popup'

export const initialState: Store = {
  customizeOptions: [
    {
      label: 'Two Characters',
      isSelected: false,
    },
    {
      label: 'Chapters',
      isSelected: false,
    },
    {
      label: 'Use me as the main character',
      isSelected: false,
    },
    {
      label: 'Customize prompt',
      isSelected: false,
      customAnswer: true,
    },
  ],
}

export interface Store {
  readonly customizeOptions: CustomizeOption[]
  readonly selectedCustomizedOptions?: CustomizeOption[]
  readonly customText?: string
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
  setStore({ ...store, selectedCustomizedOptions: options })
}

export const setCustomizedText = (
  store: Store,
  setStore: (store: Store) => void,
  customText: string
) => {
  console.log({ customText })
  setStore({ ...store, customText })
}
