import { BrainCircuit } from 'lucide-react'
import { predictions } from '../data/dummyData'

function PredictionCard() {
  const prediction = predictions[0]
  const stats = [
    { label: 'Health Score', value: `${prediction.healthScore}%`, color: 'text-lime-200' },
    {
      label: 'Failure Probability',
      value: `${prediction.failureProbability}%`,
      color: 'text-amber-200',
    },
    {
      label: 'Remaining Useful Life',
      value: `${prediction.remainingUsefulLife} Days`,
      color: 'text-cyan-200',
    },
  ]

  return (
    <section className="rounded-lg border border-violet-400/20 bg-[#151128] p-5 shadow-xl shadow-violet-950/20">
      <div className="flex items-center gap-3">
        <div className="grid h-10 w-10 place-items-center rounded-md border border-violet-300/20 bg-violet-400/10 text-violet-200">
          <BrainCircuit size={20} aria-hidden="true" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-white">AI Prediction</h3>
          <p className="text-sm text-violet-200">{prediction.confidence}% confidence</p>
        </div>
      </div>

      <div className="mt-5 rounded-md border border-violet-300/10 bg-black/20 p-4">
        <p className="text-xl font-bold text-white">{prediction.title}</p>
        <div className="mt-4 grid gap-3 sm:grid-cols-3">
          {stats.map((stat) => (
            <div key={stat.label} className="rounded-md bg-white/5 p-3">
              <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                {stat.label}
              </p>
              <p className={`mt-2 text-lg font-bold ${stat.color}`}>{stat.value}</p>
            </div>
          ))}
        </div>
        <div className="mt-4 rounded-md border border-lime-400/20 bg-lime-400/10 p-3">
          <p className="text-xs font-medium uppercase tracking-wide text-lime-200">
            Recommendation
          </p>
          <p className="mt-2 text-sm text-slate-100">{prediction.recommendation}</p>
        </div>
      </div>
    </section>
  )
}

export default PredictionCard
