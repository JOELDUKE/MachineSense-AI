function HealthCard({ label, value, icon: Icon, tone = 'cyan' }) {
  const tones = {
    cyan: 'border-cyan-400/20 bg-cyan-400/10 text-cyan-200',
    green: 'border-lime-400/20 bg-lime-400/10 text-lime-200',
    amber: 'border-amber-300/20 bg-amber-300/10 text-amber-200',
    indigo: 'border-violet-400/20 bg-violet-400/10 text-violet-200',
  }

  return (
    <article className="rounded-lg border border-cyan-400/10 bg-[#0d1a2d] p-5 shadow-xl shadow-black/20">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-medium text-slate-400">{label}</p>
          <p className="mt-2 text-3xl font-bold text-white">{value}</p>
        </div>
        <div className={`grid h-10 w-10 place-items-center rounded-md border ${tones[tone]}`}>
          <Icon size={20} aria-hidden="true" />
        </div>
      </div>
    </article>
  )
}

export default HealthCard
