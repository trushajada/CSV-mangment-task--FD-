
import './App.css'
import TaskForm from './Componets/TaskForm/TaskForm';
import TaskList from './Componets/TaskList/TaskList';
import { TaskProvider } from './context/TaskContext/TaskContext';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {

  return (
    <>
    <TaskProvider>
        <Routes>
          <Route path="/list" element={<TaskList />} />
          <Route path="/" element={<TaskForm />} />
        </Routes>
    </TaskProvider>
    </>
  )
}

export default App
