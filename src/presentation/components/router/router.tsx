import { makeLogin } from '@/main/factories/pages/login/login-factory'
import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

type Props = {
  children?: React.ReactNode
}

const Router: React.FC<Props> = ({ children }) => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={makeLogin(children)} />
      </Routes>
    </BrowserRouter>
  )
}

export default Router
