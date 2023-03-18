/**
 * @format
 */

import { AppRegistry } from 'react-native'
import App from './App'
import { name as appName } from './app.json'
import 'react-native-url-polyfill/auto'
import { LogBox } from 'react-native'
import TrackPlayer from 'react-native-track-player'

import { playbackService } from './trackPlayerServices'

LogBox.ignoreLogs(['new NativeEventEmitter']) // Ignore log notification by message

AppRegistry.registerComponent(appName, () => App)
TrackPlayer.registerPlaybackService(() => playbackService)
