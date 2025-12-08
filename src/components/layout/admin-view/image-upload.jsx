import { Input } from "@/components/ui/input";
import { useEffect, useRef } from "react";
import { Label } from "@/components/ui/label";
import { UploadCloudIcon,XIcon,FileIcon } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import axios from "axios";

function ProductImageUpload({
  imageFile,
  setimageFile,
  uploadedImageUrl,
  setuploadedImageUrl,
  imageLoadingState,
setimageLoadingState,
    
}) {
  const inputRef = useRef(null);

  function handleImageFileChange(e) {
    console.log(e.target.files[0]);
    const selectedfile = e.target.files?.[0];
    if (selectedfile) {
      setimageFile(selectedfile);
    }
  }

  function handleDragOver(e) {
    e.preventDefault();
  }

  function handleDrop(e) {
    e.preventDefault();
    const droppedFile = e.dataTransfer.files?.[0];
    if (droppedFile) setimageFile(droppedFile);
  }

  function handleRemoveImage() {
    setimageFile(null);
    if(inputRef.current){
        inputRef.current.value = null;
    }
  }

  async function uploadImageToServer() {
    setimageLoadingState(true);
    if(!imageFile) return;
    const fordata = new FormData();
    fordata.append('my_file',imageFile);
    const response = await axios.post('http://localhost:5000/api/admin/products/upload-image',fordata,{
        headers:{
            'Content-Type':'multipart/form-data'    
        }
    });
    console.log(response);
    if(response?.data?.status){
        setuploadedImageUrl(response?.data?.imageUrl);
        setimageLoadingState(false);
    }
  }
  
    useEffect(()=>{
     if(imageFile){
        uploadImageToServer();
     }
    },[imageFile])

  return (
    <div className="w-full max-w-md mx-auto mt-4 p-4">
      <Label className="text-lg font-semibold mb-2 block ">Upload Image</Label>
      <div
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        className="border-2 border-dashed rounded-lg p-4"
      >
        <Input
          id="image-upload"
          type="file"
          className="hidden"
          ref={inputRef}
          onChange={handleImageFileChange}
        />
        {!imageFile ? (
          <Label
            htmlFor="image-upload"
            className="flex flex-col items-center justify-center h-32 cursor-pointer"
          >
            <UploadCloudIcon className="w-10 h-10 text-muted-foreground mb-2" />
            <span>Drag & drop or click to upload image </span>
          </Label>
        ) : imageLoadingState ? (
          <Skeleton className="h-10 bg-gray-100" />
        ) : (
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <FileIcon className="w-8 text-primary mr-2 h-8" />
            </div>
            <p className="text-sm font-medium">{imageFile.name}</p>
            <Button
              variant="ghost"
              size="icon"
              className="text-muted-foreground hover:text-foreground"
              onClick={handleRemoveImage}
            >
              <XIcon className="w-4 h-4" />
              <span className="sr-only">Remove File</span>
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}

export default ProductImageUpload;
