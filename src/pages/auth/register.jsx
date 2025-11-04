import CommonForm from '../../../src/components/common/form.jsx'
import { registerFormControls } from '../../../src/config/index.js'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const Register = () => {

  const initialState = {
    userName:"",
    email:"",
    password:""
  }

  const [formData,setFormData] = useState(initialState)

  function onSubmit(){

  }
  return (
    <div className='mx-auto w-full max-w-md space-y-6'>
      <div className='text-center'>
      <h1 className='text-3xl font-bold tracking-tight text-foreground'>Create new account</h1>
      <p className='mt-2'>Already Have an Account</p>
      <Link to='/auth/login' className='font-medium text-primary hover:underline ml-2'>Login</Link>
    </div>
    <CommonForm
    formControls={registerFormControls}
    buttonText={'Sign Up'}
    formData={formData}
    setFormData={setFormData}
    onSubmit={onSubmit}
    />

    </div>
  )
}

export default Register