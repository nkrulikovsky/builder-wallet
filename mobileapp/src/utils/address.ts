export const shorterAddress = (address: string) => {
  return `${address.slice(0, 18)}...${address.slice(-18)}`
}
