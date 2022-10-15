import { Footer, FormStatus, Header, Input } from '@/presentation/components/'
import FormContext from '@/presentation/context/form/form-context'
import React from 'react'
import { Link } from 'react-router-dom'
import Styles from './signup-styles.scss'

const SignUp: React.FC = () => {
  return (
    <div className={Styles.signup}>
      <Header />
      <FormContext.Provider value={{ state: {} }}>
        <form className={Styles.form}>
          <h2>Cadastre-se</h2>
          <Input type="text" name="name" placeholder="Digite seu nome" />
          <Input type="email" name="email" placeholder="Digite seu e-mail" />
          <Input
            type="password"
            name="password"
            placeholder="Digite sua senha"
          />
          <Input
            type="password"
            name="passwordConfirmation"
            placeholder="Repita sua senha"
          />
          <button className={Styles.submit} type="submit">
            Cadastrar
          </button>
          <Link to="/login" className={Styles.link}>
            Voltar para o Login
          </Link>
          <FormStatus />
        </form>
      </FormContext.Provider>
      <Footer />
    </div>
  )
}

export default SignUp
