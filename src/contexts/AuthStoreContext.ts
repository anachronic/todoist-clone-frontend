import React from 'react'
import { AuthStore } from '../store/AuthStore'

export const AuthStoreContext = React.createContext(new AuthStore())
