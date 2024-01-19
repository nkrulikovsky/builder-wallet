export function extractBase64FromDataUrl(dataUrl: string): string {
  const base64Index = dataUrl.indexOf('base64,')
  if (base64Index === -1) {
    throw new Error('Invalid data URL')
  }
  return dataUrl.slice(base64Index + 7)
}

export function base64ToObject(base64String: string): any {
  try {
    const jsonString = Buffer.from(base64String, 'base64').toString('utf-8')
    const jsonObject = JSON.parse(jsonString)
    return jsonObject
  } catch (error) {
    console.error('Error converting Base64 string to object:', error)
    return {}
  }
}
