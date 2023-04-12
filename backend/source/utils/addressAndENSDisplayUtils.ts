export const shortENS = (ens: string) => {
  if (ens.length < 15) {
    return ens
  }
  return [ens.substring(0, 4), ens.substring(ens.length - 8, ens.length)].join(
    '...'
  )
}

export const shortAddress = (address: string) => {
  return (
    address &&
    [
      address.substring(0, 4),
      address.substring(address.length - 4, address.length)
    ].join('...')
  )
}
