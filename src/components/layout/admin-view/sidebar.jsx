
import { ChartNoAxesCombined } from 'lucide-react';
import React, { Fragment } from 'react'
import { Navigate, useNavigate } from 'react-router-dom';

const AdminSideBar = () => {

const navigate = useNavigate();

  return <Fragment>
    <aside className='hidden w-64 flex-col border-r bg-background '>
      <div 
      onClick={()=>navigate('/admin/dashboard')}
      className='flex items-center gap-2'>
<ChartNoAxesCombined size={30}/>
        <h1 className='text-xl font-extrabold'>Admin Panel</h1>

      </div>
    </aside>
  </Fragment>
}

export default AdminSideBar