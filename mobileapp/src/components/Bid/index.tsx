import clsx from 'clsx'
import { Image, Text, View } from 'react-native'
import { useEnsAvatar, useEnsName } from 'wagmi'
import { shortAddress } from '../../utils/address'

type BidderProps = {
  address: `0x${string}`
  bid: string
  className?: string
}

const Bidder = ({ address, bid, className }: BidderProps) => {
  const { data: ens } = useEnsName({
    address: address
  })
  const { data: avatar } = useEnsAvatar({
    name: ens
  })

  const noBid = Number(bid) === 0
  const displayName = `${ens ?? shortAddress(address)}`
  const displayBid = `${bid} Ξ`
  const displayAvatar = avatar

  return (
    <View
      className={clsx(
        'border border-grey-one px-4 h-12 w-full rounded-lg',
        className
      )}>
      {noBid ? (
        <Text className="my-auto">No bids!</Text>
      ) : (
        <View className="-ml-1 h-full flex flex-row items-center justify-between">
          <View className="flex flex-row text-center items-center">
            {displayAvatar && (
              <Image
                className="h-6 w-6 mr-1 rounded-full bg-grey-one/60"
                source={{
                  uri: displayAvatar
                }}
              />
            )}
            <Text className="text-black ml-1">{displayName}</Text>
          </View>
          <Text className="text-black">{displayBid}</Text>
        </View>
      )}
    </View>
  )
}

export default Bidder
