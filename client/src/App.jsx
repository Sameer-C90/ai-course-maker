import { Outlet } from 'react-router'
import Navbar from './components/Navbar'
import Footer from './components/Footer'

function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1 pt-16">
        <Outlet />
      </main>

      <Footer />
    </div>
  )
}

export default App
