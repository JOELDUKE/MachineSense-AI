import { AlertTriangle, CheckCircle2 } from 'lucide-react'
import { alerts } from '../data/dummyData'

function AlertCard() {
  return (
    <section className="rounded-lg border border-cyan-400/10 bg-[#0d1a2d] p-5 shadow-xl shadow-black/20">
      <div className="flex items-center gap-3">
        <div className="grid h-10 w-10 place-items-center rounded-md border border-amber-300/20 bg-amber-300/10 text-amber-200">
          <AlertTriangle size={20} aria-hidden="true" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-white">Recent Alerts</h3>
          <p className="text-sm text-slate-400">Latest machine events</p>
        </div>
      </div>

      <div className="mt-5 space-y-3">
        {alerts.map((alert) => {
          const resolved = alert.severity === 'Resolved'
          const Icon = resolved ? CheckCircle2 : AlertTriangle

          return (
            <div
              key={alert.id}
              className={`rounded-md border p-4 ${
                resolved
                  ? 'border-lime-400/20 bg-lime-400/10'
                  : 'border-amber-300/20 bg-amber-300/10'
              }`}
            >
              <div className="flex items-start gap-3">
                <Icon
                  className={resolved ? 'text-lime-300' : 'text-amber-300'}
                  size={18}
                  aria-hidden="true"
                />
                <div>
                  <p className="font-semibold text-white">{alert.title}</p>
                  <p className="mt-1 text-sm text-slate-400">
                    {alert.machine} / {alert.time}
                  </p>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}

export default AlertCard
