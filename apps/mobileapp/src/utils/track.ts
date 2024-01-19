import { posthog } from '../constants/posthog'

export const track = (
  eventName: string,
  properties?:
    | {
        [key: string]: any
      }
    | undefined
) => {
  posthog && posthog.capture(eventName, properties)
}
