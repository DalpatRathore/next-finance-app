import {create} from "zustand"

type UseNewAccountProps ={
    isOpen:boolean;
    onOpen:()=>void;
    onClose:()=>void;
}

 const useNewAccount = create<UseNewAccountProps>((set)=>({
    isOpen:false,
    onOpen:()=> set({isOpen:true}),
    onClose:()=> set({isOpen:false})
}))

export default useNewAccount;