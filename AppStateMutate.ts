import {
  AudioFile,
  handleSaveStoreToFS,
  SavedStory,
  StoryCollection,
} from './AppStorageUtils'
import { CustomizeOption } from './src/ui/modules/Home/molecules/customize_story_popup'
import 'react-native-get-random-values'
import { v4 as uuidv4 } from 'uuid'

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
}

export interface Store {
  readonly customizeOptions: CustomizeOption[]
  readonly selectedCustomizedOptions?: CustomizeOption[]
  readonly customText?: string
  readonly currentScreen: Screens
  readonly savedStories?: SavedStory[]
  readonly collections?: StoryCollection[]
  readonly currentSoundPath?: string
  readonly isTrackPlayerReady?: boolean
}

export interface StateMutate {
  readonly store: Store
  readonly setStore: (store: Store) => void
}

export const setInitialStore = (
  store: Store,
  setStore: (store: Store) => void
) => {
  console.log('setInitialStore')
  setStore({ ...store })
}

export const setSelectedCustomized = (
  store: Store,
  setStore: (store: Store) => void,
  options: CustomizeOption[]
) => {
  console.log('setSelectedCustomized')

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
  console.log('setCustomizedText')
  const updatedStore = { ...store, customText }
  setStore({ ...updatedStore })
  handleSaveStoreToFS(updatedStore)
}

export const addStoryToStore = (
  store: Store,
  setStore: (store: Store) => void,
  title: string,
  filePaths: string[]
): string => {
  console.log('addStoryToStore: ' + title)
  const audioFileId = uuidv4()
  const audioFilePaths: AudioFile[] = filePaths.map((path, index) => ({
    fileId: audioFileId,
    filePath: path,
    storyIndex: index,
  }))

  const storyId = uuidv4()
  const storyObject: SavedStory = {
    storyId: storyId,
    title,
    audioFilePaths,
  }
  const updatedStories =
    store.savedStories && store.savedStories?.length > 0
      ? [...store.savedStories, storyObject]
      : [storyObject]
  const updatedStore = { ...store, savedStories: [...updatedStories] }
  handleSaveStoreToFS(updatedStore)
  setStore({ ...updatedStore })
  return storyId
}

export const removeStoryFromStore = (
  store: Store,
  setStore: (store: Store) => void,
  story: SavedStory
) => {
  console.log('removeStoryFromStore')

  const newSavedItems = store.savedStories?.filter((i) => i !== story)
  const removedFromCollectionsStore = removeStoryFromAllCollections(
    store,
    story
  )
  const updatedStore: Store = {
    ...store,
    savedStories: newSavedItems,
    collections: removedFromCollectionsStore,
  }
  setStore({ ...updatedStore })
  handleSaveStoreToFS(updatedStore)
}

const removeStoryFromAllCollections = (
  store: Store,
  story: SavedStory
): StoryCollection[] => {
  console.log('removeStoryFromAllCollections')
  const updatedCollections = store.collections?.map((c) => {
    const updatedCollection = c.stories.filter(
      (s) => s.storyId !== story.storyId
    )
    return { ...c, stories: updatedCollection }
  })
  return [...(updatedCollections || [])]
}

export const removeCollectionFromStore = (
  store: Store,
  setStore: (store: Store) => void,
  collection: StoryCollection
) => {
  console.log('removeCollectionFromStore')
  const newSavedCollections = store.collections?.filter((i) => i !== collection)
  const updatedStore: Store = { ...store, collections: newSavedCollections }
  setStore({ ...updatedStore })
  handleSaveStoreToFS(updatedStore)
}

export const addNewCollectionToStore = (
  store: Store,
  setStore: (store: Store) => void,
  collectionTitle: string,
  file: SavedStory
) => {
  console.log('addNewCollectionToStore')
  const newCollection: StoryCollection = {
    id: uuidv4(),
    title: collectionTitle,
    stories: [file],
  }

  const updatedCollections = store.collections
    ? [...store.collections, newCollection]
    : [newCollection]

  const updatedStore = { ...store, collections: updatedCollections }
  setStore(updatedStore)
  handleSaveStoreToFS(updatedStore)
}

export const addStoryToCollection = (
  store: Store,
  setStore: (store: Store) => void,
  collection: StoryCollection,
  file: SavedStory
) => {
  console.log('addStoryToCollection')
  const updatedCollections = store.collections?.map<StoryCollection>((c) =>
    c.id === collection.id
      ? { ...collection, stories: [...collection.stories, file] }
      : { ...c }
  )
  const updatedStore = { ...store, collections: updatedCollections }
  setStore(updatedStore)
  handleSaveStoreToFS(updatedStore)
}

export const removeStoryToCollection = (
  store: Store,
  setStore: (store: Store) => void,
  collection: StoryCollection,
  file: SavedStory
) => {
  console.log('removeStoryToCollection')

  const updatedCollections = store.collections?.map<StoryCollection>((c) =>
    c.id === collection.id
      ? {
          ...collection,
          stories: [
            ...collection.stories.filter((s) => s.storyId !== file.storyId),
          ],
        }
      : { ...c }
  )
  const updatedStore = { ...store, collections: updatedCollections }
  setStore(updatedStore)
  handleSaveStoreToFS(updatedStore)
}

export const handleNavigate = (
  store: Store,
  setStore: (store: Store) => void,
  screen: Screens
) => {
  console.log('handleNavigate')
  const updatedStore = { ...store, currentScreen: screen }
  setStore({ ...updatedStore })
}
