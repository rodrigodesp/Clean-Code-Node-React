import Logo from '@/presentation/components/logo/logo'
import React, { memo } from 'react'
import Styles from './login-header-style.scss'

const LoginHeader: React.FC = () => {
  return (
    <header className={Styles.header}>
        <Logo />
        <h1>4Dev - Enquetes para programadores</h1>
    </header>
  )
}

export default memo(LoginHeader)
