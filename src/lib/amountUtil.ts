import { eachDayOfInterval, isSameDay } from "date-fns";

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

export const calculatePercentChange =(current:number, previous:number)=>{
    // console.log(((current-previous)/previous)*100)
    if(previous === 0){
        return previous===current ?0 :100;
    }

    return ((current-previous)/previous)*100

}

export const fillMissingDays = (activeDays:{
    date:Date,
    income:number;
    expenses:number;
}[],startDate:Date, endDate:Date)=>{
    if(activeDays.length ===0) return [];

    const allDays = eachDayOfInterval({
        start:startDate,
        end:endDate
    });
    const transactionsByDay = allDays.map((day)=>{
        const found = activeDays.find(d => isSameDay(d.date, day));

        if(found){
            return found;
        }
        else{
            return{
                date:day,
                income:0,
                expenses:0
            }
        }
    })
    return transactionsByDay

}

export const formatPercentage =(value:number, options:{addPrefix?:boolean}={addPrefix:false})=>{
    const result = new Intl.NumberFormat("en-US",{
        style:"percent",
    }).format(value/100)
    if(options.addPrefix && value>0){
        return `+${result}`
    }
    return result;
}