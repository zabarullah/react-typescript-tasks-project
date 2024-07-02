import React, {useState, useEffect} from "react";
import Form from "./form.component";
import List from "./list.component";
import { type Task } from "./types";

function loadTasks():Task[] {
  const storedTasks = localStorage.getItem('tasks');
  return storedTasks? JSON.parse(storedTasks) : [];
}

function updateStorage(tasks:Task[]):void {
  localStorage.setItem('tasks', JSON.stringify(tasks))
}

function TasksComponent() {
  const [tasks, setTasks] = useState<Task[]>(()=> loadTasks()) 
  
  const addTask = (task:Task):void => {
    setTasks([...tasks, task])
  }

  const toggleTask = ({id}: { id:string }) => {
    setTasks(tasks.map((task)=> {
      if(task.id=== id) {
        return{...task, isCompleted:!task.isCompleted} // invert the task isCompleted boolean
      }
      return task;
    }))
  }

  const toggleRemoveTask = ({ id }: { id: string }) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  useEffect(() => {
    updateStorage(tasks);
  },[tasks])

  return (
    <section>
        <Form addTask={addTask}/>
        <List tasks={tasks} toggleRemoveTask={toggleRemoveTask}/>
    </section>
  )
}
export default TasksComponent;