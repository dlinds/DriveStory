import { SavedStory, StoryCollection } from './AppStorageUtils'
import { CustomizeOption } from './src/ui/Home/molecules/customize_story_popup'

export type Screens = 'start' | 'home' | 'saved'

const defaultStories: SavedStory[] = [
  {
    storyId: 'ah8a7',
    title: 'Goblins, ghouls, and mermaids and more',
    audioFilePaths: [
      {
        fileId: '9j78ho7',
        filePath: 'file://',
        storyIndex: 1,
      },
      {
        fileId: '8h77hi8',
        filePath: 'file://',
        storyIndex: 2,
      },
      {
        fileId: '2524fyda',
        filePath: 'file://',
        storyIndex: 3,
      },
    ],
  },
  {
    storyId: 'fj348',
    title: 'Giant trees and a chicken',
    audioFilePaths: [
      {
        fileId: '83offsr',
        filePath: 'file://',
        storyIndex: 1,
      },
    ],
  },
]

const aCollection: StoryCollection = {
  id: '7h63i7a3i',
  title: 'all',
  itemIds: defaultStories.map((i) => i.storyId),
}

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
  savedStories: defaultStories,
  collections: [aCollection],
}

export interface Store {
  readonly customizeOptions: CustomizeOption[]
  readonly selectedCustomizedOptions?: CustomizeOption[]
  readonly customText?: string
  readonly currentScreen: Screens
  readonly savedStories?: SavedStory[]
  readonly collections?: StoryCollection[]
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
