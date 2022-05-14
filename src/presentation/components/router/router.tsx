import { Login } from '@/presentation/pages'
import '@/presentation/styles/global.scss'
import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

const Router: React.FC = () => {
  return (
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<Login/>} />
        </Routes>
    </BrowserRouter>
  )
}

export default Router
