import React from 'react'
import { Text, TouchableOpacity, View } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { Proposal } from '../../utils/types'
import clsx from 'clsx'
import { SavedDao } from '../../store/daos'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import { useAddressesStore } from '../../store/addresses'
import { isAddressEqual } from 'viem'

dayjs.extend(relativeTime)

type ProposalCardProps = {
  dao: SavedDao
  proposal: Proposal
}

const ProposalCard = ({ dao, proposal }: ProposalCardProps) => {
  const manualAddresses = useAddressesStore(state => state.manualAddresses)
  const navigation = useNavigation()

  const openDaoPage = () => {
    navigation.navigate('Proposal', {
      proposal: proposal
    })
  }

  let timeLeft = ''

  if (proposal.status === 'PENDING') {
    timeLeft = `Starts ${dayjs().to(proposal.voteStart * 1000)}`
  } else if (proposal.status === 'ACTIVE') {
    timeLeft = `Ends ${dayjs().to(proposal.voteEnd * 1000)}`
  } else if (
    proposal.status === 'QUEUED' &&
    proposal.executableFrom &&
    proposal.expiresAt
  ) {
    if (dayjs().isBefore(proposal.executableFrom * 1000)) {
      timeLeft = `Executable ${dayjs().to(proposal.executableFrom * 1000)}`
    } else {
      timeLeft = `Expires ${dayjs().to(proposal.expiresAt * 1000)}`
    }
  }

  const voted =
    proposal.status === 'ACTIVE' &&
    manualAddresses.some(address =>
      proposal.votes.some(vote =>
        isAddressEqual(vote.voter as `0x${string}`, address as `0x${string}`)
      )
    )

  let statusString =
    proposal.status.toLowerCase().charAt(0).toUpperCase() +
    proposal.status.toLowerCase().slice(1)

  let statusTextColor = ''
  let statusBoxStyle = ''

  if (proposal.status === 'PENDING') {
    statusTextColor = 'text-sky'
    statusBoxStyle = 'border border-sky/40'
  } else if (proposal.status === 'ACTIVE') {
    statusTextColor = voted ? 'text-white' : 'text-green'
    statusBoxStyle = voted ? 'bg-green' : 'border border-green/40'
    if (voted) statusString = 'Voted'
  } else {
    statusTextColor = 'text-purple'
    statusBoxStyle = 'border border-purple/30'
  }

  return (
    <TouchableOpacity activeOpacity={0.8} onPress={openDaoPage}>
      <View className="flex flex-col mb-3 rounded-lg border border-grey-one p-3">
        <View className="w-full flex flex-row justify-between items-center">
          <Text className="font-bold text-grey-three tracking-tight flex-shrink">
            {dao.name}
          </Text>
          <View className="flex flex-row gap-1 items-center">
            <Text className="font-medium text-grey-two tracking-tight pl-1">
              {timeLeft}
            </Text>
            <View className={clsx('rounded-full py-0.5 px-2', statusBoxStyle)}>
              <Text
                className={clsx('font-bold tracking-tighter', statusTextColor)}>
                {statusString}
              </Text>
            </View>
          </View>
        </View>
        <Text className="mt-0.5 font-bold text-base leading-[1.375rem]">
          {proposal.title}
        </Text>
      </View>
    </TouchableOpacity>
  )
}

export default ProposalCard
