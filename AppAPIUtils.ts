import Config from 'react-native-config'
import RNFS from 'react-native-fs'
import Sound from 'react-native-sound'
import { handleSaveFileToDevice } from './AppStorageUtils'

export const handleGenerateAndSaveStory = async (
  story: string
): Promise<string> => await handleTextToSpeech(story).then((res) => res)

const handleTextToSpeech = async (input: string): Promise<string> => {
  const key = Config.GOOGLE_API
  const path = `${RNFS.DocumentDirectoryPath}/${Date.now()}.mp3`
  const myHeaders = new Headers()
  myHeaders.append('Content-Type', 'application/json')

  const raw = JSON.stringify({
    input: {
      text: input,
    },
    voice: {
      languageCode: 'en-gb',
      name: 'en-GB-Neural2-F',
      ssmlGender: 'FEMALE',
    },
    audioConfig: {
      audioEncoding: 'MP3',
    },
  })

  const requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow',
  }

  fetch(
    `https://texttospeech.googleapis.com/v1/text:synthesize?key=${key}`,
    requestOptions
  )
    .then(async (response) => await response.text())
    .then(async (result) => {
      await handleSaveFileToDevice(path, result)
    })
    .catch((error) => console.log('error', error))

  return path
}

export const playStory = (path: string) => {
  const speech = new Sound(path, '', (error) => {
    if (error) {
      console.warn('failed to load the sound', error)

      return null
    }
    speech.play((success) => {
      if (!success) {
        console.warn('playback failed due to audio decoding errors')
      }
    })

    return null
  })
}
