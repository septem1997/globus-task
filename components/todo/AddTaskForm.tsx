import styled from "styled-components";
import {useCallback, useState} from "react";
import {CostCurrency, TodoListItem} from "../../types/TodoList";
import {EnableSymbols, ExchangeRateLabel, ExchangeRateSymbol} from "../../constans/ExchangeRateConst";
import {ExchangeRate} from "../../types/exchange";

const FormWrap = styled.div`
  display: flex;
  width: 100%;
  margin-bottom: 12px;

  input, select, button {
    margin-right: 8px;
  }

  .submit {
    width: 62px;
  }
`
const RateInfo = styled.div`
  display: flex;
  flex-direction: row-reverse;

  > div {
    margin: 0 18px;
  }
`
const AddTaskForm = (props: {
    rates: ExchangeRate[],
    handleCreate: Function
}) => {
    const [taskName, setTaskName] = useState('')
    const [cost, setCost] = useState(0)
    const [currency, setCurrency] = useState(EnableSymbols[0])
    const createTask = useCallback(() => {
        if (taskName.trim().length === 0) {
            alert('请填写任务')
            return
        }
        const costs: CostCurrency[] = [{
            currency: currency,
            value: cost,
        }]
        EnableSymbols.forEach(s => {
            if (s !== currency) {
                const targetRate = props.rates.find(r => r.base===currency&&r.target===s)!.rate
                costs.push({
                    currency: s,
                    value: Number((cost*targetRate).toFixed(5)),
                })
            }
        })
        const task: TodoListItem = {
            isDone: false,
            id: Date.now(),
            taskTitle: taskName,
            costs: costs.sort((a,b) => a.currency.localeCompare(b.currency))
        }
        props.handleCreate(task)
        setTaskName('')
        setCost(0)
    },[cost, currency, props, taskName])
    return <div>
        <FormWrap>
            <input value={taskName} onInput={e => setTaskName(e.currentTarget.value)} placeholder={'任务'}
                   className={'title'}/>
            <input value={cost} onInput={e => setCost(Number(e.currentTarget.value))} placeholder={'价格'}
                   className={'cost'}/>
            <select
                value={currency}
                onChange={e => setCurrency(e.currentTarget.value)}
                placeholder={'货币类型'}>
                {EnableSymbols.map(s =>
                    <option key={s} value={s}>{ExchangeRateLabel[s]}</option>
                )}
            </select>
            <button className={'submit'} onClick={createTask}>添加</button>
        </FormWrap>
        <RateInfo>
            {props.rates.map((r, i) =>
                <div key={i}>{r.rate}&nbsp;{ExchangeRateSymbol[r.target]}/{ExchangeRateSymbol[r.base]}</div>
            )}
        </RateInfo>
    </div>
}

export default AddTaskForm
