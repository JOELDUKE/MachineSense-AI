import { useMemo, useState } from 'react'
import { AlertTriangle, CheckCircle2, Filter, Flame, Search } from 'lucide-react'
import MetricPanel from '../components/MetricPanel'
import PageHeader from '../components/PageHeader'
import { alerts } from '../data/dummyData'

const panelClass = 'rounded-lg border border-cyan-400/10 bg-[#071624] p-5 shadow-xl shadow-black/20'
const filters = ['All', 'Critical', 'Warning', 'Resolved']

function severityStyle(severity) {
  if (severity === 'Critical') {
    return {
      icon: Flame,
      card: 'border-red-400/20 bg-red-400/10',
      text: 'text-red-300',
      badge: 'border-red-400/20 bg-red-400/10 text-red-200',
    }
  }

  if (severity === 'Resolved') {
    return {
      icon: CheckCircle2,
      card: 'border-lime-400/20 bg-lime-400/10',
      text: 'text-lime-300',
      badge: 'border-lime-400/20 bg-lime-400/10 text-lime-200',
    }
  }

  return {
    icon: AlertTriangle,
    card: 'border-amber-300/20 bg-amber-300/10',
    text: 'text-amber-200',
    badge: 'border-amber-300/20 bg-amber-300/10 text-amber-100',
  }
}

function Alerts() {
  const [query, setQuery] = useState('')
  const [activeFilter, setActiveFilter] = useState('All')

  const filteredAlerts = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase()

    return alerts.filter((alert) => {
      const matchesFilter = activeFilter === 'All' || alert.severity === activeFilter
      const matchesSearch = [alert.title, alert.machine, alert.area, alert.reading]
        .join(' ')
        .toLowerCase()
        .includes(normalizedQuery)

      return matchesFilter && matchesSearch
    })
  }, [activeFilter, query])

  const criticalCount = alerts.filter((alert) => alert.severity === 'Critical').length
  const warningCount = alerts.filter((alert) => alert.severity === 'Warning').length
  const resolvedCount = alerts.filter((alert) => alert.severity === 'Resolved').length

  return (
    <div>
      <PageHeader
        title="Alerts"
        description="Live machine alerts, fault events, and maintenance response history."
      />

      <section className="grid gap-4 md:grid-cols-3">
        <MetricPanel icon={Flame} label="Critical" value={criticalCount} detail="Needs immediate action" tone="red" />
        <MetricPanel icon={AlertTriangle} label="Warning" value={warningCount} detail="Monitor closely" tone="amber" />
        <MetricPanel icon={CheckCircle2} label="Resolved" value={resolvedCount} detail="Closed alerts" tone="lime" />
      </section>

      <section className={`${panelClass} mt-4`}>
        <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
          <div className="relative min-w-0 flex-1">
            <Search className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={18} aria-hidden="true" />
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search by machine, alert, area, or reading"
              className="w-full rounded-md border border-cyan-400/10 bg-[#0d1a2d] py-2 pl-10 pr-3 text-sm text-white outline-none transition placeholder:text-slate-500 focus:border-cyan-300/40"
            />
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <span className="flex items-center gap-2 text-sm text-slate-400">
              <Filter size={16} aria-hidden="true" />
              Filters
            </span>
            {filters.map((filter) => (
              <button
                key={filter}
                type="button"
                onClick={() => setActiveFilter(filter)}
                className={`rounded-md border px-3 py-2 text-sm font-medium transition ${
                  activeFilter === filter
                    ? 'border-blue-400/30 bg-blue-600/25 text-white'
                    : 'border-cyan-400/10 bg-white/5 text-slate-300 hover:bg-white/10'
                }`}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="mt-4 grid gap-4 lg:grid-cols-2">
        {filteredAlerts.map((alert) => {
          const style = severityStyle(alert.severity)
          const Icon = style.icon

          return (
            <article key={alert.id} className={`rounded-lg border p-5 shadow-xl shadow-black/20 ${style.card}`}>
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-start gap-3">
                  <div className={`grid h-10 w-10 place-items-center rounded-md border ${style.badge}`}>
                    <Icon size={20} aria-hidden="true" />
                  </div>
                  <div>
                    <h2 className="font-semibold text-white">{alert.title}</h2>
                    <p className="mt-1 text-sm text-slate-300">{alert.machine} / {alert.area}</p>
                  </div>
                </div>
                <span className={`rounded-md border px-2 py-1 text-xs font-semibold ${style.badge}`}>
                  {alert.severity}
                </span>
              </div>
              <div className="mt-4 grid gap-3 text-sm sm:grid-cols-3">
                <p className="text-slate-400">Reading<span className={`block font-semibold ${style.text}`}>{alert.reading}</span></p>
                <p className="text-slate-400">Time<span className="block font-semibold text-white">{alert.time}</span></p>
                <p className="text-slate-400">Owner<span className="block font-semibold text-white">{alert.owner}</span></p>
              </div>
              <p className="mt-4 rounded-md border border-cyan-400/10 bg-[#071624]/70 px-3 py-2 text-sm text-slate-200">
                {alert.action}
              </p>
            </article>
          )
        })}
      </section>

      <section className={`${panelClass} mt-4 overflow-hidden`}>
        <h2 className="text-lg font-semibold text-white">Alert History</h2>
        <div className="mt-4 overflow-x-auto">
          <table className="min-w-full text-left text-sm">
            <thead className="border-b border-cyan-400/10 text-xs uppercase text-slate-400">
              <tr>
                <th className="py-3 pr-4 font-semibold">Date</th>
                <th className="py-3 pr-4 font-semibold">Machine</th>
                <th className="py-3 pr-4 font-semibold">Alert</th>
                <th className="py-3 pr-4 font-semibold">Severity</th>
                <th className="py-3 pr-4 font-semibold">Reading</th>
                <th className="py-3 pr-4 font-semibold">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-cyan-400/10">
              {filteredAlerts.map((alert) => {
                const style = severityStyle(alert.severity)

                return (
                  <tr key={alert.id}>
                    <td className="py-3 pr-4 text-slate-300">{alert.date}</td>
                    <td className="py-3 pr-4 font-semibold text-white">{alert.machine}</td>
                    <td className="py-3 pr-4 text-slate-300">{alert.title}</td>
                    <td className="py-3 pr-4">
                      <span className={`rounded-md border px-2 py-1 text-xs font-semibold ${style.badge}`}>
                        {alert.severity}
                      </span>
                    </td>
                    <td className="py-3 pr-4 text-slate-300">{alert.reading}</td>
                    <td className="py-3 pr-4 text-slate-300">{alert.action}</td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  )
}

export default Alerts
