

import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { BadgeCheck, ChartNoAxesCombined, icons, LayoutDashboard, ShoppingBasket,  } from 'lucide-react';
import React, { Fragment, useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom';


const adminSidebarMenuItems =[
{
    id:'dashboard',
    label:'Dashboard',
    path:'/admin/dashboard',
    icons:<LayoutDashboard />
},
{
    id:'products',
    label:'Products',
    path:'/admin/products',
    icons:<ShoppingBasket />
},
{
    id:'orders',
    label:'Orders',
    path:'/admin/orders',
    icons:<BadgeCheck />
}
]

const AdminSideBar = ({open,setopen}) => {

const navigate = useNavigate();
function MenuItems({setopen}){
  return <nav>
    {
      adminSidebarMenuItems.map(menuItem=><div key={menuItem.id}
       onClick={()=>{
        navigate(menuItem.path);
        setopen ? setopen(false):null;

       }
      
       } className='flex text-sm cursor-pointer items-center gap-2 rounded-md px-3 py-2 mt-3 text-muted-foreground hover:bg-muted  hover:text-foreground'>
     {menuItem.icons}
     <span>{menuItem.label}</span>
      </div>)
    }
  </nav>
}

  return <Fragment>
<Sheet open={open} onOpenChange={setopen}>
<SheetContent side='left' className="w-64">
<div className='flex flex-col h-full'>
  <SheetHeader className="border-b">
  <SheetTitle className="flex gap-2 mt-5 mb-5">
    <ChartNoAxesCombined size={30}/>
    <h2 className='text-xl font-extrabold'>Admin Panel</h2>
  </SheetTitle>
  </SheetHeader>
  <MenuItems setopen={setopen}/>
</div>
</SheetContent>
</Sheet>

    <aside className='hidden w-64 flex-col border-r bg-background p-6 lg:flex'>
      <div 
      onClick={()=>navigate('/admin/dashboard')}
      className='flex items-center gap-2 cursor-pointer mb-4'>
<ChartNoAxesCombined size={30}/>
        <h1 className='text-xl font-extrabold'>Admin Panel</h1>
      </div>
      <MenuItems/>
    </aside>
  </Fragment>
}

export default AdminSideBar

