import RNFS from 'react-native-fs'
import Config from 'react-native-config'
import { Configuration, OpenAIApi } from 'openai'

interface queryOpenAiProps {
  readonly prompt: string
  readonly max_tokens?: number
  readonly temperature?: any
  readonly model?: string
}

export const models = {
  davinci3: 'text-davinci-003',
}

const configuration = new Configuration({
  organization: Config.CHAT_GPT_ORG,
  apiKey: Config.CHAT_GPT_KEY,
})

export const openAiConfig = new OpenAIApi(configuration)

export const createFile = async (path: string, data: string) => {
  try {
    return await RNFS.writeFile(path, data, 'base64')
  } catch (err) {
    console.warn(err)
  }

  return null
}

export const handleTextToSpeech = async (input: string): Promise<string> => {
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
      name: 'en-GB-Standard-G',
      ssmlGender: 'MALE',
    },
    audioConfig: {
      audioEncoding: 'MP3_64_KBPS',
      effectsProfileId: ['small-bluetooth-speaker-class-device'],
      pitch: 0,
      speakingRate: 1.07,
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
    .then((response) => response.text())
    .then(async (result) => {
      await createFile(path, result)
    })
    .catch((error) => console.log('error', error))

  return path
}

export const queryOpenAi = async ({
  prompt,
  max_tokens = 500,
  temperature = undefined,
  model = models.davinci3,
}: queryOpenAiProps) => {
  try {
    const resp = await openAiConfig.createCompletion({
      model,
      prompt: `Tell me a five sentence childrens story that includes the topics: ${prompt}`,
      max_tokens,
      temperature,
    })

    return resp
  } catch (e) {
    console.error({ queryOpenAi: e })
    throw e
  }
}
