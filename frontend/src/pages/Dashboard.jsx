import { useMemo, useState } from 'react'
import {
  Activity,
  AlertTriangle,
  ArrowRight,
  ArrowUpRight,
  Bot,
  CalendarDays,
  CheckCircle2,
  ChevronDown,
  CircleDollarSign,
  Clock,
  Cpu,
  Factory,
  Gauge,
  MapPin,
  Play,
  ShieldCheck,
  Thermometer,
  UserRound,
  Wrench,
  Zap,
} from 'lucide-react'
import { Link } from 'react-router-dom'
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
import { aiRecommendations, alerts, machineHistory, machines } from '../data/dummyData'

const panelClass = 'rounded-lg border border-cyan-400/10 bg-[#071624] shadow-xl shadow-black/20'

function makeTrend(machine, key) {
  const base = machine[key]
  return Array.from({ length: 7 }, (_, index) => ({
    time: `Day ${index + 1}`,
    value: Number(
      Math.max(0, base + Math.sin(index * 0.8 + machine.id) * base * 0.08 + index * base * 0.01).toFixed(2),
    ),
  }))
}

function OverviewItem({ icon: Icon, label, value, tone }) {
  return (
    <div className="flex min-w-0 flex-1 items-center gap-4 border-cyan-400/10 px-3 py-2 md:border-r last:md:border-r-0">
      <div className={`grid h-16 w-16 shrink-0 place-items-center rounded-lg border ${tone.box}`}>
        <Icon size={34} aria-hidden="true" />
      </div>
      <div>
        <p className="text-sm text-slate-300">{label}</p>
        <p className={`mt-1 text-3xl font-bold ${tone.text}`}>{value}</p>
      </div>
    </div>
  )
}

