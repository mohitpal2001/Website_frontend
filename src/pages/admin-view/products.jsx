

import CommonForm from '@/components/common/form';
import ProductImageUpload from '@/components/layout/admin-view/image-upload';
import ProductTile from '@/components/layout/admin-view/productTile';
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
import { addnewProduct, fetchProducts } from '@/store/admin/product-slice/index.js';
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
const [currentEditedId,setCurrentEditedId]=useState(null);

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
      <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-4 ">
     {
      products && products.length>0 ? products.map((product)=><ProductTile setopenCreateProductDialog={setopenCreateProductDialog} setFormData={setFormData}   setCurrentEditedId={setCurrentEditedId} product={product} />):
      <div className='flex justify-center items-center h-full'>
        <p className='text-center text-gray-500'>No products found</p>
      </div>
     }

      </div>
      <Sheet
        open={openCreateProductDialog}
        onOpenChange={() => {
          setopenCreateProductDialog(false);
          setFormData(initialFormData);
          setCurrentEditedId(null);
        }}
      >
        <SheetContent side="right" className="overflow-auto">
          <SheetHeader>
            <SheetTitle>{
             currentEditedId ? 'Edit Product' : 'Add New Product'
            }
            </SheetTitle>
          </SheetHeader>
          <ProductImageUpload imageFile={imageFile} setimageFile={setImageFile}  uploadedImageUrl={uploadedImageUrl} setuploadedImageUrl={setuploadedImageUrl} imageLoadingState={imageLoadingState} setimageLoadingState={setimageLoadingState} currentEditedId={currentEditedId}/>
          <div className='p-6'>
            <CommonForm
            formControls={addProductFormElements}
            formData={formData}
            setFormData={setFormData}
            buttonText={currentEditedId ? 'Edit' : 'Add'}
            onSubmit={onSubmit}
            />
          </div>
        </SheetContent>
      </Sheet>
    </Fragment>
  );
}

export default AdminProducts