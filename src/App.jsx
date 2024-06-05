import { Routes, Route, Navigate } from 'react-router-dom'
import './App.css'
import Login from './components/pages/Login'
import Home from './components/pages/Home'

const PrivateRoute = ({ children }) => {
  const user = '' // to be implemented
  if (!user) return <Navigate to={'/login'} />
  return <>{children}</>;
}

const PublicRoute = ({ children }) => {
  const user = '' // to be implemented
  if (user) return <Navigate to={'/'} />
  return <>{children}</>;
}

function App() {

  return (
    <>
      <Routes>
        <Route path='/login' element={
          <PublicRoute>
            <Login />
          </PublicRoute>
        } />

        <Route path='/' element={
          <PrivateRoute>
            <Home />
          </PrivateRoute>
        } />
      </Routes>
    </>
  )
}

export default App
