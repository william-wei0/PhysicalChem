import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles/global.css'
import routes from './app/router.tsx'
import { createBrowserRouter, RouterProvider } from 'react-router'

const router = createBrowserRouter(routes)

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router}/>
  </StrictMode>,
)
