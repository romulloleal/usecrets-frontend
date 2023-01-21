import { toast } from 'react-toastify'

import { translate } from './Translate'

const imageToBase64 = async (
  file: File,
  callback: (result: string) => void
) => {
  const type = await getFileType(file.type)

  if (type === 'image') {
    const reader = new FileReader()

    reader.readAsDataURL(file)
    reader.onload = async function getResult(event) {
      callback(event?.target?.result as string)
    }
  } else {
    toast.error(translate('acceptOnlyImages'))
  }
}

const getFileType = async (type: string) => {
  const newType = type ? type.split('/') : ['']
  return newType[0]
}

export default imageToBase64
