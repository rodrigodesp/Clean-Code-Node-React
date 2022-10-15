import { makeLogin } from '@/main/factories/pages/login/login-factory'
import { makeSignUp } from '@/main/factories/pages/signup/signup-factory'
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
        <Route path="/signup" element={makeSignUp(children)} />
      </Routes>
    </BrowserRouter>
  )
}

export default Router
