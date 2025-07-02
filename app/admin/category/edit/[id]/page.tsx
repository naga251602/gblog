import { EditCategoryForm } from "@/components/Forms/EditCategoryForm";
import { NavBar } from "@/components/Headers/NavBar";

export default function EditCategory(props:any){
    return <>
    <NavBar/>
    <EditCategoryForm id={props.params.id} />
    </>
}