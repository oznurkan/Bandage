import './App.css'
import { Routes, Route, Navigate } from 'react-router-dom';
import HomePage from './pages/HomePage'
import MainLayout from './layout/MainLayout';

function App() {

  return (
    <>
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Navigate to="/home" replace />} />
        <Route path="home" element={<HomePage />} />
      </Route>
    </Routes>
    </>
  )
}

export default App
