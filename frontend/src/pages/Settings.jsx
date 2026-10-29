function Settings() {
  return (
    <div>
      <div className="mb-5">
        <h2 className="text-2xl font-bold text-white">Settings</h2>
        <p className="text-sm text-slate-400">Configure alert thresholds and cloud sync later.</p>
      </div>
      <section className="rounded-lg border border-cyan-400/10 bg-[#0d1a2d] p-5 shadow-xl shadow-black/20">
        <div className="grid gap-4 md:grid-cols-2">
          <label className="block">
            <span className="text-sm font-medium text-slate-300">Temperature alert threshold</span>
            <input
              className="mt-2 w-full rounded-md border border-cyan-400/10 bg-white/5 px-3 py-2 text-white outline-none focus:border-cyan-400"
              defaultValue="60C"
            />
          </label>
          <label className="block">
            <span className="text-sm font-medium text-slate-300">Vibration alert threshold</span>
            <input
              className="mt-2 w-full rounded-md border border-cyan-400/10 bg-white/5 px-3 py-2 text-white outline-none focus:border-cyan-400"
              defaultValue="0.75"
            />
          </label>
        </div>
      </section>
    </div>
  )
}

export default Settings
