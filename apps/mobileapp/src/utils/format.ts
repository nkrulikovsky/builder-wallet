import { formatEther } from 'viem'

export function formatBid(bid: string) {
  return formatEther(BigInt(bid))
}
