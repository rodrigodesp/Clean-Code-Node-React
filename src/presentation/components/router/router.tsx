import { Login } from '@/presentation/pages'
import { Validation } from '@/presentation/protocols/validation'
import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

type SutTypes = {
  validationStub: ValidationStub
}

class ValidationStub implements Validation {
  errorMessage: string
  fieldName: string
  fieldValue: string

  validate (fieldName: string, fieldValue: string): string {
    this.fieldName = fieldName
    this.fieldValue = fieldValue
    return this.errorMessage
  }
}

const validationStub = new ValidationStub()

const Router: React.FC = () => {
  return (
    <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login validation={validationStub} />} />
        </Routes>
    </BrowserRouter>
  )
}

export default Router
