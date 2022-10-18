export const calculateBmi =  (height, weight)=>{
    return (weight/(height**2)).toFixed(2);
}