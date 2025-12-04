import { Input } from "@/components/ui/input";
import { useRef } from "react";
import { Label } from "@/components/ui/label";
import { UploadCloudIcon } from "lucide-react";

function ProductImageUpload({imageFile,setimageFile,uploadedImageUrl,setuploadedImageUrl}){

    const inputRef = useRef(null)
    
  function handleImageFileChange(e){
   console.log(e.target.files[0]);
   const selectedfile = e.target.files?.[0];
   if(selectedfile){setimageFile(selectedfile)};
  }

  function handleDragOver(e){
   e.preventDefault();

  }

  function handleDrop(e){
    e.preventDefault();
    const droppedFile = e.dataTransfer.files?.[0];
    if(droppedFile)setimageFile(droppedFile);

  }

    return (
        <div className="w-full max-w-md mx-auto mt-4 p-4">
            <Label className="text-lg font-semibold mb-2 block ">Upload Image</Label>
            <div onDragOver={handleDragOver} onDrop={handleDrop} className="border-2 border-dashed rounded-lg p-4">
                <Input id="image-upload" type="file" className="hidden" ref={inputRef} onChange={handleImageFileChange}/>
                {!imageFile ? <Label htmlFor="image-upload" className="flex flex-col items-center justify-center h-32 cursor-pointer">
                    <UploadCloudIcon className="w-10 h-10 text-muted-foreground mb-2"/>
                    <span>Drag & drop or click to upload image </span>
                </Label>: <div></div>}
            </div>
        </div>
    )
}


export default ProductImageUpload;