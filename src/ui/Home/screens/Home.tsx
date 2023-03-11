import React, { useState } from 'react'
import { Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { scale } from '../../../common/utilities'
import { AppContainer } from '../../app_container/screens/app_container'
import { Typography } from '../../_atoms/typography'
import { RecordButton } from '../atoms/record_button'
import { appColors } from '../../assets/app_colors'
import {
  CustomizeOption,
  CustomizeStoryPopup,
} from '../molecules/customize_story_popup'
import {
  setCustomizedText,
  setSelectedCustomized,
  StateMutate,
} from '../../../../AppStateMutate'
import { CircularPlusButton } from '../atoms/circular_plus_button'

export const Home = ({ store, setStore }: StateMutate) => {
  const [isRecording, setIsRecording] = useState(false)
  const [isFetching, setIsFetching] = useState(false)

  const [popup, showPopup] = useState(false)

  const handleUnselectingItem = (label: string) => {
    const currentlySelected = store.selectedCustomizedOptions
    setSelectedCustomized(
      store,
      setStore,
      currentlySelected?.filter((i) => i.label !== label) || []
    )
  }

  return (
    <AppContainer
      showPopup={popup}
      setShowPopup={showPopup}
      popupContent={
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
      }
    >
      <View style={styles.container}>
        <RecordButton
          setIsRecording={setIsRecording}
          isRecording={isRecording}
          showIndicator={isFetching}
        />
        <Typography text="Tell me a children's story about..." />
        {store.selectedCustomizedOptions?.map((option) => (
          <CircularPlusButton
            actionCallback={() => handleUnselectingItem(option.label)}
            text={option.label}
            key={option.label}
            customText={store.customText}
            variant="minus"
          />
        ))}
        <View style={styles.circularButtonRowEmpty}>
          <CircularPlusButton
            actionCallback={() => showPopup((prev) => !prev)}
          />
        </View>
      </View>
    </AppContainer>
  )
}

const styles = StyleSheet.create({
  circularButtonRowEmpty: {
    flexDirection: 'row',
    margin: 0,
    justifyContent: 'flex-start',
    alignContent: 'center',
    alignItems: 'center',
    width: '85%',
  },
  container: {
    flex: 1,
    alignItems: 'center',
    marginTop: '20%',
    rowGap: scale(2),
  },
})
