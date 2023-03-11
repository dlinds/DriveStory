import React, { useState } from 'react'
import { Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { scale } from '../../../common/utilities'
import { AppContainer } from '../../app_container/screens/app_container'
import { Typography } from '../../_atoms/typography'
import { RecordButton } from '../atoms/record_button'
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons'
import { appColors } from '../../assets/app_colors'
import {
  CustomizeOption,
  CustomizeStoryPopup,
} from '../molecules/customize_story_popup'

export const Home = () => {
  const [isRecording, setIsRecording] = useState(false)
  const [isFetching, setIsFetching] = useState(false)

  const customizeOptions: CustomizeOption[] = [
    {
      label: 'Two Characters',
      isSelected: false,
    },
    {
      label: 'Chapters',
      isSelected: false,
    },
    {
      label: 'Use me as the main character',
      isSelected: false,
    },
    {
      label: 'Customize prompt',
      isSelected: false,
      customAnswer: true,
    },
  ]

  const [popup, showPopup] = useState(false)

  return (
    <AppContainer
      showPopup={popup}
      setShowPopup={showPopup}
      popupContent={<CustomizeStoryPopup customizeOptions={customizeOptions} />}
    >
      <View style={styles.container}>
        <RecordButton
          setIsRecording={setIsRecording}
          isRecording={isRecording}
          showIndicator={isFetching}
        />
        <Typography text="Tell me a children's story about..." />
        <TouchableOpacity
          style={styles.addSettingIcon}
          onPress={() => showPopup((prev) => !prev)}
        >
          <MaterialCommunityIcon
            name={'plus'}
            size={scale(3)}
            color={appColors.offWhite}
          />
        </TouchableOpacity>
      </View>
    </AppContainer>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    marginTop: '20%',
    rowGap: scale(2),
  },
  addSettingIcon: {
    //move into own atom
    backgroundColor: appColors.primaryPurple,
    borderColor: appColors.mediumDarkGray,
    borderWidth: scale(0.3),
    height: scale(5),
    width: scale(5),
    borderRadius: scale(5),
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'flex-start',
    marginLeft: scale(5),
  },
})
