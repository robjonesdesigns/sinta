import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Layout from './components/layout/Layout'
import Dashboard from './pages/Dashboard'
import Builder from './pages/Builder'
import Scheduling from './pages/Scheduling'
import Interview from './pages/Interview'
import Review from './pages/Review'
import Scorecard from './pages/Scorecard'
import Candidates from './pages/Candidates'
import DesignSystem from './pages/DesignSystem'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="builder" element={<Builder />} />
          <Route path="scheduling" element={<Scheduling />} />
          <Route path="interview" element={<Interview />} />
          <Route path="review" element={<Review />} />
          <Route path="scorecard" element={<Scorecard />} />
          <Route path="candidates" element={<Candidates />} />
          <Route path="design-system" element={<DesignSystem />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
