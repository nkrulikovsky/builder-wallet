import SharedGroupPreferences from 'react-native-shared-group-preferences'
import config from '../../config'

const { app: AppConfig } = config

export const sharedGroupStorage = {
  setItem: async (key: string, value: any, appGroup: string) => {
    return await SharedGroupPreferences.setItem(key, value, appGroup)
  },
  getItem: async (key: string, appGroup: string): Promise<any | null> => {
    return await SharedGroupPreferences.getItem(key, appGroup)
  }
}

export const daosGroupStorage = {
  setItem: async (key: string, value: any) =>
    sharedGroupStorage.setItem(key, value, AppConfig.daosAppGroup),
  getItem: async (key: string): Promise<any | null> =>
    sharedGroupStorage.getItem(key, AppConfig.daosAppGroup)
}
