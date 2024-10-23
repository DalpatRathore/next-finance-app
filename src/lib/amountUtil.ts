export const convertAmountFromMiliUnits= (amount:number) =>{
    return amount/1000;
}
export const convertAmountToMiliUnits= (amount:number) =>{
    return Math.round(amount*1000);
}

export const formatCurrency=(value:number)=>{
    return Intl.NumberFormat("en-US",{
        style:"currency",
        currency:"USD",
        minimumFractionDigits:2
    }).format(value)
}