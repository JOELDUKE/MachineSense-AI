import {
  Activity,
  AlertTriangle,
  ArrowLeft,
  BrainCircuit,
  CalendarDays,
  CheckCircle2,
  Clock,
  Cpu,
  Factory,
  Gauge,
  QrCode,
  Thermometer,
  Wrench,
  Zap,
} from 'lucide-react'
import { Link, Navigate, useParams } from 'react-router-dom'
import {
  aiRecommendations,
  energyReadings,
  machineHistory,
  machines,
  sensorSparks,
} from '../data/dummyData'
import {
  Area,
  AreaChart,
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from 'recharts'

const panelClass = 'rounded-lg border border-cyan-400/10 bg-[#071624] shadow-xl shadow-black/20'

function DetailMetric({ icon: Icon, label, value, tone }) {
  return (
    <section className={`${panelClass} p-4`}>
      <div className="flex items-center gap-4">
        <div className={`grid h-12 w-12 place-items-center rounded-md border ${tone}`}>
          <Icon size={24} aria-hidden="true" />
        </div>
        <div>
          <p className="text-sm text-slate-400">{label}</p>
          <p className="text-2xl font-bold text-white">{value}</p>
        </div>
      </div>
    </section>
  )
}

function MachineDetails() {
  const { machineId } = useParams()
  const machine = machines.find((item) => String(item.id) === machineId)

  if (!machine) {
    return <Navigate to="/machines" replace />
  }

  const prediction = machine.prediction

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
        <div>
          <Link to="/machines" className="mb-3 inline-flex items-center gap-2 text-sm text-cyan-200">
            <ArrowLeft size={16} aria-hidden="true" />
            Machines
          </Link>
          <h1 className="text-3xl font-bold text-white">{machine.name}</h1>
          <p className="mt-1 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-slate-400">
            <span className="flex items-center gap-2">
              <Cpu size={16} aria-hidden="true" />
              {machine.code}
            </span>
            <span className="flex items-center gap-2">
              <Factory size={16} aria-hidden="true" />
              {machine.location}
            </span>
          </p>
        </div>
        <span
          className={`w-fit rounded-md border px-3 py-2 text-sm font-semibold ${
            machine.status === 'Healthy'
              ? 'border-lime-400/20 bg-lime-400/10 text-lime-300'
              : 'border-amber-300/20 bg-amber-300/10 text-amber-200'
          }`}
        >
          {machine.status}
        </span>
      </div>

      <section className="grid gap-3 md:grid-cols-2 xl:grid-cols-5">
        <DetailMetric
          icon={Gauge}
          label="Health Score"
          value={`${machine.health}%`}
          tone="border-lime-300/20 bg-lime-400/10 text-lime-200"
        />
        <DetailMetric
          icon={Thermometer}
          label="Temperature"
          value={`${machine.temperature} °C`}
          tone="border-cyan-300/20 bg-cyan-400/10 text-cyan-200"
        />
        <DetailMetric
          icon={Activity}
          label="Vibration"
          value={`${machine.vibration} g RMS`}
          tone="border-violet-300/20 bg-violet-400/10 text-violet-200"
        />
        <DetailMetric
          icon={Zap}
          label="Power Consumption"
          value={`${machine.power} kW`}
          tone="border-yellow-300/20 bg-yellow-400/10 text-yellow-200"
        />
        <DetailMetric
          icon={Clock}
          label="Running Hours"
          value={`${machine.runningHours} h`}
          tone="border-blue-300/20 bg-blue-400/10 text-blue-200"
        />
      </section>

      <section className="grid gap-3 xl:grid-cols-[.75fr_1fr_.75fr]">
        <div className={`${panelClass} p-5`}>
          <h2 className="text-lg font-semibold text-white">Machine Information</h2>
          <div className="mt-4 space-y-3 text-sm">
            {[
              ['Machine ID', machine.code],
              ['Manufacturer', machine.manufacturer],
              ['Installed', machine.installDate],
              ['Location', machine.location],
              ['Operating Status', machine.status],
            ].map(([label, value]) => (
              <div key={label} className="flex items-center justify-between gap-4 border-b border-cyan-400/10 pb-2 last:border-b-0">
                <span className="text-slate-400">{label}</span>
                <span className="text-right font-semibold text-white">{value}</span>
              </div>
            ))}
          </div>
        </div>

        <div className={`${panelClass} p-5`}>
          <h2 className="text-lg font-semibold text-white">Prediction</h2>
          <div className="mt-4 grid gap-4 md:grid-cols-[1fr_180px]">
            <div className="flex gap-4">
              <div className="grid h-14 w-14 shrink-0 place-items-center rounded-md bg-violet-500/20 text-violet-200">
                <BrainCircuit size={30} aria-hidden="true" />
              </div>
              <div>
                <p className="text-2xl font-bold text-white">{prediction.title}</p>
                <p className="mt-2 text-sm text-slate-300">
                  Estimated failure in{' '}
                  <span className="font-semibold text-violet-200">
                    {prediction.remainingUsefulLife} days
                  </span>{' '}
                  with {prediction.confidence}% confidence.
                </p>
                <p className="mt-3 inline-flex rounded-md border border-lime-400/20 bg-lime-400/10 px-3 py-2 text-sm font-semibold text-lime-200">
                  {prediction.recommendation}
                </p>
              </div>
            </div>
            <div className="rounded-md border border-amber-300/20 bg-amber-300/10 p-4 text-center">
              <p className="text-sm text-amber-100">Failure Probability</p>
              <p className="mt-2 text-4xl font-bold text-white">{prediction.failureProbability}%</p>
              <p className="mt-1 text-xs text-slate-300">Remaining Useful Life</p>
              <p className="text-lg font-semibold text-cyan-200">
                {prediction.remainingUsefulLife} Days
              </p>
            </div>
          </div>
        </div>

        <div className={`${panelClass} p-5`}>
          <h2 className="text-lg font-semibold text-white">QR Code</h2>
          <div className="mt-4 flex items-center gap-5">
            <div className="grid h-32 w-32 place-items-center rounded bg-white p-3 text-slate-950">
              <QrCode size={96} aria-hidden="true" />
            </div>
            <div className="text-sm text-slate-300">
              <p className="font-semibold text-white">{machine.code}</p>
              <p className="mt-2">Maintenance logs</p>
              <p>Prediction record</p>
              <p>Warranty info</p>
            </div>
          </div>
        </div>
      </section>

      <section className="grid gap-3 xl:grid-cols-[1.1fr_.9fr]">
        <div className={`${panelClass} p-5`}>
          <h2 className="text-lg font-semibold text-white">History</h2>
          <div className="mt-4 divide-y divide-cyan-400/10 rounded-md border border-cyan-400/10">
            {machineHistory.map((item) => {
              const Icon = item.type === 'alert' ? AlertTriangle : Wrench

              return (
                <div key={item.id} className="flex items-center gap-4 px-4 py-3">
                  <Icon
                    size={20}
                    className={item.type === 'alert' ? 'text-amber-300' : 'text-lime-300'}
                    aria-hidden="true"
                  />
                  <div>
                    <p className="font-semibold text-white">{item.date}</p>
                    <p className="text-sm text-slate-300">{item.event}</p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        <div className={`${panelClass} p-5`}>
          <h2 className="text-lg font-semibold text-white">Maintenance</h2>
          <div className="mt-4 grid gap-3">
            <div className="flex items-center gap-3 rounded-md border border-cyan-400/10 p-3">
              <CalendarDays size={24} className="text-lime-300" aria-hidden="true" />
              <p className="text-sm text-slate-400">
                Last Service
                <span className="block text-white">May 5</span>
              </p>
            </div>
            {aiRecommendations.map((item) => (
              <p key={item} className="flex items-center gap-3 text-sm text-slate-200">
                <CheckCircle2 size={18} className="text-lime-300" aria-hidden="true" />
                {item}
              </p>
            ))}
          </div>
        </div>
      </section>

      <section className={`${panelClass} p-5`}>
        <h2 className="text-lg font-semibold text-white">7-Day Sensor Trend</h2>
        <div className="mt-4 grid gap-5 lg:grid-cols-2">
          <div className="h-56">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={sensorSparks} margin={{ left: -20, right: 12 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e3a4c" />
                <XAxis dataKey="point" stroke="#94a3b8" tickLine={false} />
                <YAxis stroke="#94a3b8" tickLine={false} />
                <Line type="monotone" dataKey="temperature" stroke="#22d3ee" strokeWidth={3} />
                <Line type="monotone" dataKey="vibration" stroke="#a78bfa" strokeWidth={3} />
                <Line type="monotone" dataKey="power" stroke="#facc15" strokeWidth={3} />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <div className="h-56">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={energyReadings} margin={{ left: -20, right: 12 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e3a4c" />
                <XAxis dataKey="time" stroke="#94a3b8" tickLine={false} />
                <YAxis stroke="#94a3b8" tickLine={false} />
                <Area
                  type="monotone"
                  dataKey="energy"
                  stroke="#38bdf8"
                  strokeWidth={3}
                  fill="rgba(56,189,248,0.2)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </section>
    </div>
  )
}

export default MachineDetails
