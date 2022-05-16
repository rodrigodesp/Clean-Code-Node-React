import { Login } from '@/presentation/pages'
import { Validation } from '@/presentation/protocols/validation'
import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

type SutTypes = {
  validationSpy: ValidationSpy
}

class ValidationSpy implements Validation {
  errorMessage: string
  input: object

  validate (input: object): string {
    this.input = input
    return this.errorMessage
  }
}

const validationSpy = new ValidationSpy()

const Router: React.FC = () => {
  return (
    <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login validation={validationSpy} />} />
        </Routes>
    </BrowserRouter>
  )
}

export default Router