function Sparkline({ data, color }) {
  return (
    <div className="h-16 w-36">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <Line type="monotone" dataKey="value" stroke={color} strokeWidth={2} dot={false} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}

function SensorTile({ icon: Icon, title, value, unit, range, data, color, tone }) {
  return (
    <section className={`${panelClass} p-5`}>
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className={`grid h-16 w-16 place-items-center rounded-full border ${tone}`}>
            <Icon size={34} aria-hidden="true" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-white">{title}</h3>
            <p className="mt-1 text-3xl font-bold text-lime-400">
              {value} <span className="text-xl">{unit}</span>
            </p>
            <p className="mt-1 text-sm text-slate-400">{range}</p>
            <p className="mt-1 flex items-center gap-2 text-sm text-lime-400">
              <span className="h-3 w-3 rounded-full bg-lime-500" />
              Live
            </p>
          </div>
        </div>
        <Sparkline data={data} color={color} />
      </div>
    </section>
  )
}

function TrendCard({ title, data, color, unit }) {
  return (
    <section className={`${panelClass} p-5`}>
      <div className="mb-3 flex items-center justify-between gap-3">
        <h2 className="text-lg font-semibold text-white">{title}</h2>
        <span className="rounded-md border border-cyan-400/10 bg-white/5 px-3 py-1 text-xs text-slate-300">
          Last 7 Days
        </span>
      </div>
      <div className="h-44">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ left: -20, right: 10 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#1e3a4c" />
            <XAxis dataKey="time" stroke="#94a3b8" tickLine={false} />
            <YAxis stroke="#94a3b8" tickLine={false} />
            <Area type="monotone" dataKey="value" stroke={color} strokeWidth={3} fill={`${color}33`} />
          </AreaChart>
        </ResponsiveContainer>
      </div>
      <p className="mt-2 text-xs text-slate-400">Measured in {unit}</p>
    </section>
  )
}

function Dashboard() {
  const [selectedMachineId, setSelectedMachineId] = useState(1)
  const machine = machines.find((item) => item.id === selectedMachineId) ?? machines[0]
  const prediction = machine.prediction

  const trends = useMemo(
    () => ({
      temperature: makeTrend(machine, 'temperature'),
      vibration: makeTrend(machine, 'vibration'),
      power: makeTrend(machine, 'power'),
      energy: makeTrend(machine, 'energyToday'),
    }),
    [machine],
  )

  const healthyCount = machines.filter((item) => item.status === 'Healthy').length
  const warningCount = machines.filter((item) => item.status === 'Warning').length
  const criticalCount = machines.filter((item) => item.status === 'Critical').length
  const statusColor =
    machine.status === 'Critical'
      ? 'text-red-400'
      : machine.status === 'Warning'
        ? 'text-yellow-400'
        : 'text-lime-400'

  return (
    <div className="space-y-3">
      <div className="flex flex-col gap-3 xl:flex-row xl:items-end xl:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Dashboard</h1>
          <p className="mt-1 text-sm text-slate-400">
            Real-time overview of your machine health and performance
          </p>
        </div>
        <div className="grid gap-3 sm:grid-cols-2">
          <label className="flex items-center justify-between gap-8 rounded-md border border-cyan-400/10 bg-white/5 px-4 py-3 text-left text-sm text-white">
            <span className="min-w-0">
              <span className="block text-slate-400">Machine Selector</span>
              <select
                value={selectedMachineId}
                onChange={(event) => setSelectedMachineId(Number(event.target.value))}
                className="mt-1 w-full bg-transparent font-semibold text-white outline-none"
              >
                {machines.map((item) => (
                  <option key={item.id} value={item.id} className="bg-[#07111f] text-white">
                    {item.name}
                  </option>
                ))}
              </select>
              <span className="block text-slate-400">{machine.location}</span>
            </span>
            <ChevronDown size={18} aria-hidden="true" />
          </label>
          <button className="flex items-center justify-between gap-8 rounded-md border border-cyan-400/10 bg-white/5 px-4 py-3 text-left text-sm text-white">
            <span className="flex items-center gap-3">
              <CalendarDays size={17} aria-hidden="true" />
              May 20, 2025&nbsp;&nbsp;10:45 AM
            </span>
            <ChevronDown size={18} aria-hidden="true" />
          </button>
        </div>
      </div>

      <section className="grid gap-3 xl:grid-cols-[1fr_260px]">
        <div className={`${panelClass} p-4`}>
          <h2 className="mb-3 text-lg font-semibold text-white">Factory Overview</h2>
          <div className="grid gap-3 md:grid-cols-4">
            <OverviewItem
              icon={Factory}
              label="Total Machines"
              value={machines.length}
              tone={{ box: 'border-blue-500/20 bg-blue-500/10 text-blue-400', text: 'text-blue-400' }}
            />
            <OverviewItem
              icon={ShieldCheck}
              label="Healthy Machines"
              value={healthyCount}
              tone={{ box: 'border-lime-500/20 bg-lime-500/10 text-lime-400', text: 'text-lime-400' }}
            />
            <OverviewItem
              icon={AlertTriangle}
              label="Warning Machines"
              value={warningCount}
              tone={{ box: 'border-yellow-400/20 bg-yellow-400/10 text-yellow-400', text: 'text-yellow-400' }}
            />
            <OverviewItem
              icon={Gauge}
              label="Critical Machines"
              value={criticalCount}
              tone={{ box: 'border-red-500/20 bg-red-500/10 text-red-400', text: 'text-red-400' }}
            />
          </div>
        </div>

        <aside className={`${panelClass} flex items-center gap-4 p-4`}>
          <div className="h-24 w-24 rounded bg-white p-2">
            <div className="h-full w-full bg-[repeating-linear-gradient(90deg,#111827_0_4px,#fff_4px_8px),repeating-linear-gradient(0deg,transparent_0_6px,rgba(255,255,255,0.5)_6px_10px)] bg-blend-multiply" />
          </div>
          <div className="text-xs text-slate-300">
            <p className="font-semibold text-white">Machine Digital Passport</p>
            <p className="mt-1 text-cyan-200">Scan QR Code</p>
            <p className="mt-2">Machine Information</p>
            <p>Service History</p>
            <p>Maintenance Logs</p>
            <p>Warranty Details</p>
          </div>
        </aside>
      </section>

      <section className="grid gap-3 xl:grid-cols-[1.45fr_.75fr]">
        <div className="rounded-lg border border-violet-300/30 bg-[#151128] p-6 shadow-2xl shadow-violet-950/30">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex gap-4">
              <div className="grid h-16 w-16 shrink-0 place-items-center rounded-lg border border-violet-300/20 bg-violet-400/15 text-violet-200">
                <Bot size={36} aria-hidden="true" />
              </div>
              <div>
                <p className="text-sm font-semibold uppercase text-violet-200">AI Prediction</p>
                <h2 className="mt-1 text-3xl font-bold text-white">{prediction.title}</h2>
                <p className="mt-2 text-sm text-slate-300">
                  {machine.code} is currently monitored for {prediction.component.toLowerCase()}.
                </p>
              </div>
            </div>
            <Link
              to="/prediction"
              className="inline-flex w-fit items-center gap-2 rounded-md bg-violet-700 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-violet-600"
            >
              View AI Analysis <ArrowRight size={16} aria-hidden="true" />
            </Link>
          </div>
          <div className="mt-6 grid gap-3 md:grid-cols-4">
            <div className="rounded-md border border-red-400/20 bg-red-400/10 p-4">
              <p className="text-xs text-red-100">Failure Probability</p>
              <p className="mt-2 text-3xl font-bold text-white">{prediction.failureProbability}%</p>
            </div>
            <div className="rounded-md border border-cyan-400/20 bg-cyan-400/10 p-4">
              <p className="text-xs text-cyan-100">Remaining Useful Life</p>
              <p className="mt-2 text-3xl font-bold text-white">{prediction.remainingUsefulLife} Days</p>
            </div>
            <div className="rounded-md border border-lime-400/20 bg-lime-400/10 p-4">
              <p className="text-xs text-lime-100">Confidence</p>
              <p className="mt-2 text-3xl font-bold text-white">{prediction.confidence}%</p>
            </div>
            <div className="rounded-md border border-violet-300/20 bg-violet-300/10 p-4">
              <p className="text-xs text-violet-100">Recommendation</p>
              <p className="mt-2 text-xl font-bold text-white">{prediction.recommendation}</p>
            </div>
          </div>
        </div>

        <div className={`${panelClass} p-5`}>
          <h2 className="text-lg font-semibold text-white">AI Outputs</h2>
          <div className="mt-4 space-y-3">
            <div className="flex items-center justify-between rounded-md border border-red-400/20 bg-red-400/10 px-3 py-2">
              <span className="text-sm text-slate-300">Failure Probability</span>
              <span className="font-bold text-white">{prediction.failureProbability}%</span>
            </div>
            <div className="flex items-center justify-between rounded-md border border-cyan-400/20 bg-cyan-400/10 px-3 py-2">
              <span className="text-sm text-slate-300">Remaining Useful Life</span>
              <span className="font-bold text-white">{prediction.remainingUsefulLife} Days</span>
            </div>
            <div className="rounded-md border border-lime-400/20 bg-lime-400/10 px-3 py-2">
              <p className="text-sm text-slate-300">Recommendation</p>
              <p className="mt-1 font-bold text-white">{prediction.recommendation}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="grid gap-3 xl:grid-cols-3">
        <SensorTile
          icon={Thermometer}
          title="Temperature"
          value={machine.temperature}
          unit="°C"
          range="Normal Range: 20 - 60 °C"
          data={trends.temperature}
          color="#65a30d"
          tone="border-lime-500/40 bg-lime-500/10 text-lime-300"
        />
        <SensorTile
          icon={Activity}
          title="Vibration"
          value={machine.vibration}
          unit="g RMS"
          range="Normal Range: 0 - 1.0 g RMS"
          data={trends.vibration}
          color="#65a30d"
          tone="border-lime-500/40 bg-lime-500/10 text-lime-300"
        />
        <SensorTile
          icon={Zap}
          title="Power"
          value={machine.power}
          unit="kW"
          range={`Today's Energy: ${machine.energyToday} kWh`}
          data={trends.power}
          color="#65a30d"
          tone="border-yellow-400/40 bg-yellow-400/10 text-yellow-400"
        />
      </section>

      <section className="grid gap-3 xl:grid-cols-3">
        <TrendCard title="Temperature Trend" data={trends.temperature} color="#22d3ee" unit="°C" />
        <TrendCard title="Vibration Trend" data={trends.vibration} color="#a78bfa" unit="g RMS" />
        <TrendCard title="Energy Trend" data={trends.energy} color="#38bdf8" unit="kWh" />
      </section>

      <section className="grid gap-3 xl:grid-cols-[1fr_1.15fr]">
        <div className={`${panelClass} p-5`}>
          <h2 className="text-lg font-semibold text-white">Machine Health</h2>
          <div className="mt-3 flex items-center gap-8">
            <div className="grid h-24 w-24 place-items-center rounded-[28px] bg-lime-500/20 text-lime-300">
              <ShieldCheck size={58} aria-hidden="true" />
            </div>
            <div className="flex-1">
              <p className={`text-2xl font-bold ${statusColor}`}>{machine.status}</p>
              <p className="mt-1 text-sm text-slate-300">{prediction.title}</p>
              <div className="mt-4 flex items-center gap-3">
                <div className="h-3 flex-1 rounded-full bg-slate-800">
                  <div
                    className="h-3 rounded-full bg-lime-500 shadow-[0_0_14px_rgba(132,204,22,0.65)]"
                    style={{ width: `${machine.health}%` }}
                  />
                </div>
                <span className="font-semibold text-white">{machine.health}%</span>
              </div>
            </div>
          </div>
        </div>

        <div className={`${panelClass} p-5`}>
          <h2 className="text-lg font-semibold text-white">Health Score</h2>
          <div className="mt-2 flex items-center justify-center gap-8">
            <div
              className="grid h-32 w-32 place-items-center rounded-full"
              style={{
                background: `conic-gradient(#84cc16 0 ${machine.health * 3.6}deg, #123322 ${machine.health * 3.6}deg 360deg)`,
              }}
            >
              <div className="grid h-24 w-24 place-items-center rounded-full bg-[#07111f] text-center shadow-inner shadow-black">
                <p className="text-4xl font-bold text-white">{machine.health}</p>
                <p className="-mt-3 text-sm text-slate-300">/100</p>
              </div>
            </div>
            <div>
              <p className={`text-xl font-bold ${statusColor}`}>{machine.status}</p>
              <p className="mt-2 text-sm text-slate-300">Selected machine: {machine.name}</p>
            </div>
          </div>
        </div>
      </section>

      <section className={`${panelClass} p-5`}>
        <div className="grid gap-4 md:grid-cols-5">
          <div className="flex items-center gap-4">
            <div className="grid h-10 w-10 place-items-center rounded-full border border-lime-500 text-lime-400">
              <Play size={20} aria-hidden="true" />
            </div>
            <div>
              <p className="font-semibold text-lime-400">Running</p>
              <p className="text-sm text-slate-300">Machine is under active monitoring.</p>
            </div>
          </div>
          <div className="flex items-center gap-4 border-cyan-400/10 md:border-l md:pl-6">
            <MapPin size={34} className="text-white" aria-hidden="true" />
            <p className="text-sm text-slate-300">
              Location
              <span className="block text-white">{machine.location}</span>
            </p>
          </div>
          <div className="flex items-center gap-4 border-cyan-400/10 md:border-l md:pl-6">
            <CalendarDays size={34} className="text-white" aria-hidden="true" />
            <p className="text-sm text-slate-300">
              Last Updated
              <span className="block text-white">May 20, 2025</span>
              <span className="block text-white">10:45 AM</span>
            </p>
          </div>
          <div className="flex items-center gap-4 border-cyan-400/10 md:border-l md:pl-6">
            <Clock size={34} className="text-white" aria-hidden="true" />
            <p className="text-sm text-slate-300">
              Running Hours
              <span className="block text-white">{machine.runningHours} Hours</span>
            </p>
          </div>
          <div className="flex items-center gap-4 border-cyan-400/10 md:border-l md:pl-6">
            <Cpu size={34} className="text-white" aria-hidden="true" />
            <p className="text-sm text-slate-300">
              Machine ID
              <span className="block text-white">{machine.code}</span>
            </p>
          </div>
        </div>
      </section>

      <section className="grid gap-3 xl:grid-cols-[1fr_1.05fr_1.05fr]">
        <div className={`${panelClass} p-5`}>
          <h2 className="text-lg font-semibold text-white">Recent Alerts</h2>
          <div className="mt-3 space-y-3">
            {alerts.slice(0, 3).map((alert) => {
              const resolved = alert.severity === 'Resolved'
              const critical = alert.severity === 'Critical'
              const Icon = resolved ? CheckCircle2 : AlertTriangle
              const color = resolved ? 'text-lime-400' : critical ? 'text-red-400' : 'text-yellow-400'
              const border = resolved
                ? 'border-lime-400/20 bg-lime-400/10'
                : critical
                  ? 'border-red-400/20 bg-red-400/10'
                  : 'border-yellow-400/20 bg-yellow-400/10'

              return (
                <div key={alert.id} className={`rounded-md border p-3 ${border}`}>
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-start gap-3">
                      <Icon className={color} size={20} aria-hidden="true" />
                      <div>
                        <p className="font-semibold text-white">{alert.title}</p>
                        <p className="mt-1 text-xs text-slate-300">{alert.machine}</p>
                      </div>
                    </div>
                    <span className="text-xs text-slate-300">{alert.time}</span>
                  </div>
                </div>
              )
            })}
          </div>
          <Link to="/alerts" className="mx-auto mt-4 flex w-fit items-center gap-2 text-sm font-medium text-blue-400">
            View All Alerts <ArrowRight size={16} aria-hidden="true" />
          </Link>
        </div>

        <div className={`${panelClass} p-5`}>
          <div className="grid gap-4 md:grid-cols-[1fr_1.1fr]">
            <div>
              <h2 className="text-lg font-semibold text-white">AI Prediction</h2>
              <div className="mt-4 flex gap-4">
                <div className="grid h-14 w-14 place-items-center rounded-lg bg-violet-500/20 text-violet-300">
                  <Bot size={32} aria-hidden="true" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-white">{prediction.title}</p>
                  <div className="mt-3 grid gap-2 text-sm">
                    <p className="text-slate-300">
                      Estimated Failure:{' '}
                      <span className="font-semibold text-violet-200">{prediction.remainingUsefulLife} Days</span>
                    </p>
                    <p className="text-slate-300">
                      Confidence: <span className="font-semibold text-lime-200">{prediction.confidence}%</span>
                    </p>
                    <p className="text-slate-300">
                      Recommendation:{' '}
                      <span className="font-semibold text-cyan-200">{prediction.recommendation}</span>
                    </p>
                  </div>
                </div>
              </div>
              <Link
                to={`/machines/${machine.id}`}
                className="mt-4 inline-flex rounded-md bg-violet-700 px-6 py-2 text-sm font-semibold text-white transition hover:bg-violet-600"
              >
                View Details
              </Link>
            </div>
            <div className="border-cyan-400/10 md:border-l md:pl-4">
              <h3 className="text-sm font-semibold text-white">Prediction Timeline</h3>
              <div className="mt-4 space-y-3 text-xs">
                {[
                  ['Today', machine.status, 'bg-lime-400', 'text-lime-400'],
                  ['In 3 Days', 'Sensor drift possible', 'bg-lime-400', 'text-lime-400'],
                  ['In 7 Days', 'Maintenance Recommended', 'bg-yellow-400', 'text-yellow-400'],
                  ['In 10 Days', prediction.title, 'bg-red-400', 'text-red-400'],
                ].map(([when, label, dot, text]) => (
                  <div key={when} className="grid grid-cols-[88px_1fr] items-center gap-2">
                    <p className={`flex items-center gap-2 font-semibold ${text}`}>
                      <span className={`h-3 w-3 rounded-full ${dot}`} />
                      {when}
                    </p>
                    <p className="text-slate-300">{label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className={`${panelClass} p-5`}>
          <h2 className="flex items-center gap-2 text-lg font-semibold text-white">
            <CircleDollarSign size={22} className="text-lime-400" aria-hidden="true" />
            AI Recommendation
          </h2>
          <div className="mt-4 grid gap-4 md:grid-cols-2">
            <div>
              <p className="text-xs text-slate-400">Recommendation</p>
              <div className="mt-2 space-y-2">
                {[prediction.recommendation, ...aiRecommendations.slice(0, 2)].map((item) => (
                  <p key={item} className="flex items-center gap-2 text-sm font-semibold text-lime-300">
                    <CheckCircle2 size={18} aria-hidden="true" />
                    {item}
                  </p>
                ))}
              </div>
              <p className="mt-4 text-xs text-slate-400">Estimated Cost Saving</p>
              <p className="text-xl font-bold text-lime-400">₹18,000</p>
            </div>
            <div className="border-red-400/20 md:border-l md:pl-4">
              <p className="text-sm font-semibold text-cyan-300">Downtime Prevented</p>
              <p className="mt-2 text-3xl font-bold text-white">8 Hours</p>
              <p className="mt-3 text-xs text-slate-400">If Ignored</p>
              <p className="text-xl font-bold text-red-400">₹18,000 production loss</p>
            </div>
          </div>
          <div className="mt-4 flex items-center justify-between rounded-md border border-lime-500/20 bg-lime-500/15 px-4 py-3 text-lime-300">
            <span>Potential Savings</span>
            <span className="text-xl font-bold">₹18,000</span>
            <ArrowUpRight size={22} aria-hidden="true" />
          </div>
        </div>
      </section>

      <section className="grid gap-3 xl:grid-cols-[1.25fr_.85fr]">
        <div className={`${panelClass} p-5`}>
          <div className="mb-3 flex items-center justify-between">
            <h2 className="text-lg font-semibold text-white">Energy Usage (kWh)</h2>
            <button className="flex items-center gap-2 rounded-md border border-cyan-400/10 px-3 py-1.5 text-sm text-white">
              Last 7 Days <ChevronDown size={16} aria-hidden="true" />
            </button>
          </div>
          <div className="h-44">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={trends.energy} margin={{ left: -20, right: 10 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e3a4c" />
                <XAxis dataKey="time" stroke="#94a3b8" tickLine={false} />
                <YAxis stroke="#94a3b8" tickLine={false} />
                <Area type="monotone" dataKey="value" stroke="#3b82f6" strokeWidth={3} fill="rgba(59,130,246,0.25)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className={`${panelClass} p-5`}>
          <h2 className="text-lg font-semibold text-white">Machine History</h2>
          <div className="mt-3 divide-y divide-cyan-400/10 rounded-md border border-cyan-400/10">
            {machineHistory.map((item) => {
              const Icon = item.type === 'alert' ? AlertTriangle : Wrench

              return (
                <div key={item.id} className="flex items-center gap-4 px-4 py-3">
                  <Icon
                    className={item.type === 'alert' ? 'text-yellow-400' : 'text-lime-400'}
                    size={24}
                    aria-hidden="true"
                  />
                  <p className="text-sm text-slate-400">
                    {item.date}
                    <span className="block text-base text-white">{item.event}</span>
                  </p>
                </div>
              )
            })}
          </div>
          <div className="mt-3 grid gap-3 sm:grid-cols-2">
            <div className="flex items-center gap-4 rounded-md border border-cyan-400/10 p-3">
              <CalendarDays className="text-lime-400" size={28} aria-hidden="true" />
              <p className="text-sm text-slate-400">
                Last Service
                <span className="block text-base text-white">May 5</span>
              </p>
            </div>
            <div className="flex items-center gap-4 rounded-md border border-cyan-400/10 p-3">
              <UserRound className="text-cyan-400" size={28} aria-hidden="true" />
              <p className="text-sm text-slate-400">
                Engineer
                <span className="block text-base text-white">Rahul Kumar</span>
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Dashboard
