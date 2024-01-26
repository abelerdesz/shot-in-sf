import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import '@radix-ui/themes/styles.css'
import { TableDemo } from './pages/TableDemo'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <TableDemo />
  </React.StrictMode>
)
