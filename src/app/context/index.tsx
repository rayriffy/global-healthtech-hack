import React, { Dispatch, SetStateAction, useState } from 'react'

type ISubtitle = [string, Dispatch<SetStateAction<string>>] | []

export const Subtitle = React.createContext<ISubtitle>([])

const Context: React.FC = props => {
  const {children} = props

  // Subtitle
  const [subtitle, setSubtitle] = useState<string>('init')

  return (
    <Subtitle.Provider value={[subtitle, setSubtitle]}>
      {children}
    </Subtitle.Provider>
  )
}

export default Context
