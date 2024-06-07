import { Routes, Route, Navigate } from 'react-router-dom'
import './App.css'
import Login from './components/pages/Login'
import Home from './components/pages/Home'
import API from './utils/api'
import Layout from './components/pages/Layout'

const PrivateRoute = ({ children }) => {
  const user = 'e' // to be implemented
  if (!user) return <Navigate to={'/login'} />
  return <>{children}</>;
}

const PublicRoute = ({ children }) => {
  const user = '' // to be implemented
  if (user) return <Navigate to={'/'} />
  return <>{children}</>;
}

function App() {
  console.log(API.url)
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
            <Layout>
              <Home />
            </Layout>
          </PrivateRoute>
        } />

        {/* <Route path='/a' element={
          <PrivateRoute>
            <Layout />
          </PrivateRoute>
        } /> */}
      </Routes>
    </>
  )
}

export default App
