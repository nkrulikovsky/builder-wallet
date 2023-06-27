import { Mixpanel } from 'mixpanel-react-native'

// @ts-expect-error - `@env` is a virtualised module via Babel config.
import { MIXPANEL_TOKEN } from '@env'

export const mixpanel = new Mixpanel(MIXPANEL_TOKEN, true)
