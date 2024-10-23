export const convertAmountFromMiliUnits= (amount:number) =>{
    return amount/1000;

}
export const convertAmountToMiliUnits= (amount:number) =>{
    return Math.round(amount*1000);

}