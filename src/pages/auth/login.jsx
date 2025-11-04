import CommonForm from '../../../src/components/common/form.jsx'
import { loginFormControls } from '../../../src/config/index.js'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const Login = () => {

  const initialState = {
    email:"",
    password:""
  }

   function onSubmit(){

  }
  const [formData,setFormData] = useState(initialState)
  return (
    <div className='mx-auto w-full max-w-md space-y-6'>
      <div className='text-center'>
      <h1 className='text-3xl font-bold tracking-tight text-foreground'>Sign in to your account</h1>
      <p className='mt-2'>Don't have an account</p>
      <Link to='/auth/register' className='font-medium text-primary hover:underline ml-2'>Register</Link>
    </div>
    <CommonForm
    formControls={loginFormControls}
    buttonText={'Sign In'}
    formData={formData}
    setFormData={setFormData}
    onSubmit={onSubmit}
    />

    </div>
  )
}

export default Login