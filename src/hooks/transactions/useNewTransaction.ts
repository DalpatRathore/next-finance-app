import {create} from "zustand"

type UseNewTransactionProps ={
    isOpen:boolean;
    onOpen:()=>void;
    onClose:()=>void;
}

 const useNewTransaction = create<UseNewTransactionProps>((set)=>({
    isOpen:false,
    onOpen:()=> set({isOpen:true}),
    onClose:()=> set({isOpen:false})
}))

export default useNewTransaction;