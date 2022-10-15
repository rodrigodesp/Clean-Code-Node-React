import { makeLogin } from '@/main/factories/pages/login/login-factory'
import { SignUp } from '@/presentation/pages'
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
        <Route path="/signup" element={<SignUp />} />
      </Routes>
    </BrowserRouter>
  )
}

export default Router
