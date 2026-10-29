import { Bell, CalendarDays, ChevronDown, Maximize, Menu, UserCircle } from 'lucide-react'

function Navbar() {
  return (
    <header className="sticky top-0 z-20 border-b border-cyan-400/10 bg-[#020b14]/95 backdrop-blur">
      <div className="flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
        <button
          className="grid h-10 w-10 place-items-center rounded-md text-slate-300 hover:bg-white/5"
          type="button"
          title="Menu"
        >
          <Menu size={24} aria-hidden="true" />
        </button>

        <div className="flex items-center gap-3">
          <div className="hidden items-center gap-2 rounded-md border border-cyan-400/10 bg-white/5 px-3 py-2 text-sm text-white sm:flex">
            <span className="h-2.5 w-2.5 rounded-full bg-lime-400" />
            Live
          </div>
          <button
            className="relative grid h-10 w-10 place-items-center rounded-md text-slate-200 hover:bg-white/5"
            type="button"
            title="Alerts"
          >
            <Bell size={21} aria-hidden="true" />
            <span className="absolute right-1 top-1 rounded-full bg-red-500 px-1.5 text-[10px] font-bold text-white">
              5
            </span>
          </button>
          <button
            className="hidden h-10 w-10 place-items-center rounded-md text-slate-200 hover:bg-white/5 sm:grid"
            type="button"
            title="Full screen"
          >
            <Maximize size={20} aria-hidden="true" />
          </button>
          <div className="hidden items-center gap-2 rounded-md border border-cyan-400/10 bg-white/5 px-3 py-2 text-sm text-slate-200 xl:flex">
            <CalendarDays size={16} aria-hidden="true" />
            May 20, 2025&nbsp;&nbsp;10:45 AM
            <ChevronDown size={16} aria-hidden="true" />
          </div>
          <div className="flex items-center gap-2 text-sm text-white">
            <UserCircle size={34} className="text-slate-300" aria-hidden="true" />
            <span className="hidden sm:inline">Admin</span>
            <ChevronDown size={16} aria-hidden="true" />
          </div>
        </div>
      </div>
    </header>
  )
}

export default Navbar
