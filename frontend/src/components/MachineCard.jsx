import { ArrowRight, Cpu } from 'lucide-react'
import { Link } from 'react-router-dom'

function MachineCard({ machine }) {
  const isHealthy = machine.status === 'Healthy'

  return (
    <Link
      to={`/machines/${machine.id}`}
      className="block rounded-lg border border-cyan-400/10 bg-[#0d1a2d] p-5 shadow-xl shadow-black/20 transition hover:-translate-y-0.5 hover:border-cyan-300/30 hover:bg-[#10213a] focus:outline-none focus:ring-2 focus:ring-cyan-300/40"
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <h3 className="font-semibold text-white">{machine.name}</h3>
          <p className="mt-1 flex items-center gap-1 text-xs text-slate-400">
            <Cpu size={13} aria-hidden="true" />
            {machine.code}
          </p>
          <p
            className={`mt-1 text-sm font-medium ${
              isHealthy ? 'text-lime-300' : 'text-amber-300'
            }`}
          >
            {machine.status}
          </p>
        </div>
        <span className="text-2xl font-bold text-white">{machine.health}%</span>
      </div>

      <div className="mt-4 h-2 rounded-full bg-slate-800">
        <div
          className={`h-2 rounded-full ${
            isHealthy
              ? 'bg-lime-400 shadow-[0_0_12px_rgba(163,230,53,0.75)]'
              : 'bg-amber-300 shadow-[0_0_12px_rgba(252,211,77,0.7)]'
          }`}
          style={{ width: `${machine.health}%` }}
        />
      </div>

      <div className="mt-4 grid grid-cols-3 gap-3 text-sm">
        <div>
          <p className="text-slate-500">Temp</p>
          <p className="font-semibold text-cyan-200">{machine.temperature} °C</p>
        </div>
        <div>
          <p className="text-slate-500">Vibe</p>
          <p className="font-semibold text-violet-200">{machine.vibration} g RMS</p>
        </div>
        <div>
          <p className="text-slate-500">Power</p>
          <p className="font-semibold text-amber-200">{machine.power} kW</p>
        </div>
      </div>
      <div className="mt-4 flex items-center justify-between border-t border-cyan-400/10 pt-3 text-sm text-cyan-200">
        <span>{machine.location}</span>
        <ArrowRight size={16} aria-hidden="true" />
      </div>
    </Link>
  )
}

export default MachineCard
