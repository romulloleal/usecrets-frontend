import React from 'react'

import { ProgressCircleContainer } from './style'

interface ProgresCircleProps {
  progress: number
  charsRemain: number
}

const ProgressCircle = ({ progress, charsRemain }: ProgresCircleProps) => {
  const size = 35
  const trackWidth = 3
  const indicatorWidth = 3

  const indicatorColor = charsRemain <= 20 ? '#c01616' : '#1565C0'

  const center = size / 2
  const radius =
    center - (trackWidth > indicatorWidth ? trackWidth : indicatorWidth)
  const dashArray = 2 * Math.PI * radius
  const dashOffset = dashArray * ((100 - progress) / 100)

  return (
    <ProgressCircleContainer size={size}>
      <div className='content'>
        <svg>
          <circle
            cx={center}
            cy={center}
            fill='transparent'
            r={radius}
            stroke='#dddddd'
            strokeWidth={trackWidth}
          />
          <circle
            cx={center}
            cy={center}
            fill='transparent'
            r={radius}
            stroke={indicatorColor}
            strokeWidth={indicatorWidth}
            strokeDasharray={dashArray}
            strokeDashoffset={dashOffset}
          />
        </svg>
      </div>
      <span className='charsRemain'>{charsRemain}</span>
    </ProgressCircleContainer>
  )
}

export default ProgressCircle
