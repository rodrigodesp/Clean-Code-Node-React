import { Spinner } from '@/presentation/components/'
import Context from '@/presentation/components/context/form-context'
import React, { useContext } from 'react'
import Styles from './form-status-styles.scss'

const FormStatus: React.FC = () => {
  const { isLoading, errorMessage } = useContext(Context)
  return (
    <div data-testId='error-wrap' className={Styles.errorWrap}>
        {isLoading && <Spinner className={Styles.spinner}/>}
        {errorMessage && <span className={Styles.error}>Erro</span>}
    </div>
  )
}

export default FormStatus
