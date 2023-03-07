import React, { useEffect, useState } from 'react'
import { Pressable, StyleSheet, TouchableOpacity, View } from 'react-native'
import { scale } from '../../../common/utilities'
import { appColors } from '../../assets/app_colors'

export interface RecordButtonProps {
  readonly setIsRecording: (value: boolean) => void
  readonly isRecording: boolean
}

export const RecordButton = ({
  setIsRecording,
  isRecording,
}: RecordButtonProps) => {
  const [localIsRecording, setLocalIsRecording] = useState(false)

  useEffect(() => {
    setIsRecording(localIsRecording)
  }, [localIsRecording])

  const recordButtonStyle = {
    ...styles.container,
    ...(localIsRecording ? styles.recordingContainer : styles.defaultContainer),
  }

  return (
    <TouchableOpacity
      onPress={() => setLocalIsRecording((prev) => !prev)}
      style={recordButtonStyle}
    ></TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    height: scale(24),
    width: scale(24),
    borderRadius: scale(24),
    borderWidth: scale(0.6),
    elevation: 5,
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
