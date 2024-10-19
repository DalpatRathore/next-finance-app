import {create} from "zustand"

type UseOpenAccountProps ={
    id?:string;
    isOpen:boolean;
    onOpen:(id:string)=>void;
    onClose:()=>void;
}

 const useOpenAccount = create<UseOpenAccountProps>((set)=>({
    id:undefined,
    isOpen:false,
    onOpen:(id:string)=> set({isOpen:true, id}),
    onClose:()=> set({isOpen:false, id:undefined})
}))

export default useOpenAccount;