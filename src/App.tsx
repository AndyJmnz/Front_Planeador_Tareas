import './App.css'
import {Routes, Route} from 'react-router-dom'
import Login from './pages/login'
import Tasks from './pages/tasks'
import EditStatus from './pages/edit-status'
import EditTask from './pages/edit-task'
import AddTask from './pages/add-task'


function App() {
  
  return (
    <main>
    {/* <Form /> */}
    <Routes>
      <Route path='/' element={<Login/>}/>
      <Route path="/tasks" element={<Tasks />} />
      <Route path="/edit-task" element={<EditTask/>}/>
      <Route path='/edit-status' element={<EditStatus/>}/>
      <Route path="/add-task" element={<AddTask />} />
    </Routes>
    </main>
  )
}

export default App
