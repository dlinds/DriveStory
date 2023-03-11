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
import { StateMutate } from '../../../../AppStateMutate'
import { CircularPlusButton } from '../atoms/circular_plus_button'

export const Home = ({ store, setStore }: StateMutate) => {
  const [isRecording, setIsRecording] = useState(false)
  const [isFetching, setIsFetching] = useState(false)

  const [popup, showPopup] = useState(false)

  return (
    <AppContainer
      showPopup={popup}
      setShowPopup={showPopup}
      popupContent={
        <CustomizeStoryPopup
          customizeOptions={store.customizeOptions}
          store={{ store: store, setStore: setStore }}
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
        {!store.selectedCustomizedOptions?.length ? (
          <View style={styles.circularButtonRowEmpty}>
            <CircularPlusButton showPopup={() => showPopup((prev) => !prev)} />
          </View>
        ) : (
          store.selectedCustomizedOptions?.map((option) => (
            <CircularPlusButton
              showPopup={() => showPopup((prev) => !prev)}
              text={option.label}
              key={option.label}
              customText={store.customText}
            />
          ))
        )}
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
