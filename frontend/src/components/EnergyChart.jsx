import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import { energyReadings } from '../data/dummyData'

function EnergyChart() {
  return (
    <section className="rounded-lg border border-cyan-400/10 bg-[#0d1a2d] p-5 shadow-xl shadow-black/20">
      <div className="mb-5 flex items-center justify-between gap-3">
        <div>
          <h3 className="text-lg font-semibold text-white">Live Metrics</h3>
          <p className="text-sm text-slate-400">Temperature, vibration, current, and power</p>
        </div>
        <span className="rounded-md border border-lime-400/20 bg-lime-400/10 px-3 py-1 text-sm font-medium text-lime-200">
          Today
        </span>
      </div>

      <div className="h-72">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={energyReadings} margin={{ left: -20, right: 12 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#1e3a4c" />
            <XAxis dataKey="time" stroke="#94a3b8" tickLine={false} />
            <YAxis stroke="#94a3b8" tickLine={false} />
            <Tooltip
              contentStyle={{
                background: '#08111f',
                border: '1px solid rgba(34, 211, 238, 0.18)',
                borderRadius: '8px',
                color: '#e5edf6',
              }}
            />
            <Line
              type="monotone"
              dataKey="temperature"
              stroke="#22d3ee"
              strokeWidth={3}
              dot={{ fill: '#22d3ee', r: 4 }}
            />
            <Line
              type="monotone"
              dataKey="vibration"
              stroke="#a78bfa"
              strokeWidth={3}
              dot={{ fill: '#a78bfa', r: 4 }}
            />
            <Line
              type="monotone"
              dataKey="current"
              stroke="#bef264"
              strokeWidth={3}
              dot={{ fill: '#bef264', r: 4 }}
            />
            <Line
              type="monotone"
              dataKey="power"
              stroke="#facc15"
              strokeWidth={3}
              dot={{ fill: '#facc15', r: 4 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-4 flex flex-wrap gap-3 text-xs font-medium text-slate-300">
        <span className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-cyan-300" /> Temperature
        </span>
        <span className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-violet-300" /> Vibration
        </span>
        <span className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-lime-300" /> Current
        </span>
        <span className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-yellow-300" /> Power
        </span>
      </div>
    </section>
  )
}

export default EnergyChart
