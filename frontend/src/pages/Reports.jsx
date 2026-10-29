import {
  Activity,
  BrainCircuit,
  Download,
  FileText,
  Gauge,
  IndianRupee,
  Wrench,
  Zap,
} from 'lucide-react'
import {
  Bar,
  BarChart,
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
import { energyReadings, machines, predictionTrend, reportSummaries } from '../data/dummyData'

const panelClass = 'rounded-lg border border-cyan-400/10 bg-[#071624] p-5 shadow-xl shadow-black/20'

const reportIcons = {
  health: Gauge,
  energy: Zap,
  maintenance: Wrench,
  prediction: BrainCircuit,
}

function Reports() {
  const averageHealth = Math.round(
    machines.reduce((total, machine) => total + machine.health, 0) / machines.length,
  )

  return (
    <div>
      <PageHeader
        title="Reports"
        description="Industrial IoT reports for machine health, energy, maintenance, and AI prediction."
      />

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <MetricPanel icon={Activity} label="Machines Covered" value={machines.length} detail="Demo shop-floor assets" tone="cyan" />
        <MetricPanel icon={Gauge} label="Average Health" value={`${averageHealth}%`} detail="Across connected machines" tone="lime" />
        <MetricPanel icon={Zap} label="Weekly Energy" value="43.5 kWh" detail="Last 7 days" tone="amber" />
        <MetricPanel icon={IndianRupee} label="Savings Identified" value="Rs 15,500" detail="AI prediction impact" tone="violet" />
      </section>

      <section className="mt-4 grid gap-4 md:grid-cols-2">
        {reportSummaries.map((report) => {
          const Icon = reportIcons[report.id] || FileText

          return (
            <article key={report.id} className={panelClass}>
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-start gap-3">
                  <div className="grid h-11 w-11 place-items-center rounded-md border border-cyan-400/20 bg-cyan-400/10 text-cyan-200">
                    <Icon size={22} aria-hidden="true" />
                  </div>
                  <div>
                    <h2 className="text-lg font-semibold text-white">{report.title}</h2>
                    <p className="mt-1 text-sm text-slate-400">{report.description}</p>
                  </div>
                </div>
              </div>
              <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-sm text-slate-400">Summary</p>
                  <p className="text-xl font-bold text-white">{report.metric}</p>
                  <p className="mt-1 text-xs text-slate-500">Updated {report.updated}</p>
                </div>
                <button
                  type="button"
                  onClick={() => window.alert(`${report.title} PDF download will be available in the final deployment.`)}
                  className="inline-flex w-fit items-center gap-2 rounded-md border border-blue-400/20 bg-blue-600/25 px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-600/35"
                >
                  <Download size={16} aria-hidden="true" />
                  Download PDF
                </button>
              </div>
            </article>
          )
        })}
      </section>

      <section className="mt-4 grid gap-4 xl:grid-cols-2">
        <div className={panelClass}>
          <h2 className="text-lg font-semibold text-white">Machine Health Report</h2>
          <div className="mt-4 h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={machines} margin={{ left: -20, right: 12 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e3a4c" />
                <XAxis dataKey="code" stroke="#94a3b8" tickLine={false} />
                <YAxis stroke="#94a3b8" tickLine={false} />
                <Tooltip
                  contentStyle={{
                    background: '#08111f',
                    border: '1px solid rgba(34, 211, 238, 0.18)',
                    borderRadius: '8px',
                    color: '#e5edf6',
                  }}
                />
                <Bar dataKey="health" fill="#84cc16" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className={panelClass}>
          <h2 className="text-lg font-semibold text-white">Energy Report</h2>
          <div className="mt-4 h-64">
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
                <Line type="monotone" dataKey="energy" stroke="#38bdf8" strokeWidth={3} dot={{ r: 4 }} />
                <Line type="monotone" dataKey="power" stroke="#facc15" strokeWidth={3} dot={{ r: 4 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </section>

      <section className="mt-4 grid gap-4 xl:grid-cols-2">
        <div className={panelClass}>
          <h2 className="text-lg font-semibold text-white">Maintenance Report</h2>
          <div className="mt-4 grid gap-3">
            {[
              ['Open work orders', '3', 'Bearing replacement and cooling checks'],
              ['Completed this month', '8', 'Oil changes, inspections, alignment'],
              ['Parts consumed', '5', 'Bearings, belts, filters'],
            ].map(([label, value, detail]) => (
              <div key={label} className="flex items-center justify-between gap-4 rounded-md border border-cyan-400/10 p-3">
                <div>
                  <p className="font-semibold text-white">{label}</p>
                  <p className="text-sm text-slate-400">{detail}</p>
                </div>
                <span className="text-2xl font-bold text-cyan-200">{value}</span>
              </div>
            ))}
          </div>
        </div>

        <div className={panelClass}>
          <h2 className="text-lg font-semibold text-white">AI Prediction Report</h2>
          <div className="mt-4 h-56">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={predictionTrend} margin={{ left: -20, right: 12 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e3a4c" />
                <XAxis dataKey="day" stroke="#94a3b8" tickLine={false} />
                <YAxis stroke="#94a3b8" tickLine={false} />
                <Line type="monotone" dataKey="probability" stroke="#f59e0b" strokeWidth={3} dot={{ r: 4 }} />
                <Line type="monotone" dataKey="rul" stroke="#38bdf8" strokeWidth={3} dot={{ r: 4 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Reports
