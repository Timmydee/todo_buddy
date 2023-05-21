import React, {useState} from 'react'
import { AiOutlineDelete } from 'react-icons/ai'

interface TodoItem {
  text: string;
  completed: boolean;
}

const App: React.FC = () => {
  const [task, setTask] = useState("")
  const [slide, setSlide] = useState<"ALL" | "ACTIVE" | "COMPLETED">("ALL")
  const [allTodo, setAllTodo] = useState<TodoItem[]>([])


  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    if(task.trim() !== ""){
      const updateTodo = [...allTodo, {text: task, completed: false}]
      setAllTodo(updateTodo)
      setTask("")
      alert(`Successfully created ${task}`)
    }
    event.preventDefault()  
  }

  const handleWork = (item : "ALL" | "ACTIVE" | "COMPLETED") => {
    setSlide(item)
  }

  const handleCheck = (i: number) => {
     const updatedCheck = [...allTodo]
     updatedCheck[i].completed = !updatedCheck[i].completed
     setAllTodo(updatedCheck)
  }

  const handleDelete = (i: number) => {
    const deleteTask = [...allTodo]
    deleteTask.splice(i, 1)
    setAllTodo(deleteTask)
  }

  const deleteAll = () => {
    const deleteAllTask = [...allTodo]
    deleteAllTask.splice(0, allTodo.length)
    setAllTodo(deleteAllTask)
  }

  const all = allTodo.map((todo, i) => {
    return (
      <div key={i} className='flex items-center justify-center gap-3'>
        <input 
          type='checkbox'
          checked={todo.completed}
          onChange={() => handleCheck(i)}
        />
        <div className={`${todo.completed ? "line-through" : "none"} w-[100%] h-8 my-2`}>
          <h1 className={` flex px-2`}>{todo.text}</h1>
        </div>
      </div>
    )
  })

  const active = allTodo.filter((todo) => !todo.completed)
    .map((item, i) => {
      return (
        <div key={i} className='flex items-center justify-center gap-3'>
          <input 
            type='checkbox'
            checked={item.completed}
            onChange={() => handleCheck(i)}
          />
          <div className={` w-[100%] h-8 my-2`}>
            <h1 className={` `}>{item.text}</h1>
          </div>
        </div>
      )
    })

    const completed = allTodo.filter((todo) => todo.completed)
        .map((item, i) => {
          return (
            <div>
              <div className='flex items-center justify-between w-[100%] gap-5'>
                <input 
                  type='checkbox'
                  checked={item.completed}
                  onChange={() => handleCheck(i)}
                />
                <div className={`w-[100%] h-8 my-2`}>   
                  <h1 className={` flex `}>{item.text}</h1>
                </div>
                <AiOutlineDelete onClick={() => handleDelete(i)} className='cursor-pointer text-3xl'/>
              </div>
            </div>
          )
        })    

  return (
    <div className='w-full p-4 bg-slate-200 h-[100vh]' >
      <div className=' w-[300px] lg:w-[1000px] mx-auto'>
        <div className='flex flex-col'>
          <h1 className='text-2xl lg:text-3xl text-blue-600 mb-8 mx-auto'>Todo Buddy</h1>

          <div className='flex gap-3 mb-5 mx-auto'>
            {["ALL", "ACTIVE", "COMPLETED"].map((item, i) => {
              return (
                <div onClick={() => handleWork(item as 'ALL' | 'ACTIVE' | 'COMPLETED')} className={`cursor-pointer ${slide === item ? "border-b-4 border-blue-600" : ''}`}>
                  <h6>{item}</h6>

                  
                </div>
              )
            })}
          </div>  
          <div>
            <div className='flex items-center justify-center w-[100%] '>
              <div className=''>
                {slide === "ALL" ? 
                  <div>
                    <form className='w-[320px] lg:w-[530px] flex gap-3 mx-auto' onSubmit={handleSubmit}>
                      <input 
                        type="text" 
                        placeholder='Add a todo' 
                        className='w-[100%] lg:w-[80%] h-12'
                        value={task}
                        onChange={(e) => setTask(e.target.value)}
                      />
                      <button type="submit" className='w-[20%] bg-green-400 h-12 rounded'>Add</button>
                    </form>
                    {all}

                  </div> 
                  : 
                  slide === "ACTIVE" 
                  ? 
                  <div className='w-[320px] lg:w-[530px]'>
                    <form className='w-[100%] flex gap-3 mx-auto' onSubmit={handleSubmit}>
                      <input 
                        type="text" 
                        placeholder='Add a todo' 
                        className='w-[100%] lg:w-[80%] h-12'
                        value={task}
                        onChange={(e) => setTask(e.target.value)}
                      />
                      <button type="submit" className='w-[20%] bg-green-400 h-12 rounded'>Add</button>
                    </form>
                    {active}
                  </div> 
                  : 
                  <div className='w-[320px] lg:w-[530px] fle items-center justify-center'>
                    {completed}
                    <div onClick={deleteAll} className='bg-red-400 w-20 h-8 flex items-center justify-center rounded cursor-pointer'>
                      <p>Delete all</p>
                    </div>
                  </div>
                }           
              </div>
            </div>
          </div>  
      </div>
    </div>
  </div>
  )
}

export default App