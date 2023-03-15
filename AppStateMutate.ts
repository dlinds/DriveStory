import {
  AudioFile,
  handleSaveStoreToFS,
  SavedStory,
  StoryCollection,
} from './AppStorageUtils'
import { CustomizeOption } from './src/ui/Home/molecules/customize_story_popup'
import 'react-native-get-random-values'
import { v4 as uuidv4 } from 'uuid'
import Sound from 'react-native-sound'
Sound.setCategory('Playback')

export type Screens = 'start' | 'home' | 'saved'

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
  currentSoundPlayer: undefined,
}

export interface Store {
  readonly customizeOptions: CustomizeOption[]
  readonly selectedCustomizedOptions?: CustomizeOption[]
  readonly customText?: string
  readonly currentScreen: Screens
  readonly savedStories?: SavedStory[]
  readonly collections?: StoryCollection[]
  readonly currentSoundPath?: string
  readonly currentSoundPlayer?: Sound
}

export interface StateMutate {
  readonly store: Store
  readonly setStore: (store: Store) => void
}

export const setCurrentSound = (
  store: Store,
  setStore: (store: Store) => void,
  mp3Path: string | undefined
) => {
  if (store.currentSoundPlayer) {
    store.currentSoundPlayer.stop()
  }
  const updatedStore: Store = {
    ...store,
    currentSoundPath: mp3Path,
    currentSoundPlayer: mp3Path
      ? new Sound(mp3Path, Sound.MAIN_BUNDLE, () => {})
      : undefined,
  }

  setStore({ ...updatedStore })
  handleSaveStoreToFS(updatedStore)
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
  const updatedStore = {
    ...store,
    selectedCustomizedOptions: options,
    customText,
  }
  setStore({ ...updatedStore })
  handleSaveStoreToFS(updatedStore)
}

export const setCustomizedText = (
  store: Store,
  setStore: (store: Store) => void,
  customText: string
) => {
  const updatedStore = { ...store, customText }
  setStore({ ...updatedStore })
  handleSaveStoreToFS(updatedStore)
}

export const addStoryToStore = async (
  store: Store,
  setStore: (store: Store) => void,
  title: string,
  filePaths: string[]
) => {
  const audioFilePaths: AudioFile[] = filePaths.map((path, index) => ({
    fileId: uuidv4(),
    filePath: path,
    storyIndex: index,
  }))
  const storyObject: SavedStory = {
    storyId: uuidv4(),
    title,
    audioFilePaths,
  }

  const updatedStories = store.savedStories
    ? [...store.savedStories, storyObject]
    : [storyObject]
  const updatedStore = { ...store, savedStories: [...updatedStories] }
  setStore(updatedStore)
  await handleSaveStoreToFS(updatedStore)
}

export const removeStoryFromStore = (
  store: Store,
  setStore: (store: Store) => void,
  story: SavedStory
) => {
  const newSavedItems = store.savedStories?.filter((i) => i !== story)
  const removedFromCollectionsStore = removeStoryFromCollection(store, story)
  const updatedStore: Store = {
    ...removedFromCollectionsStore,
    savedStories: newSavedItems,
  }
  setStore({ ...updatedStore })
  handleSaveStoreToFS(updatedStore)
}

const removeStoryFromCollection = (store: Store, story: SavedStory): Store => {
  const updatedCollections = store.collections?.filter(
    (i) => !i.itemIds.includes(story.storyId)
  )
  return { ...store, collections: updatedCollections }
}

export const removeCollectionFromStore = (
  store: Store,
  setStore: (store: Store) => void,
  collection: StoryCollection
) => {
  const newSavedCollections = store.collections?.filter((i) => i !== collection)
  const updatedStore: Store = { ...store, collections: newSavedCollections }
  setStore({ ...updatedStore })
  handleSaveStoreToFS(updatedStore)
}

export const handleNavigate = (
  store: Store,
  setStore: (store: Store) => void,
  screen: Screens
) => {
  const updatedStore = { ...store, currentScreen: screen }
  setStore({ ...updatedStore })
  handleSaveStoreToFS(updatedStore)
}
