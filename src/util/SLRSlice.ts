const startDate = 1687284000000
const EndDate = 1691772300000


// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function SLRSlice(data:any){
    
    return data.slice(data.indexOf(startDate),data.indexOf(EndDate))
}