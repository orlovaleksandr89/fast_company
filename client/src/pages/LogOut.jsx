import React, { useEffect } from 'react'
import Loader from '../components/ui/loader'
import { useAuth } from '../hooks/useAuth'

function LogOut() {
  const { logOut } = useAuth()
  useEffect(() => {
    logOut()
  }, [])
  return <Loader />
}

export default LogOut
