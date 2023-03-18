import Config from 'react-native-config'
import RNFS from 'react-native-fs'
import Sound from 'react-native-sound'
import { handleSaveFileToDevice } from './AppStorageUtils'
import { Configuration, OpenAIApi } from 'openai'
import Voice from '@react-native-voice/voice'

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
      languageCode: 'en-GB',
      name: 'en-GB-News-J',
    },
    audioConfig: {
      audioEncoding: 'MP3',
      effectsProfileId: ['small-bluetooth-speaker-class-device'],
      pitch: 0,
      speakingRate: 1,
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

interface queryOpenAiProps {
  readonly prompt: string
  readonly max_tokens?: number
  readonly temperature?: any
  readonly model?: string
}

const models = {
  davinci3: 'text-davinci-003',
}

const configuration = new Configuration({
  organization: Config.CHAT_GPT_ORG,
  apiKey: Config.CHAT_GPT_KEY,
})

const openAiConfig = new OpenAIApi(configuration)

// JSON children's story about goblins with narrator, two characters, 'voice' field (speaker), and 'text' field (dialogue).

export const queryOpenAi = async ({
  prompt,
  max_tokens = 500,
  temperature = undefined,
  model = models.davinci3,
}: queryOpenAiProps) => {
  try {
    const resp = await openAiConfig.createCompletion({
      model,
      prompt: `Tell me a childrens story that includes the topics: ${prompt}`,
      max_tokens,
      temperature,
    })

    return resp
  } catch (e) {
    console.error({ queryOpenAi: e })
    throw e
  }
}
