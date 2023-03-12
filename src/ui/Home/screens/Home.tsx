import React, { useState } from 'react'
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
import { handleGenerateAndSaveStory, playStory } from '../../../../AppAPIUtils'
import Voice, { SpeechResultsEvent } from '@react-native-voice/voice'

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

  const handleStartRecording = async () => {
    setIsRecording(true)
    try {
      await Voice.start('en-us')
    } catch (error: any) {
      console.log({ error })
    }
  }

  const handleAddStoryToStore = async (path: string, title: string) => {
    await addStoryToStore(store, setStore, title, [path])
    setTimeout(() => {
      playStory(path)
    }, 1000)
  }

  const [isRecording, setIsRecording] = useState(false)

  Voice.onSpeechStart = () => setIsRecording(true)
  Voice.onSpeechEnd = () => {
    setIsRecording(false)
  }

  Voice.onSpeechResults = async (res: SpeechResultsEvent) => {
    setIsRecording(false)
    const title: string = res.value
      ? res.value?.reduce<string>(
          (acc, curr) => (curr ? `${acc} ${curr}` : acc),
          ''
        )
      : ''
    await handleGenerateAndSaveStory(title.trim())
      .then(async (result) => await handleAddStoryToStore(result, title.trim()))
      .catch((generateError) => console.log({ generateError }))
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
          isRecording={isRecording}
          showIndicator={isRecording}
        />
        <Typography text="Tell me a children's story about..." />
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
