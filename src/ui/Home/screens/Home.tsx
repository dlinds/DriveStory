import React, { useEffect, useState } from 'react'
import { StyleSheet, View } from 'react-native'
import { scale } from '../../../common/utilities'
import { AppContainer } from '../../app_container/screens/app_container'
import { Typography } from '../../_atoms/typography'
import { RecordButton } from '../atoms/record_button'
import {
  CustomizeOption,
  CustomizeStoryPopup,
} from '../molecules/customize_story_popup'
import {
  addStoryToStore,
  handleNavigate,
  Screens,
  setCustomizedText,
  setSelectedCustomized,
  StateMutate,
} from '../../../../AppStateMutate'
import { CircularPlusButton } from '../atoms/circular_plus_button'
import {
  handleGenerateAndSaveStory,
  queryOpenAi,
} from '../../../../AppAPIUtils'
import Voice, { SpeechResultsEvent } from '@react-native-voice/voice'
import TrackPlayer, { Track } from 'react-native-track-player'
import { addTracks } from '../../../../trackPlayerServices'
import { usePlaybackState, State } from 'react-native-track-player'

export const Home = ({ store, setStore }: StateMutate) => {
  const [popup, showPopup] = useState(false)

  const handleUnselectingItem = (label: string) => {
    const currentlySelected = store.selectedCustomizedOptions
    setSelectedCustomized(
      store,
      setStore,
      currentlySelected?.filter((i) => i.label !== label) || []
    )
  }

  const chooseCustomOptionsPopup = (
    <CustomizeStoryPopup
      customizeOptions={store.customizeOptions}
      setCustomizedText={(val: string) =>
        setCustomizedText(store, setStore, val)
      }
      setSelectedCustomized={(vals: CustomizeOption[]) =>
        setSelectedCustomized(store, setStore, vals)
      }
      currentlySelectedOptions={store.selectedCustomizedOptions}
      currentCustomText={store.customText}
    />
  )
  const [currentAction, setCurrentAction] = useState<string>()
  const [isRecording, setIsRecording] = useState(false)
  const [currentPrompt, setCurrentPrompt] = useState<string>()

  const playerState = usePlaybackState()
  const isPlaying = playerState === State.Playing

  const handleResetControls = async () => {
    setIsRecording(false)
    await TrackPlayer.reset()
    setCurrentPrompt(undefined)
  }

  const handleStartRecording = async () => {
    handleResetControls()
    setCurrentAction('listening...')
    setIsRecording(true)
    try {
      await Voice.start('en-us')
    } catch (error: any) {
      console.log({ error })
    }
  }

  Voice.onSpeechStart = () => setIsRecording(true)
  Voice.onSpeechEnd = () => {
    setIsRecording(false)
    setCurrentAction('done listening...')
  }

  Voice.onSpeechResults = async (res: SpeechResultsEvent) => {
    setIsRecording(false)
    const prompt: string = res.value ? res.value[0] : ''
    setCurrentPrompt(prompt)
    handleCallOpenAI(prompt)
  }

  const handleCallOpenAI = async (prompt: string) => {
    setIsRecording(false)
    setCurrentAction('writing a story')
    const storyResult = (await queryOpenAi({ prompt, store })).data.choices[0]
      .message?.content
    if (storyResult) {
      await handleCallGoogle(storyResult, prompt)
    }
  }

  const handleCallGoogle = async (storyResult: string, title: string) => {
    setIsRecording(false)
    setCurrentAction('synthesizing the story')
    await handleGenerateAndSaveStory(storyResult)
      .then(async (path) => {
        const newStoryId = addStoryToStore(store, setStore, title, [path])
        const newTrack: Track = {
          id: newStoryId,
          url: path,
          title,
        }
        await addTracks(newTrack)
        TrackPlayer.play()
        setCurrentAction('')
      })
      .catch((generateError) => console.log({ generateError }))
    setCurrentPrompt('')
  }

  return (
    <AppContainer
      showPopup={popup}
      setShowPopup={showPopup}
      popupContent={chooseCustomOptionsPopup}
      navigate={(screen: Screens) => handleNavigate(store, setStore, screen)}
    >
      <View style={styles.container}>
        <RecordButton
          setIsRecording={() => handleStartRecording()}
          // manual prompt generation for dev
          // setIsRecording={() => {
          //   console.log('recording')
          //   setCurrentPrompt('a bunny with porcupine spikes')
          //   handleCallOpenAI('a bunny with porcupine spikes')
          // }}
          isRecording={isRecording && !isPlaying}
          showIndicator={isRecording && !isPlaying}
        />
        <Typography text="Tell me a children's story about..." />
        {currentPrompt && <Typography text={`[ ${currentPrompt} ]`} />}
        {currentAction && <Typography text={currentAction} />}
        {isPlaying && <Typography text="Currently playing story" />}
        <View style={styles.circularButtonRowContainer}>
          {store.selectedCustomizedOptions?.map((option) => (
            <CircularPlusButton
              actionCallback={() => handleUnselectingItem(option.label)}
              text={option.label}
              key={option.label}
              customText={store.customText}
              variant="minus"
            />
          ))}
        </View>
        <View style={styles.circularButtonRowContainerEmpty}>
          <CircularPlusButton
            actionCallback={() => showPopup((prev) => !prev)}
          />
        </View>
      </View>
    </AppContainer>
  )
}

const styles = StyleSheet.create({
  circularButtonRowContainer: {
    width: '85%',
    rowGap: scale(2),
  },
  circularButtonRowContainerEmpty: {
    width: '85%',
  },
  container: {
    flex: 1,
    alignItems: 'center',
    marginTop: '15%',
    rowGap: scale(2),
  },
})
