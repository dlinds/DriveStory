import Config from 'react-native-config'
import RNFS from 'react-native-fs'
import { handleSaveFileToDevice } from './AppStorageUtils'
import { Configuration, CreateChatCompletionResponse, OpenAIApi } from 'openai'
import { Store } from './AppStateMutate'
import { AxiosResponse } from 'axios'

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
  model = 'gpt-4',
  store,
}: queryOpenAiProps): Promise<string | undefined> => {
  const submittedPrompt = store?.customText
    ? `${store?.customText} ${prompt}`
    : prompt

  console.log('ChatGPT Request', { submittedPrompt })
  try {
    const resp = await openAiConfig.createChatCompletion({
      model,
      messages: [
        {
          role: 'user',
          content: `Tell me a children's story about ${submittedPrompt}. It should be exactly six paragraphs long, with short sentences in each paragraph. This is for an API app, and needs to returned as JSON, with the format { description: string, storyParagraphs: string[] }`,
        },
      ],
      max_tokens,
      temperature,
    })
    console.log('ChatGPT Response Successful')
    console.log(resp.data.choices[0].message?.content)
    return resp.data.choices[0].message?.content
  } catch (e) {
    console.error({ queryOpenAi: e })
    throw e
  }
}

const example = {
  description:
    "A children's story about a unique bunny named Spiky who was born with porcupine spikes. The story is designed to teach children the importance of embracing uniqueness and encouraging tolerance and acceptance.",

  storyParagraphs: [
    'The forest was home to a special bunny named Spiky. Unlike other bunnies, Spiky was born with porcupine spikes. He was different and he knew it.',

    "Spiky was often alone because other bunnies were afraid of his spikes. He didn't have bunny friends to play with. This made Spiky very sad.",

    "One day, a pack of wolves invaded the forest. All the animals ran away. However, Spiky couldn't run as fast as the others.",

    'The wolves saw Spiky and planned to hurt him. Spiky was frightened but then, a surprising thing occurred. His spikes rose in defense.',

    "The wolves were taken aback and quickly retreated. They couldn't harm Spiky because of his spikes. The bunny that was once afraid, stood bravely.",

    'After that day, all the animals in the forest looked at Spiky differently. They began to appreciate his unique spikes. Spiky was not only accepted but also admired. His difference made him special.',
  ],
}
