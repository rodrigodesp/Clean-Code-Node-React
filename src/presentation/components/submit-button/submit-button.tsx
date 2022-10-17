import Context from '@/presentation/context/form/form-context'
import React, { useContext } from 'react'
import Styles from './submit-button-styles.scss'

type Props = {
  text: string
}

const SubmitButton: React.FC<Props> = ({ text }: Props) => {
  const { state } = useContext(Context)
  return (
    <button data-testid="submit" className={Styles.submit} disabled={state.isFormInvalid} type="submit">{ text }</button>
  )
}
export default SubmitButton
