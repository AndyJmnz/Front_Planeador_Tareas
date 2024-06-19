import './App.css'
import {Routes, Route} from 'react-router-dom'
import Login from './pages/login'
import Tasks from './pages/tasks'


function App() {
  
  return (
    <main>
    {/* <Form /> */}
    <Routes>
      <Route path='/' element={<Login/>}/>
      <Route path="/tasks" element={<Tasks />} />
    </Routes>
    </main>
  )
}

export default App
