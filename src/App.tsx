import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import About from './pages/About'

export default function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<About />} />
        <Route path="*" element={<About />} />
      </Routes>
    </>
  )
}
