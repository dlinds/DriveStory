import Config from 'react-native-config'
import RNFS from 'react-native-fs'
import { handleSaveFileToDevice } from './AppStorageUtils'
import { Configuration, OpenAIApi } from 'openai'
import { Store } from './AppStateMutate'

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
      ssml: input,
    },
    voice: {
      languageCode: 'en-GB',
      name: 'en-GB-Wavenet-A',
    },
    audioConfig: {
      audioEncoding: 'MP3',
      sampleRateHertz: 24000,
      effectsProfileId: ['small-bluetooth-speaker-class-device'],
      pitch: 0,
      speakingRate: 0.95,
    },
  })

  const requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow',
  }

  fetch(
    `https://texttospeech.googleapis.com/v1beta1/text:synthesize?key=${key}`,
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
  readonly store?: Store
}

const configuration = new Configuration({
  organization: Config.CHAT_GPT_ORG,
  apiKey: Config.CHAT_GPT_KEY,
})

const openAiConfig = new OpenAIApi(configuration)

export const queryOpenAi = async ({
  prompt,
  max_tokens = 2500,
  temperature = 1,
  model = 'gpt-3.5-turbo',
  store,
}: queryOpenAiProps) => {
  const submittedPrompt = store?.customText
    ? `${store?.customText} ${prompt}`
    : prompt

  try {
    const resp = await openAiConfig.createChatCompletion({
      model,
      messages: [
        {
          role: 'user',
          content: submittedPrompt,
        },
      ],
      max_tokens,
      temperature,
    })
    console.log('ChatGPT Response Successful')
    return resp
  } catch (e) {
    console.error({ queryOpenAi: e })
    throw e
  }
}
