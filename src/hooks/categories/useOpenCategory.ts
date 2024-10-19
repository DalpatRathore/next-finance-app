import {create} from "zustand"

type UseOpenCategoryProps ={
    id?:string;
    isOpen:boolean;
    onOpen:(id:string)=>void;
    onClose:()=>void;
}

 const useOpenCategory = create<UseOpenCategoryProps>((set)=>({
    id:undefined,
    isOpen:false,
    onOpen:(id:string)=> set({isOpen:true, id}),
    onClose:()=> set({isOpen:false, id:undefined})
}))

export default useOpenCategory;