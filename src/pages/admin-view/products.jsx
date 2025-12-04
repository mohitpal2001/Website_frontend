

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
import React, { Fragment, useState } from 'react'

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

function onSubmit(){

}


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
          <ProductImageUpload imageFile={imageFile} setimageFile={setImageFile}  uploadedImageUrl={uploadedImageUrl} setuploadedImageUrl={setuploadedImageUrl}/>
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