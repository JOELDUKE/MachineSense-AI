import { useMemo, useState } from 'react'
import {
  BrainCircuit,
  CheckCircle2,
  ChevronDown,
  Clock,
  Gauge,
  IndianRupee,
  ShieldCheck,
  TimerReset,
  TrendingUp,
  Wrench,
} from 'lucide-react'
import {
  Area,
  AreaChart,
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import MetricPanel from '../components/MetricPanel'
import PageHeader from '../components/PageHeader'
import { aiRecommendations, machines } from '../data/dummyData'

const panelClass = 'rounded-lg border border-cyan-400/10 bg-[#071624] p-5 shadow-xl shadow-black/20'

function makePredictionTrend(machine) {
  const { prediction } = machine

  return [
    {
      day: 'Today',
      health: machine.health,
      probability: prediction.failureProbability,
      rul: prediction.remainingUsefulLife,
    },
    {
      day: 'Day 3',
      health: Math.max(0, machine.health - 4),
      probability: prediction.failureProbability + 4,
      rul: Math.max(0, prediction.remainingUsefulLife - 3),
    },
    {
      day: 'Day 6',
      health: Math.max(0, machine.health - 9),
      probability: prediction.failureProbability + 9,
      rul: Math.max(0, prediction.remainingUsefulLife - 6),
    },
    {
      day: 'Day 9',
      health: Math.max(0, machine.health - 15),
      probability: prediction.failureProbability + 16,
      rul: Math.max(0, prediction.remainingUsefulLife - 9),
    },
    {
      day: 'Day 12',
      health: Math.max(0, machine.health - 22),
      probability: prediction.failureProbability + 25,
      rul: Math.max(0, prediction.remainingUsefulLife - 12),
    },
  ]
}

function AIPrediction() {
  const [selectedMachineId, setSelectedMachineId] = useState(1)
  const machine = machines.find((item) => item.id === selectedMachineId) ?? machines[0]
  const prediction = machine.prediction
  const predictionTrend = useMemo(() => makePredictionTrend(machine), [machine])
  const recommendedActions = [
    prediction.recommendation,
    ...aiRecommendations.filter((item) => item.toLowerCase() !== prediction.recommendation.toLowerCase()).slice(0, 2),
  ]

  return (
    <div>
      <PageHeader
        title="AI Prediction"
        description="Predictive maintenance intelligence for MSME shop-floor machines."
        action={
          <label className="flex min-w-72 items-center justify-between gap-4 rounded-md border border-cyan-400/10 bg-white/5 px-4 py-3 text-left text-sm text-white">
            <span className="min-w-0">
              <span className="block text-xs text-slate-400">Machine Selector</span>
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
        }
      />

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <MetricPanel
          icon={Gauge}
          label="Health Score"
          value={`${machine.health}%`}
          detail={`${machine.code} active model`}
          tone="lime"
        />
        <MetricPanel
          icon={TrendingUp}
          label="Failure Probability"
          value={`${prediction.failureProbability}%`}
          detail={`${prediction.component} risk`}
          tone="amber"
        />
        <MetricPanel
          icon={TimerReset}
          label="Remaining Useful Life"
          value={`${prediction.remainingUsefulLife} Days`}
          detail="RUL forecast"
          tone="cyan"
        />
        <MetricPanel
          icon={ShieldCheck}
          label="Confidence Score"
          value={`${prediction.confidence}%`}
          detail={prediction.priority}
          tone="violet"
        />
      </section>

      <section className="mt-4 grid gap-4 xl:grid-cols-[1fr_.85fr]">
        <div className={panelClass}>
          <div className="flex items-center gap-3">
            <div className="grid h-11 w-11 place-items-center rounded-md border border-violet-400/20 bg-violet-400/10 text-violet-200">
              <BrainCircuit size={24} aria-hidden="true" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-white">Interactive Prediction Chart</h2>
              <p className="text-sm text-slate-400">
                {machine.name}: health degradation and failure probability forecast
              </p>
            </div>
          </div>
          <div className="mt-5 h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={predictionTrend} margin={{ left: -20, right: 12 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e3a4c" />
                <XAxis dataKey="day" stroke="#94a3b8" tickLine={false} />
                <YAxis stroke="#94a3b8" tickLine={false} />
                <Tooltip
                  contentStyle={{
                    background: '#08111f',
                    border: '1px solid rgba(34, 211, 238, 0.18)',
                    borderRadius: '8px',
                    color: '#e5edf6',
                  }}
                />
                <Line type="monotone" dataKey="health" stroke="#84cc16" strokeWidth={3} dot={{ r: 4 }} />
                <Line type="monotone" dataKey="probability" stroke="#f59e0b" strokeWidth={3} dot={{ r: 4 }} />
                <Line type="monotone" dataKey="rul" stroke="#38bdf8" strokeWidth={3} dot={{ r: 4 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-3 flex flex-wrap gap-4 text-xs text-slate-300">
            <span className="flex items-center gap-2"><span className="h-2 w-2 rounded-full bg-lime-400" /> Health</span>
            <span className="flex items-center gap-2"><span className="h-2 w-2 rounded-full bg-amber-400" /> Failure Probability</span>
            <span className="flex items-center gap-2"><span className="h-2 w-2 rounded-full bg-sky-400" /> RUL</span>
          </div>
        </div>

        <div className="space-y-4">
          <div className={panelClass}>
            <h2 className="text-lg font-semibold text-white">Recommended Maintenance</h2>
            <div className="mt-4 space-y-3">
              {recommendedActions.map((item) => (
                <p key={item} className="flex items-center gap-3 rounded-md border border-lime-400/10 bg-lime-400/10 px-3 py-2 text-sm text-lime-100">
                  <CheckCircle2 size={18} className="text-lime-300" aria-hidden="true" />
                  {item}
                </p>
              ))}
            </div>
          </div>

          <div className={panelClass}>
            <h2 className="text-lg font-semibold text-white">Business Impact</h2>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              <div className="rounded-md border border-lime-400/20 bg-lime-400/10 p-4">
                <IndianRupee className="text-lime-300" size={24} aria-hidden="true" />
                <p className="mt-3 text-sm text-slate-300">Estimated Cost Savings</p>
                <p className="text-2xl font-bold text-white">₹18,000</p>
              </div>
              <div className="rounded-md border border-cyan-400/20 bg-cyan-400/10 p-4">
                <Clock className="text-cyan-200" size={24} aria-hidden="true" />
                <p className="mt-3 text-sm text-slate-300">Downtime Prevented</p>
                <p className="text-2xl font-bold text-white">8 Hours</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mt-4 grid gap-4 xl:grid-cols-[.8fr_1.2fr]">
        <div className={panelClass}>
          <h2 className="text-lg font-semibold text-white">Maintenance Action</h2>
          <div className="mt-4 rounded-md border border-violet-400/20 bg-violet-400/10 p-4">
            <Wrench size={24} className="text-violet-200" aria-hidden="true" />
            <p className="mt-3 text-xl font-bold text-white">{prediction.recommendation}</p>
            <p className="mt-2 text-sm text-slate-300">
              Recommended for {machine.code}: {prediction.component}. Schedule this during the next planned shift break.
            </p>
          </div>
        </div>
        <div className={panelClass}>
          <h2 className="text-lg font-semibold text-white">RUL Forecast</h2>
          <div className="mt-4 h-56">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={predictionTrend} margin={{ left: -20, right: 12 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e3a4c" />
                <XAxis dataKey="day" stroke="#94a3b8" tickLine={false} />
                <YAxis stroke="#94a3b8" tickLine={false} />
                <Area
                  type="monotone"
                  dataKey="rul"
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

export default AIPrediction
