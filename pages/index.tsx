import type { NextPage } from 'next'
import PageContainer from "../components/general/PageContainer";
import {useCallback, useMemo, useState} from "react";
import TodoList from "../components/todo/TodoList";
import {TodoListItem} from "../types/TodoList";
import ExchangeAPI from "./api/exchangeAPI";
import {ExchangeRate} from "../types/exchange";
import CreateTaskForm from "../components/todo/CreateTaskForm";

const Home = ({rates}:{rates:ExchangeRate[]}) => {
  const [tasks,setTasks] = useState([] as TodoListItem[])
  const undoList = useMemo(()=>tasks.filter(t => !t.isDone),[tasks])
  const doneList = useMemo(()=>tasks.filter(t => t.isDone),[tasks])
  const toggleTaskStatus = useCallback((id:number)=>{
    setTasks((prevState)=>{
      const res = [...prevState]
      const index = res.findIndex(item => item.id===id)!
      if (index !== -1) {
        res.splice(index, 1, { ...res[index], isDone:  !res[index].isDone })
      }
      return res
    })
  },[])
  const createTask = useCallback((task:TodoListItem)=>{
        setTasks((list)=>{
          return list.concat(task)
        })
      }
  ,[])
  return <div>
    <PageContainer>
      <CreateTaskForm rates={rates} handleCreate={createTask} />
      <TodoList list={undoList} title={'计划：'} sumText={'将要花费：'} onToggle={toggleTaskStatus} />
      <TodoList list={doneList} title={'已完成：'} sumText={'一共花了：'} onToggle={toggleTaskStatus} />
    </PageContainer>
  </div>
}

export async function getServerSideProps() {
  const rates:ExchangeRate[] = (await Promise.all([
      ExchangeAPI.fetchForexRates(),
      // 理论上可以调一次接口，然后在前端计算，但是我懒
      ExchangeAPI.fetchForexRates('CNY','RUB,USD'),
      ExchangeAPI.fetchForexRates('RUB','CNY,USD')
  ])).flat()
  return {
    props: {
      rates
    },
  }
}

export default Home
