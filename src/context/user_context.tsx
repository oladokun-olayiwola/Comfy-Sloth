import React, { createContext, useContext, useEffect, useState } from 'react'
import { useAuth0, User } from '@auth0/auth0-react'
import { UserContextValue, UserProviderProps } from '../interfaces/contextTypes'

const UserContext = createContext<UserContextValue | null>(null)
export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const { loginWithRedirect, logout, user } = useAuth0()

  const [myUser, setMyUser] = useState<User | undefined>(undefined)

  useEffect(() => {
    setMyUser(user)
  }, [user])

  return (
    <UserContext.Provider value={{ loginWithRedirect, logout, myUser }}>
      {children}
    </UserContext.Provider>
  )
}
// make sure use
export const useUserContext = () => {
  const context = useContext(UserContext);
    if (!context) {
      throw new Error('useCartContext must be used within a CartProvider');
    }
    return context;
}
