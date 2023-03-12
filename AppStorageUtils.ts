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

export const handleSaveStoreToFS = async (store: Store) => {
  const path = RNFS.DocumentDirectoryPath + '/store.txt'
  await RNFS.writeFile(path, JSON.stringify(store), 'utf8')
    .then((success) => {
      // console.log('FILE WRITTEN!')
    })
    .catch((err) => {
      console.log(err.message)
    })
}

export const handleGetStoreFromState = async (): Promise<Store> => {
  const store: string = await RNFS.readFile(
    RNFS.DocumentDirectoryPath + '/store.txt'
  )
    .then((result: string) => {
      return Promise.resolve(result)
    })
    .catch((e) => e)
  return JSON.parse(store)
}

export const handleSaveFileToDevice = async (path: string, data: string) => {
  try {
    return await RNFS.writeFile(path, data, 'base64')
  } catch (err) {
    console.warn(err)
  }
  return null
}
