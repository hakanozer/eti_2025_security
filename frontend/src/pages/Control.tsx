import React, { JSX, useEffect, useState } from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import apiConfig from '../services/apiConfig'
import { userProfile } from '../services/userService'
import NavBar from '../components/NavBar'

 function Control(props: {item: JSX.Element}) {

  const loc = useLocation()
  const jwt = localStorage.getItem('access_token')
  apiConfig.defaults.headers.common['Authorization'] = `Bearer ${jwt}`
  const [name, setName] = useState("")

  useEffect(() => {
    control()
    console.log("control call")
  }, [loc.pathname])

  const control =  () => {
     userProfile().then(res => {
        const dt = res.data
        const name = dt.data.name
        setName(name)
    }).catch(err => {
        localStorage.removeItem('access_token')
        window.location.href = '/'
    })
  }


  return (
    <>
        { jwt 
        ?
            <>
                <NavBar name={name} />
                {props.item}
            </>
        : 
            <Navigate to='/' /> 
        }
    </>
  )
}

export default Control