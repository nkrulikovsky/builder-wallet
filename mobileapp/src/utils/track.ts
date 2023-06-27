import { MixpanelProperties } from 'mixpanel-react-native'
import { mixpanel } from '../constants/mixpanel'

export const track = (
  eventName: string,
  properties?: MixpanelProperties | undefined
) => {
  mixpanel.track(eventName, properties)
}
