import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import Tasks from './components/Tasks'
import AddTask from './components/AddTask'
import About from './components/About'
import TaskDetails from './components/TaskDetails'
import CompletedTasks from './components/CompletedTasks'


const App = () => {
  const [showAddTask, setShowAddTask] = useState(false)
  const [tasks, setTasks] = useState([])

  useEffect(() => {
    const getTasks = async () => {
      const tasksFromServer = await fetchTasks()
      setTasks(tasksFromServer)
    }

    getTasks()
  }, [])

  // Fetch Tasks
  const fetchTasks = async () => {
    const res = await fetch('http://localhost:5000/tasks')
    const data = await res.json()

    return data
  }

  // Fetch Task
  const fetchTask = async (id) => {
    const res = await fetch(`http://localhost:5000/tasks/${id}`)
    const data = await res.json()

    return data
  }


  // Add Task + add active status
  const addTask = async (task) => {
    const res = await fetch('http://localhost:5000/tasks', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      // fix
      body: JSON.stringify({ ...task, status: 'active' }),
    })

    const data = await res.json()

    setTasks([...tasks, data])
  }

  // Change to complete task
  const CompleteTask = async (id) => {
    const taskToComplete = await fetchTask(id);
    taskToComplete.status = 'complete';
    const res = await fetch(`http://localhost:5000/tasks/${id}`, {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(taskToComplete), 
    });
  
    if (res.status === 200) {
      setTasks(
        tasks.map((task) =>
          task.id === id ? { ...task, status: 'complete' } : task
        )
      );
    } else {
      alert('Error Completing This Task');
    }
  };

  // undo : change status to active
  const UndoTask = async (id) => {
    const taskToUndo = await fetchTask(id);
    taskToUndo.status = 'active';
    const res = await fetch(`http://localhost:5000/tasks/${id}`, {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(taskToUndo), 
    });
  
    if (res.status === 200) {
      setTasks(
        tasks.map((task) =>
          task.id === id ? { ...task, status: 'active' } : task
        )
      );
    } else {
      alert('Error Completing This Task');
    }
  };
  



  // Delete Task
  const deleteTask = async (id) => {
    const res = await fetch(`http://localhost:5000/tasks/${id}`, {
      method: 'DELETE',
    })
    //We should control the response status to decide if we will change the state or not.
    res.status === 200
      ? setTasks(tasks.filter((task) => task.id !== id))
      : alert('Error Deleting This Task')
  }

  // Toggle Reminder
  const toggleReminder = async (id) => {
    const taskToToggle = await fetchTask(id)
    const updTask = { ...taskToToggle, reminder: !taskToToggle.reminder }

    const res = await fetch(`http://localhost:5000/tasks/${id}`, {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(updTask),
    })

    const data = await res.json()

    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, reminder: data.reminder } : task
      )
    )
  }

  return (
    <Router>
      <div className='container'>
        <Header
          onAdd={() => setShowAddTask(!showAddTask)}
          showAdd={showAddTask}
        />
        <Routes>
          <Route
            path='/'
            element={
              <>
                {showAddTask && <AddTask onAdd={addTask} />}
                {tasks.length > 0 ? (
                  <Tasks
                    tasks={tasks.filter((task) => task.status === 'active')}
                    onDelete={CompleteTask}
                    onToggle={toggleReminder}
                  />
                ) : (
                  'No Tasks To Show'
                )}
              </>
            }
          />
          <Route path='/about' element={<About />} />
          <Route path='/task/:id' element={<TaskDetails />} />

          <Route path='/completed' 
            element={
            <>
              {tasks.length > 0 ? (
                <CompletedTasks
                tasks={tasks.filter((task) => task.status === 'complete')}
                  onUndo={UndoTask}
                  onDelete={deleteTask}
                  onToggle={toggleReminder}
                />
              ) : (
                'No Tasks To Show'
              )}
            </>
          }
          />
        </Routes>
        <Footer />
      </div>
    </Router>
  )
}

export default App
