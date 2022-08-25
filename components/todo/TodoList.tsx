import {CostCurrency, TodoListItem} from "../../types/TodoList";
import styled from "styled-components";
import {EnableSymbols, ExchangeRateSymbol} from "../../constans/ExchangeRateConst";

const ListWrap = styled.div`
  margin-bottom: 36px;
  margin-top: 12px;
  .item {
    width: 100%;
    display: flex;
    height: 48px;
    background: lightgray;
    border: 1px solid darkcyan;
    align-items: center;

    > div {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .cost{
      width: 128px;
    }

    .title {
      flex: 1;
    }
    .done{
      text-decoration: line-through;
    }
  }
  .sum{
    border: none;
    background: transparent;
  }
`

const TodoList = (
    props: {
        list: Array<TodoListItem>,
        title: string,
        sumText: string,
        onToggle: Function
    }
) => {
    const symbols = EnableSymbols
    const sum: CostCurrency[] = symbols.map(c => ({
        currency: c,
        value: 0
    }))
    // 可以把props.list的两个循环合并，不过可读性会差点
    props.list.forEach((item) => {
        symbols.forEach(s => sum.find(c => c.currency === s)!.value += item.costs.find(c => c.currency === s)!.value)
    })
    sum.sort((a,b) => a.currency.localeCompare(b.currency))
    return <ListWrap>
        <div>{props.title}</div>
        {props.list.map(item => <div className={'item'} key={item.id}>
            <div className={'title'}>
                <input
                    onClick={()=>{props.onToggle(item.id)}}
                    type={"checkbox"} readOnly={true} checked={item.isDone}/>
                <span className={item.isDone ? 'done' : ''}>{item.taskTitle}</span>
            </div>
            {item.costs.map(c =>
                <div title={c.value.toString()} className={'cost'} key={c.currency}>{ExchangeRateSymbol[c.currency]}{c.value}</div>
            )}
        </div>)}
        <div className={'item sum'}>
            <div className={'title'}>{props.sumText}</div>
            {sum.map(c =>
                <div title={c.value.toString()} className={'cost'} key={c.currency}>{ExchangeRateSymbol[c.currency]}{c.value}</div>
            )}
        </div>
    </ListWrap>
}

export default TodoList
