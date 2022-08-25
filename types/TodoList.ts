export interface CostCurrency {
    currency:string,
    value:number
}
export interface TodoListItem{
    id:number
    taskTitle:string
    isDone:boolean
    costs:Array<CostCurrency>
}
