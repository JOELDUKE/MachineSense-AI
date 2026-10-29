import {
  Activity,
  BarChart3,
  Bell,
  BrainCircuit,
  FileText,
  Home,
  Settings,
  User,
  Wrench,
  Zap,
} from 'lucide-react'
import { NavLink } from 'react-router-dom'

const navItems = [
  { name: 'Dashboard', path: '/', icon: Home },
  { name: 'Machines', path: '/machines', icon: Activity },
  { name: 'Alerts', path: '/alerts', icon: Bell, badge: 5 },
  { name: 'Analytics', path: '/analytics', icon: BarChart3 },
  { name: 'Energy', path: '/analytics', icon: Zap },
  { name: 'AI Prediction', path: '/prediction', icon: BrainCircuit },
  { name: 'Reports', path: '/reports', icon: FileText },
  { name: 'Maintenance', path: '/machines/2', icon: Wrench },
  { name: 'Settings', path: '/settings', icon: Settings },
  { name: 'Profile', path: '/', icon: User },
]

function Sidebar() {
  return (
    <aside className="fixed inset-y-0 left-0 z-30 hidden w-64 border-r border-cyan-400/10 bg-[#020b14] shadow-2xl shadow-black/40 lg:block">
      <div className="flex h-16 items-center gap-3 border-b border-cyan-400/10 px-5">
        <div className="grid h-8 w-8 place-items-center rounded-md border border-cyan-400/40 bg-cyan-400/10 text-cyan-300">
          <BrainCircuit size={20} aria-hidden="true" />
        </div>
        <h1 className="text-lg font-bold text-white">MachineSense AI</h1>
      </div>

      <nav className="px-3 py-5">
        <div className="space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon

            return (
              <NavLink
                key={item.name}
                to={item.path}
                className={({ isActive }) =>
                  [
                    'flex items-center justify-between rounded-md px-3 py-3 text-sm font-medium transition',
                    isActive
                      ? 'border border-blue-500/20 bg-blue-600/25 text-white shadow-lg shadow-blue-950/30'
                      : 'text-slate-300 hover:bg-white/5 hover:text-white',
                  ].join(' ')
                }
              >
                <span className="flex items-center gap-3">
                  <Icon size={19} aria-hidden="true" />
                  {item.name}
                </span>
                {item.badge ? (
                  <span className="rounded-full bg-red-500 px-2 py-0.5 text-xs font-bold text-white">
                    {item.badge}
                  </span>
                ) : null}
              </NavLink>
            )
          })}
        </div>
      </nav>

      <div className="absolute bottom-4 left-3 right-3 space-y-3">
        <div className="rounded-lg border border-cyan-400/10 bg-[#071624] p-4">
          <div className="flex items-center gap-3">
            <span className="h-5 w-5 rounded-full bg-lime-400 shadow-[0_0_16px_rgba(163,230,53,0.8)]" />
            <div>
              <p className="text-sm text-slate-300">System Status</p>
              <p className="text-xs text-slate-400">All Systems Operational</p>
            </div>
          </div>
        </div>

        <div className="rounded-lg border border-cyan-400/10 bg-[#071624] p-4">
          <div className="flex items-end justify-between">
            <div>
              <p className="text-3xl font-bold text-blue-400">12</p>
              <p className="mt-1 text-xs text-slate-300">Machines Connected</p>
            </div>
            <Activity className="text-blue-400" size={40} aria-hidden="true" />
          </div>
          <div className="mt-4 h-12 rounded bg-[linear-gradient(135deg,rgba(59,130,246,0.28),transparent)]" />
          <p className="mt-3 border-t border-cyan-400/10 pt-3 text-xs text-slate-400">
            Last Updated: 10:45 AM
          </p>
        </div>
      </div>
    </aside>
  )
}

export default Sidebar
