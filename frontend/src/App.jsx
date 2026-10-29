import { Navigate, Route, Routes } from 'react-router-dom'
import Navbar from './components/Navbar'
import Sidebar from './components/Sidebar'
import AIPrediction from './pages/AIPrediction'
import Analytics from './pages/Analytics'
import Alerts from './pages/Alerts'
import Dashboard from './pages/Dashboard'
import MachineDetails from './pages/MachineDetails'
import Machines from './pages/Machines'
import Reports from './pages/Reports'
import Settings from './pages/Settings'

function App() {
  return (
    <div className="min-h-screen bg-[#07111f] text-slate-100">
      <Sidebar />
      <div className="min-h-screen lg:pl-64">
        <Navbar />
        <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/machines" element={<Machines />} />
            <Route path="/machines/:machineId" element={<MachineDetails />} />
            <Route path="/prediction" element={<AIPrediction />} />
            <Route path="/alerts" element={<Alerts />} />
            <Route path="/reports" element={<Reports />} />
            <Route path="/analytics" element={<Analytics />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
      </div>
    </div>
  )
}

export default App
