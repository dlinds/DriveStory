import { Store } from './AppStateMutate'
import RNFS from 'react-native-fs'

export interface StoryCollection {
  readonly id: string
  readonly title: string
  readonly itemIds: string[]
}

export interface SavedStory {
  readonly storyId: string
  readonly title: string
  readonly audioFilePaths: AudioFile[]
}

export interface AudioFile {
  readonly fileId: string
  readonly filePath: string
  readonly storyIndex: number
}

export const handleSaveStoreToFS = (store: Store) => {
  const path = RNFS.DocumentDirectoryPath + '/store.txt'
  RNFS.writeFile(path, JSON.stringify(store), 'utf8')
    .then((success) => {
      // console.log('FILE WRITTEN!')
    })
    .catch((err) => {
      console.log(err.message)
    })
}

export const handleGetStoreFromState = async (): Promise<Store> => {
  const store = await RNFS.readFile(
    RNFS.DocumentDirectoryPath + '/store.txt'
  ).then((result: string) => {
    return Promise.resolve(result)
  })
  return JSON.parse(store)
}
