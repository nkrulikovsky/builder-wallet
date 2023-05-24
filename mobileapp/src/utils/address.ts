export const shorterAddress = (address: string) => {
  return `${address.slice(0, 18)}...${address.slice(-18)}`
}

export const shortAddress = (address: string) => {
  return `${address.slice(0, 6)}...${address.slice(-4)}`
}
