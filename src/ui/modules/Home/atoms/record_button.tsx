import React, { useEffect, useState } from 'react'
import {
  ActivityIndicator,
  Pressable,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native'
import { scale } from '../../../../common/utilities'
import { appColors } from '../../../assets/app_colors'

export interface RecordButtonProps {
  readonly setIsRecording: (value: boolean) => void
  readonly isRecording: boolean
  readonly showIndicator?: boolean
}

export const RecordButton = ({
  setIsRecording,
  isRecording,
  showIndicator = false,
}: RecordButtonProps) => {
  // const [localIsRecording, setLocalIsRecording] = useState(isRecording)

  // useEffect(() => {
  //   setIsRecording(localIsRecording)
  // }, [localIsRecording])

  const recordButtonStyle = {
    ...styles.container,
    ...(isRecording ? styles.recordingContainer : styles.defaultContainer),
  }

  const activityIndicator = (
    <ActivityIndicator size="large" color={appColors.offWhite} />
  )

  return (
    <TouchableOpacity
      disabled={showIndicator}
      onPress={() => setIsRecording(!isRecording)}
      style={recordButtonStyle}
    >
      {showIndicator && activityIndicator}
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    height: scale(24),
    width: scale(24),
    borderRadius: scale(24),
    borderWidth: scale(0.6),
    elevation: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  defaultContainer: {
    backgroundColor: appColors.primaryPurple,
    borderColor: appColors.mediumDarkGray,
  },
  recordingContainer: {
    backgroundColor: appColors.softRed,
    borderColor: appColors.lightGray,
  },
})
