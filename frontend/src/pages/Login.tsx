import React, { FormEvent, useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { userLogin } from '../services/userService'
import apiConfig from '../services/apiConfig'

function Login() {

  const navigate = useNavigate()
  const [email, setEmail] = useState<string>("hakanozer02@gmail.com")
  const [password, setPassword] =useState<string>("123456")

  const formLogin = (evt: FormEvent) => {
    evt.preventDefault()
    userLogin(email, password).then(res => {
        // işlem başarılı oldu
        const dt = res.data
        const token = dt.data.access_token
        apiConfig.defaults.headers.common['Authorization'] = `Bearer ${token}`
        localStorage.setItem('access_token', token)
        navigate('/dashboard')
    }).catch(err => {
        // iş hatalı
        alert('E-mail or Password incorrect')
    })
  }

  return (
    <>
        <div className='row'>
            <div className='col-12 col-xs-12 col-sm-12 col-md-3 col-lg-4'></div>
            <div className='col-12 col-xs-12 col-sm-12 col-md-6 col-lg-4'>
                <h2>User Login</h2>
                <form onSubmit={formLogin}>
                    <div className="mb-3">
                        <input value={email} onChange={e => setEmail(e.target.value)} type="email" required placeholder='E-Mail' className="form-control" id="exampleInputEmail1" />
                    </div>
                    <div className="mb-3">
                        <input value={password} onChange={e => setPassword(e.target.value)} type="password" required placeholder='Password' className="form-control" id="exampleInputPassword1" />
                    </div>
                    <div className='d-flex justify-content-between'>
                        <button type="submit" className="btn btn-primary">Submit</button>
                        <NavLink to="/register" className='btn btn-info'>Register</NavLink>
                    </div>
                </form>
            </div>
            <div className='col-12 col-xs-12 col-sm-12 col-md-3 col-lg-4'></div>
        </div>
    </>
  )
}

export default Login