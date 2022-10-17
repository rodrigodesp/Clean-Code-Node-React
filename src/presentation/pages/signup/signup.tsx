import { AddAccount, SaveAccessToken } from '@/domain/usecases'
import { Footer, FormStatus, Header, Input } from '@/presentation/components/'
import SubmitButton from '@/presentation/components/submit-button/submit-button'
import FormContext from '@/presentation/context/form/form-context'
import { Validation } from '@/presentation/protocols/validation'
import React, { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import Styles from './signup-styles.scss'

type Props = {
  validation: Validation
  addAccount: AddAccount
  saveAccessToken: SaveAccessToken
}

const SignUp: React.FC<Props> = ({ validation, addAccount, saveAccessToken }: Props) => {
  const navigate = useNavigate()
  const [state, setState] = React.useState({
    isLoading: false,
    isFormInvalid: true,
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
    const nameError = validation.validate('name', state.name)
    const emailError = validation.validate('email', state.email)
    const passwordError = validation.validate('password', state.password)
    const passwordConfirmationError = validation.validate('passwordConfirmation', state.passwordConfirmation)
    setState({
      ...state,
      nameError,
      emailError,
      passwordError,
      passwordConfirmationError,
      // isFormInvalid: !!nameError || !!emailError || !!passwordError || !!passwordConfirmationError
      isFormInvalid: !!emailError || !!passwordError
    })
  }, [state.name, state.email, state.password, state.passwordConfirmation])

  const handleSubmit = async (
    event: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    event.preventDefault()
    // TODO: validar os parametros name e passwordConfirmation
    try {
      if (state.isLoading || state.isFormInvalid) {
        return
      }
      setState({ ...state, isLoading: true })
      const account = await addAccount.add({
        name: state.name,
        email: state.email,
        password: state.password,
        passwordConfirmation: state.passwordConfirmation
      })

      await saveAccessToken.save(account.accessToken)
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
    <div className={Styles.signup}>
      <Header />
      <FormContext.Provider value={{ state, setState }}>
        <form data-testid="form" className={Styles.form} onSubmit={handleSubmit}>
          <h2>Cadastre-se</h2>
          <Input type="text" name="name" placeholder="Digite seu nome" />
          <Input type="email" name="email" placeholder="Digite seu e-mail" />
          <Input type="password" name="password" placeholder="Digite sua senha"/>
          <Input type="password" name="passwordConfirmation" placeholder="Repita sua senha"/>
          <SubmitButton text="Cadastrar" />
          <Link data-testid="login-link" replace to="/login" className={Styles.link}>Voltar para o Login</Link>
          <FormStatus />
        </form>
      </FormContext.Provider>
      <Footer />
    </div>
  )
}

export default SignUp
