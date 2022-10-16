import { Footer, FormStatus, Header, Input } from '@/presentation/components/'
import FormContext from '@/presentation/context/form/form-context'
import { Validation } from '@/presentation/protocols/validation'
import React, { useEffect } from 'react'
import Styles from './signup-styles.scss'

type Props = {
  validation: Validation
}

const SignUp: React.FC<Props> = ({ validation }: Props) => {
  const [state, setState] = React.useState({
    isLoading: false,
    name: '',
    email: '',
    password: '',
    passwordConfirmation: '',
    nameError: '',
    mainError: '',
    emailError: '',
    passwordError: '',
    passwordConfirmationError: ''
  })

  useEffect(() => {
    setState({
      ...state,
      nameError: validation.validate('name', state.name),
      emailError: validation.validate('name', state.email),
      passwordError: validation.validate('name', state.password),
      passwordConfirmationError: validation.validate('passwordConfirmation', state.passwordConfirmation)
    })
  }, [state.name, state.email, state.password, state.passwordConfirmation])

  return (
    <div className={Styles.signup}>
      <Header />
      <FormContext.Provider value={{ state, setState }}>
        <form className={Styles.form}>
          <h2>Cadastre-se</h2>
          <Input type="text" name="name" placeholder="Digite seu nome" />
          <Input type="email" name="email" placeholder="Digite seu e-mail" />
          <Input type="password" name="password" placeholder="Digite sua senha"/>
          <Input type="password" name="passwordConfirmation" placeholder="Repita sua senha"/>
          <button data-testid="submit" className={Styles.submit} disabled={!!state.nameError || !!state.emailError || !!state.passwordError || !!state.passwordConfirmationError} type="submit">
            Cadastrar
          </button>
          <span className={Styles.link}>Voltar para o Login</span>
          <FormStatus />
        </form>
      </FormContext.Provider>
      <Footer />
    </div>
  )
}

export default SignUp
