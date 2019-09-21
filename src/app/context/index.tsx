import React, { Dispatch, SetStateAction, useState } from 'react'

import { IUser } from '../../core/@types/IUser'

import { get } from 'local-storage'

type ISubtitle = [string, Dispatch<SetStateAction<string>>] | []
type IUserData = [IUser, Dispatch<SetStateAction<IUser>>] | []

export const Subtitle = React.createContext<ISubtitle>([])
export const UserData = React.createContext<IUserData>([])

const Context: React.FC = props => {
  const {children} = props

  // Subtitle
  const [subtitle, setSubtitle] = useState<string>('init')

  // User
  const [user, setUser] = useState<IUser>(JSON.parse(get('user')))

  return (
    <Subtitle.Provider value={[subtitle, setSubtitle]}>
      <UserData.Provider value={[user, setUser]}>
        {children}
      </UserData.Provider>
    </Subtitle.Provider>
  )
}

export default Context
