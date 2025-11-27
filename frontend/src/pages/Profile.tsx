import React, { useEffect } from 'react'

function Profile() {

    useEffect(() => {
        console.log("Profile call")
    },[])

  return (
    <div>Profile</div>
  )
}

export default Profile