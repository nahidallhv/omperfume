export const uploadFile = async (file: File): Promise<string> => {
    const formData = new FormData()
    formData.append('file', file)
  
    const response = await fetch('/api/upload', {
      method: 'POST',
      body: formData,
    })
  
    if (!response.ok) {
      throw new Error('File upload failed')
    }
  
    const data = await response.json()
    return data.url
  }
  