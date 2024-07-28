"use client"
import React, { useState, useEffect } from 'react'

const Page = () => {
  const [task, setTask] = useState("")
  const [description, setDescription] = useState("")
  const [priority, setPriority] = useState("Normal")
  const [deadline, setDeadline] = useState("")
  const [mainTask, setMainTask] = useState([])
  const [editIndex, setEditIndex] = useState(null)

  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem('tasks'))
    if (storedTasks) {
      setMainTask(storedTasks)
    }
  }, [])

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(mainTask))
  }, [mainTask])

  const submitHandler = (e) => {
    e.preventDefault()
    if (editIndex !== null) {
      let copyTask = [...mainTask]
      copyTask[editIndex] = { task, description, priority, deadline, completed: copyTask[editIndex].completed }
      setMainTask(copyTask)
      setEditIndex(null)
    } else {
      setMainTask([...mainTask, { task, description, priority, deadline, completed: false }])
    }
    setTask("")
    setDescription("")
    setPriority("Normal")
    setDeadline("")
  }

  const deleteHandler = (i) => {
    let copyTask = [...mainTask]
    copyTask.splice(i, 1)
    setMainTask(copyTask)
  }

  const toggleCompletion = (i) => {
    let copyTask = [...mainTask]
    copyTask[i].completed = !copyTask[i].completed
    setMainTask(copyTask)
  }

  const editHandler = (i) => {
    setEditIndex(i)
    setTask(mainTask[i].task)
    setDescription(mainTask[i].description)
    setPriority(mainTask[i].priority)
    setDeadline(mainTask[i].deadline)
  }

  let renderTask = <h2>No Task Available</h2>

  if (mainTask.length > 0) {
    renderTask = mainTask.map((t, i) => {
      return (
        <li key={i} className={`flex items-center justify-between mb-8 ${t.priority === "High" ? 'bg-red-100' : ''} ${t.completed ? 'line-through' : ''}`}>
          <div className='flex items-center justify-between w-2/3'>
            <div>
              <h5 className='text-2xl font-semibold'>{t.task}</h5>
              <h6 className='text-lg font-medium'>{t.description}</h6>
              <p className='text-sm'>Priority: {t.priority}</p>
              <p className='text-sm'>Deadline: {t.deadline}</p>
            </div>
          </div>
          <button onClick={() => toggleCompletion(i)} className='bg-green-600 text-white px-4 py-2 rounded font-bold'>{t.completed ? 'Undo' : 'Complete'}</button>
          <button onClick={() => editHandler(i)} className='bg-blue-600 text-white px-4 py-2 rounded font-bold'>Edit</button>
          <button onClick={() => deleteHandler(i)} className='bg-red-600 text-white px-4 py-2 rounded font-bold'>Delete</button>
        </li>
      )
    })
  }

  return (
    <>
      <h1 className='bg-black text-white p-5 text-5xl font-bold text-center'>Ahmad's ToDo List</h1>
      <form onSubmit={submitHandler}>
        <input
          type='text'
          className='text-2xl border-zinc-800 border-2 mb-5 px-4 py-2'
          placeholder='Add a new task'
          value={task}
          onChange={(e) => setTask(e.target.value)}
        />
        <input
          type='text'
          className='text-2xl border-zinc-800 border-2 m-5 px-4 py-2'
          placeholder='Enter description here'
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <select
          className='text-2xl border-zinc-800 border-2 m-5 px-4 py-2'
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
        >
          <option value="Normal">Normal</option>
          <option value="High">High</option>
        </select>
        <input
          type='date'
          className='text-2xl border-zinc-800 border-2 m-5 px-4 py-2'
          value={deadline}
          onChange={(e) => setDeadline(e.target.value)}
        />
        <button className='bg-black text-white px-4 py-3 text-2xl font-bold rounded m-5'>Add Task</button>
      </form>
      <hr />
      <div className="p-8 bg-slate-200">
        <ul>
          {renderTask}
        </ul>
      </div>
    </>
  )
}

export default Page
