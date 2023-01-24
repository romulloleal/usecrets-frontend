/* eslint-disable consistent-return */
import { Link } from 'react-router-dom'

import { Imention } from '~/interfaces'

const TextTemplate = ({
  mentions,
  text,
}: {
  mentions: Imention[]
  text: string
}) => {
  return text.split(/\{(.*?)\}/g).map((elem: string, index) => {
    if (mentions.find((mention) => mention.id === elem)) {
      const userName = mentions.find((mention) => mention.id === elem)?.userName
      return (
        <Link
          key={index as number}
          className='mention'
          to={`/profile/${userName}`}
        >
          @{userName}
        </Link>
      )
    }
    return elem
  })
}

export default TextTemplate
