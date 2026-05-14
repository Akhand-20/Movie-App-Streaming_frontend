import { useLocation } from 'react-router-dom'
import Navbar from './Navbar'

const Layout = ({ children }) => {
  const location = useLocation()
  const hideNavbar = location.pathname.startsWith('/watch')

  return (
    <div className="layout">
      {!hideNavbar && <Navbar />}
      <main className="main-content">
        {children}
      </main>
    </div>
  )
}

export default Layout