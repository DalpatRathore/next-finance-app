import {create} from "zustand"

type UseOpenTransactionProps ={
    id?:string;
    isOpen:boolean;
    onOpen:(id:string)=>void;
    onClose:()=>void;
}

 const useOpenTransaction = create<UseOpenTransactionProps>((set)=>({
    id:undefined,
    isOpen:false,
    onOpen:(id:string)=> set({isOpen:true, id}),
    onClose:()=> set({isOpen:false, id:undefined})
}))

export default useOpenTransaction;