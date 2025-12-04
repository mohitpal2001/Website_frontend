
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Select, SelectContent, SelectValue,SelectTrigger } from "../ui/select";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";

function CommonForm({ formControls,formData ,setFormData , onSubmit, buttonText}) {

    function renderInputByComponentType(getcontrolitem){
  let element=null;
  const value = formData[getcontrolitem.name] || '';

   switch(getcontrolitem.commontype){
    case "input":
        element =<Input 
        name={getcontrolitem.name}
        placeholder={getcontrolitem.placeholder}
        type={getcontrolitem.type}
        id={getcontrolitem.id}
        value={value}
        onChange = {(e)=>setFormData({...formData,[getcontrolitem.name]:e.target.value})}
        />
        break;  
        case "select":
        element =(
        <Select 
        onValueChange = {(value)=>
            setFormData({
            ...formData,
            [getcontrolitem.name]:value
        })
        } 
         value={value}
         >
        <SelectTrigger className="w-full">
            <SelectValue placeholder={getcontrolitem.label} />
             </SelectTrigger>
            <SelectContent>
                {
                    getcontrolitem.options &&
                    getcontrolitem.options.length>0 ?
                    getcontrolitem.options.map(optionitem =><SelectItem key={optionitem.id} value={optionitem.id}>{optionitem.label}</SelectItem>) :null
                }
            </SelectContent>
       
       </Select>
        )
        break;  
        case "textarea":
        element =(
            <Textarea
                name={getcontrolitem.name} 
                placeholder={getcontrolitem.placeholder}
                id={getcontrolitem.id} 
                value={value}   
                onChange = {(e)=>setFormData({...formData,[getcontrolitem.name]:e.target.value})}
            />
        )
        break;  

    default:
        element=(
             element =<Input 
        name={getcontrolitem.name}
        placeholder={getcontrolitem.placeholder}
        type={getcontrolitem.type}
        id={getcontrolitem.name}
          value={value}
        onChange = {(e)=>setFormData({...formData,[getcontrolitem.name]:e.target.value})}
        />
        )
        break;
    }
    return element;
}
return (
    <form onSubmit={onSubmit}>
        <div className="flex flex-col gap-3">
{
    formControls.map(controlitem=><div className="grid w-full gap-1.5" key={controlitem.name}>
        <Label className="mb-1">{controlitem.label}</Label>{
            renderInputByComponentType(controlitem)
        }
    </div>)
}
        </div>
        <Button className='mt-2 w-full' type="submit">{buttonText||'Submit'}</Button>
    </form>
)
}

export default CommonForm;