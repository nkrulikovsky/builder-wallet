import React from 'react'
import { View, TouchableOpacity } from 'react-native'
import { useDaoSearchStore } from '../../store/daoSearch'
import clsx from 'clsx'
import Svg, { Path } from 'react-native-svg'

const SearchButton = () => {
  const active = useDaoSearchStore(state => state.active)
  const setActive = useDaoSearchStore(state => state.setActive)

  const onPress = () => {
    setActive(!active)
  }

  return (
    <TouchableOpacity activeOpacity={0.8} onPress={onPress}>
      <View
        className={clsx(
          'h-8 w-8 border-2 border-grey-one rounded-md justify-center items-center',
          active && 'bg-grey-one'
        )}>
        <Svg
          viewBox="0 0 20 20"
          className={clsx('w-5 h-5', active ? 'fill-black' : 'fill-grey-four')}>
          <Path
            fillRule="evenodd"
            d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z"
            clipRule="evenodd"
          />
        </Svg>
      </View>
    </TouchableOpacity>
  )
}

export default SearchButton
