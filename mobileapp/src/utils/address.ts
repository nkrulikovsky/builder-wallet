export const shorterAddress = (address: string) => {
  return `${address.slice(0, 16)}...${address.slice(-16)}`
}

export const shortAddress = (address: string) => {
  return `${address.slice(0, 6)}...${address.slice(-4)}`
}
