import React from 'react'
import ReactDOM from 'react-dom/client'
import './styles/index.css'
import '@radix-ui/themes/styles.css'
import './styles/overrides.css'
import { TableDemo } from './pages/TableDemo'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <TableDemo />
  </React.StrictMode>
)
