function MetricPanel({ icon: Icon, label, value, detail, tone = 'cyan' }) {
  const tones = {
    cyan: 'border-cyan-400/20 bg-cyan-400/10 text-cyan-200',
    lime: 'border-lime-400/20 bg-lime-400/10 text-lime-200',
    amber: 'border-amber-300/20 bg-amber-300/10 text-amber-200',
    red: 'border-red-400/20 bg-red-400/10 text-red-200',
    violet: 'border-violet-400/20 bg-violet-400/10 text-violet-200',
    blue: 'border-blue-400/20 bg-blue-400/10 text-blue-200',
  }

  return (
    <article className="rounded-lg border border-cyan-400/10 bg-[#0d1a2d] p-5 shadow-xl shadow-black/20">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm text-slate-400">{label}</p>
          <p className="mt-2 text-3xl font-bold text-white">{value}</p>
          {detail ? <p className="mt-1 text-sm text-slate-400">{detail}</p> : null}
        </div>
        <div className={`grid h-11 w-11 place-items-center rounded-md border ${tones[tone]}`}>
          <Icon size={22} aria-hidden="true" />
        </div>
      </div>
    </article>
  )
}

export default MetricPanel
