import { Authentication } from '@/domain/usecases/authentication'
import { Footer, FormStatus, Header, Input } from '@/presentation/components/'
import FormContext from '@/presentation/context/form/form-context'
import { Validation } from '@/presentation/protocols/validation'
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Styles from './login-styles.scss'

type Props = {
  validation: Validation
  authentication: Authentication
}

const Login: React.FC<Props> = ({ validation, authentication }: Props) => {
  const navigate = useNavigate()
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

  const handleSubmit = async (
    event: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    event.preventDefault()
    try {
      if (state.isLoading || state.emailError || state.passwordError) {
        return
      }
      setState({ ...state, isLoading: true })
      const account = await authentication.auth({
        email: state.email,
        password: state.password
      })
      localStorage.setItem('accessToken', account.accessToken)
      navigate('/')
    } catch (error) {
      setState({
        ...state,
        isLoading: false,
        mainError: error.message
      })
    }
  }

  return (
    <div className={Styles.login}>
      <Header />
      <FormContext.Provider value={{ state, setState }}>
        <form
          data-testid="form"
          className={Styles.form}
          onSubmit={handleSubmit}
        >
          <h2>Login</h2>
          <Input type="email" name="email" placeholder="Digite seu e-mail" />
          <Input
            type="password"
            name="password"
            placeholder="Digite sua senha"
          />
          <button
            data-testid="submit"
            className={Styles.submit}
            disabled={!!state.emailError || !!state.passwordError}
            type="submit"
          >
            Entrar
          </button>
          <Link data-testid="signup" to="/signup" className={Styles.link}>
            Criar Conta
          </Link>
          <FormStatus />
        </form>
      </FormContext.Provider>
      <Footer />
    </div>
  )
}

export default Login
