import Config from 'react-native-config'
import RNFS from 'react-native-fs'
import Sound from 'react-native-sound'
import { handleSaveFileToDevice } from './AppStorageUtils'
import { Configuration, OpenAIApi } from 'openai'
import Voice from '@react-native-voice/voice'
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

const models = {
  davinci3: 'gpt-3.5-turbo',
}

const configuration = new Configuration({
  organization: Config.CHAT_GPT_ORG,
  apiKey: Config.CHAT_GPT_KEY,
})

const openAiConfig = new OpenAIApi(configuration)

interface ExpectedJSONResponse {
  readonly title: string
  readonly characters: { readonly name: string }[]
  readonly story: TwoCharacterResponse[]
}

const formatJSONToSSML = (json: string): string => {
  const parsedJSON: ExpectedJSONResponse = JSON.parse(json)

  const { characters, story } = parsedJSON

  const characterNames = characters.map((character) => character.name)

  const storyText = story.map((story) => {
    const { voice, text } = story
    return `<speak><voice name="${voice}">${text}</voice></speak>`
  })

  const storyTextString = storyText.join(' ')

  return `<speak><p>${characterNames.join(' ')} ${storyTextString}</p></speak>`
}

const constructPrompt = (store: Store | undefined, prompt: string): string => {
  if (!store)
    return `Tell me a children's story that includes the topic: ${prompt}`
  const storeText =
    store.selectedCustomizedOptions && store.selectedCustomizedOptions[0].label

  console.log({ storeText })

  console.log({ store, selected: store.selectedCustomizedOptions })

  if (storeText) {
    switch (storeText) {
      case 'Two Characters':
        return `Tell me a JSON children's story about ${prompt} with narrator, two characters, 'voice' field (speaker) and 'text' field (dialogue)`
      case 'Chapters':
        return `Tell me a childrens story about ${prompt} that takes 10 replies to tell`
      default:
        return `Tell me a children's story that includes the topics: ${prompt}`
    }
  }
  return `Tell me a children's story that includes the topics: ${prompt}`
}

interface TwoCharacterResponse {
  readonly voice: string
  readonly text: string
}

export const queryOpenAi = async ({
  prompt,
  max_tokens = 2500,
  temperature = 1,
  model = models.davinci3,
  store,
}: queryOpenAiProps) => {
  const generatedPrompt = constructPrompt(store, prompt)
  console.log({ generatedPrompt })
  try {
    const resp = await openAiConfig.createChatCompletion({
      model,
      messages: [
        {
          role: 'user',
          content: generatedPrompt,
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
