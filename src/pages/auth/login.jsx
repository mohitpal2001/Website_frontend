import { useDispatch } from 'react-redux'
import CommonForm from '../../../src/components/common/form.jsx'
import { loginFormControls } from '../../../src/config/index.js'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { loginUser } from '@/store/auth-slice/index.js'
import { toast } from 'sonner'


const Login = () => {
 const initialState = {
    email:"",
    password:""
  }

  const [formData,setFormData] = useState(initialState)
  const dispatch = useDispatch();

   function onSubmit(e){
 e.preventDefault();
  dispatch(loginUser(formData)).then((data)=>{
    if(data?.payload?.success){
      toast.success(`${data?.payload?.message}`)
    }else{
      toast.success(`${data?.payload?.message}`)
    }
  })
    
  }
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