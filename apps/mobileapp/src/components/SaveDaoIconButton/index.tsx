import { Alert, TouchableOpacity, View } from 'react-native'
import Svg, { Path } from 'react-native-svg'
import { isAddressEqual } from 'viem'
import { SavedDao, useDaosStore } from '../../store/daos'
import { SearchDao, useDaoSearchStore } from '../../store/daoSearch'

export default function SaveDaoIconButton({
  dao
}: {
  dao: SavedDao | SearchDao
}) {
  const savedDaos = useDaosStore(state => state.saved)
  const save = useDaosStore(state => state.save)
  const removeFromSaved = useDaosStore(state => state.removeFromSaved)
  const searchDaos = useDaoSearchStore(state => state.searchResults)

  const daoIsSaved = savedDaos.some(savedDao =>
    isAddressEqual(
      savedDao.address as `0x${string}`,
      dao.address as `0x${string}`
    )
  )

  const saveOrUnSave = () => {
    if (daoIsSaved) {
      const daoInSearch = searchDaos.some(d =>
        isAddressEqual(d.address as `0x${string}`, dao.address as `0x${string}`)
      )

      if (daoInSearch) {
        removeFromSaved(dao.address)
      } else {
        Alert.prompt(
          'Remove Dao',
          `Are you sure you want to remove ${dao.name} from saved?`,
          [
            {
              text: 'Cancel',
              onPress: () => {},
              style: 'cancel'
            },
            {
              text: 'Remove',
              onPress: () => removeFromSaved(dao.address),
              style: 'destructive'
            }
          ],
          'default'
        )
      }
    } else {
      save(dao)
    }
  }

  return (
    <TouchableOpacity
      className="absolute h-full z-10"
      activeOpacity={0.8}
      onPress={saveOrUnSave}>
      <View className="absolute bottom-0 left-0 h-12 w-12 bg-grey-one/95 rounded-tr-lg rounded-bl-lg flex items-center justify-center">
        {daoIsSaved ? (
          <Svg viewBox="0 0 24 24" className="fill-black w-6 h-6">
            <Path
              fillRule="evenodd"
              d="M6.32 2.577a49.255 49.255 0 0111.36 0c1.497.174 2.57 1.46 2.57 2.93V21a.75.75 0 01-1.085.67L12 18.089l-7.165 3.583A.75.75 0 013.75 21V5.507c0-1.47 1.073-2.756 2.57-2.93z"
              clipRule="evenodd"
            />
          </Svg>
        ) : (
          <Svg
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            className="stroke-black w-6 h-6">
            <Path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 4.5v15m7.5-7.5h-15"
            />
          </Svg>
        )}
      </View>
    </TouchableOpacity>
  )
}
