import { Footer, FormStatus, Header, Input } from '@/presentation/components/'
import Context from '@/presentation/components/context/form-context'
import React, { useState } from 'react'
import Styles from './login-styles.scss'

const Login: React.FC = () => {
  const [state] = useState({
    isLoading: false
  })

  const [errorState] = useState({
    email: 'Campo Obrigatório',
    password: 'Campo Obrigatório',
    main: ''
  })
  return (
    <div className={Styles.login}>
        <Header />
        <Context.Provider value={ { state, errorState }}>
          <form className={Styles.form}>
              <h2>Login</h2>
              <Input type="email" name="email" placeholder='Digite seu e-mail'/>
              <Input type="password" name="password" placeholder='Digite sua senha' />
              <button data-testid={'submit'} className={Styles.submit} disabled type='submit'>Entrar</button>
              <span className={Styles.link}>Criar Conta</span>
              <FormStatus/>
          </form>
        </Context.Provider>
        <Footer />
    </div>
  )
}

export default Login
