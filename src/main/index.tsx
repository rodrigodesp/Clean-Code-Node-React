import { Router } from '@/presentation/components'
import React from 'react'
import { createRoot } from 'react-dom/client'

const container = document.getElementById('main')
const root = createRoot(container)
root.render(<Router />)
