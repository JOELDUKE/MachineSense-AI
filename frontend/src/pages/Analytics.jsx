import EnergyChart from '../components/EnergyChart'

function Analytics() {
  return (
    <div>
      <div className="mb-5">
        <h2 className="text-2xl font-bold text-white">Analytics</h2>
        <p className="text-sm text-slate-400">Review temperature, vibration, current, and power.</p>
      </div>
      <EnergyChart />
    </div>
  )
}

export default Analytics
