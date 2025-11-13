import { useDispatch } from 'react-redux'
import CommonForm from '../../../src/components/common/form.jsx'
import { registerFormControls } from '../../../src/config/index.js'
import React, { use, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { registerUser } from '../../store/auth-slice/index.js'
import { toast } from 'sonner'

const Register = () => {
  const navigate = useNavigate();

  const initialState = {
    username:"",
    email:"",
    password:""
  }

  const [formData,setFormData] = useState(initialState)
  const dispatch = useDispatch();
  console.log(formData);

  function onSubmit(e){
    e.preventDefault();
    dispatch(registerUser(formData)).then((data)=>{  
      if(data?.payload?.success){
        toast.success('User register successfully!')
        navigate("/auth/login");
      }else{
        toast.success('User already exist with the same email! Please try again ')
      }
    });


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