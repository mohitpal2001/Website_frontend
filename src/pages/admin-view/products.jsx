

import CommonForm from '@/components/common/form';
import ProductImageUpload from '@/components/layout/admin-view/image-upload';
import { Button } from '@/components/ui/button'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { addProductFormElements } from '@/config';
import React, { Fragment, useState,useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { fetchProducts } from '@/store/admin/product-slice/index.js';
import { useSelector } from 'react-redux';
import { toast } from 'sonner'

const initialFormData = {
  image:null,
  title:'',
  description:'',
  category:'',
  brand: '',
  price:'',
  salePrice:'',
  totalStock:''
}

const AdminProducts = () => {
const [openCreateProductDialog,setopenCreateProductDialog]=useState(false);
const[formData,setFormData]=useState(initialFormData);
const [imageFile,setImageFile]=useState(null);
const[uploadedImageUrl,setuploadedImageUrl]=useState('')
const [imageLoadingState,setimageLoadingState]=useState(false);
const {products,isLoading} = useSelector((state)=>state.adminProducts);
const dispatch = useDispatch();


function onSubmit(e){
  e.preventDefault(); 
  dispatch(addnewProduct({
    ...formData,
    image:uploadedImageUrl
  })).then((data)=>{
    console.log(data);
    if(data?.payload?.status){
      toast.success(data?.payload?.message);
      setopenCreateProductDialog(false);
      setFormData(initialFormData);
      setImageFile(null);
      setuploadedImageUrl('');
    }else{
      toast.error(data?.payload?.message);
    }
  });
}

useEffect(()=>{
  dispatch(fetchProducts());
},[dispatch]);

console.log(products,isLoading,formData);

 
  return (
    <Fragment>
      <div className="mb-5  w-full flex justify-end">
        <Button onClick={() => {setopenCreateProductDialog(true)}}>
          Add New Product
        </Button>
      </div>
      <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-4 "></div>
      <Sheet
        open={openCreateProductDialog}
        onOpenChange={() => {
          setopenCreateProductDialog(false);
        }}
      >
        <SheetContent side="right" className="overflow-auto">
          <SheetHeader>
            <SheetTitle>Add new Product</SheetTitle>
          </SheetHeader>
          <ProductImageUpload imageFile={imageFile} setimageFile={setImageFile}  uploadedImageUrl={uploadedImageUrl} setuploadedImageUrl={setuploadedImageUrl} imageLoadingState={imageLoadingState} setimageLoadingState={setimageLoadingState}/>
          <div className='p-6'>
            <CommonForm
            formControls={addProductFormElements}
            formData={formData}
            setFormData={setFormData}
            buttonText='Add'
            onSubmit={onSubmit}
            />
          </div>
        </SheetContent>
      </Sheet>
    </Fragment>
  );
}

export default AdminProducts