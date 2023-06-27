import PostHog from 'posthog-react-native'

// @ts-expect-error - `@env` is a virtualised module via Babel config.
import { POSTHOG_TOKEN } from '@env'

export let posthog: PostHog | undefined = undefined

export const posthogAsync: Promise<PostHog> = PostHog.initAsync(POSTHOG_TOKEN, {
  host: 'https://eu.posthog.com'
})

posthogAsync.then(client => {
  posthog = client
})
