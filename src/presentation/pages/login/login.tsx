import { Footer, FormStatus, Header, Input } from '@/presentation/components/'
import Context from '@/presentation/components/context/form-context'
import { Validation } from '@/presentation/protocols/validation'
import React, { useEffect, useState } from 'react'
import Styles from './login-styles.scss'

type Props = {
  validation: Validation
}

const Login: React.FC<Props> = ({ validation }: Props) => {
  const [state, setState] = useState({
    isLoading: false,
    email: '',
    password: '',
    emailError: '',
    passwordError: '',
    mainError: ''
  })
  useEffect(() => {
    setState({
      ...state,
      emailError: validation.validate('email', state.email),
      passwordError: validation.validate('password', state.password)
    })
  }, [state.email, state.password])

  return (
    <div className={Styles.login}>
        <Header />
        <Context.Provider value={ { state, setState }}>
          <form className={Styles.form}>
              <h2>Login</h2>
              <Input type="email" name="email" placeholder='Digite seu e-mail'/>
              <Input type="password" name="password" placeholder='Digite sua senha' />
              <button data-testid={'submit'} className={Styles.submit} disabled={!!state.emailError || !!state.passwordError} type='submit'>Entrar</button>
              <span className={Styles.link}>Criar Conta</span>
              <FormStatus/>
          </form>
        </Context.Provider>
        <Footer />
    </div>
  )
}

export default Login
