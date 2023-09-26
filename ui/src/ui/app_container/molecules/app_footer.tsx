import React from 'react'
import { StyleSheet, TouchableOpacity, View } from 'react-native'
import { scale } from '../../../common/utilities'
import { appColors } from '../../assets/app_colors'
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons'
import MaterialIcon from 'react-native-vector-icons/MaterialIcons'
import { Screens } from '../../../../AppStateMutate'
interface AppFooterProp {
  readonly navigate: (screen: Screens) => void
}

export const AppFooter = ({ navigate }: AppFooterProp) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        hitSlop={styles.iconHitSlop}
        onPress={() => navigate('home')}
      >
        <MaterialCommunityIcon
          name={'home-variant-outline'}
          size={scale(3)}
          color={appColors.offWhite}
        />
      </TouchableOpacity>
      <TouchableOpacity
        hitSlop={styles.iconHitSlop}
        onPress={() => navigate('saved')}
      >
        <MaterialCommunityIcon
          name={'playlist-music'}
          size={scale(3)}
          color={appColors.offWhite}
        />
      </TouchableOpacity>
      <TouchableOpacity hitSlop={styles.iconHitSlop}>
        <View style={styles.plusIconOuter}>
          <View style={styles.plusIconInner}>
            <MaterialCommunityIcon
              name={'plus'}
              size={scale(3)}
              color={appColors.offWhite}
            />
          </View>
        </View>
      </TouchableOpacity>
      <TouchableOpacity hitSlop={styles.iconHitSlop}>
        <MaterialIcon
          name={'settings'}
          size={scale(3)}
          color={appColors.offWhite}
        />
      </TouchableOpacity>
      <TouchableOpacity hitSlop={styles.iconHitSlop}>
        <MaterialIcon
          name={'account-box'}
          size={scale(3)}
          color={appColors.offWhite}
        />
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    borderBottomEndRadius: scale(1.1),
    borderBottomStartRadius: scale(1.1),
    borderTopEndRadius: scale(0.25),
    borderTopStartRadius: scale(0.25),
    backgroundColor: appColors.darkPurple,
    height: scale(8),
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    elevation: 5,
  },
  plusIconOuter: {
    width: scale(7),
    height: scale(7),
    borderRadius: scale(7),
    backgroundColor: appColors.darkGray,
    alignItems: 'center',
    justifyContent: 'center',
  },
  plusIconInner: {
    width: scale(6),
    height: scale(6),
    borderRadius: scale(6),
    backgroundColor: appColors.darkPurple,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconHitSlop: {
    top: scale(3.5),
    bottom: scale(3.5),
    left: scale(2),
    right: scale(2),
  },
})
