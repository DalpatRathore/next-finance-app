import {create} from "zustand"

type UseNewCategoryProps ={
    isOpen:boolean;
    onOpen:()=>void;
    onClose:()=>void;
}

 const useNewCategory = create<UseNewCategoryProps>((set)=>({
    isOpen:false,
    onOpen:()=> set({isOpen:true}),
    onClose:()=> set({isOpen:false})
}))

export default useNewCategory;