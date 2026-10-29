import MachineCard from '../components/MachineCard'
import { machines } from '../data/dummyData'

function Machines() {
  return (
    <div>
      <div className="mb-5">
        <h2 className="text-2xl font-bold text-white">Machines</h2>
        <p className="text-sm text-slate-400">Monitor health, temperature, vibration, and power.</p>
      </div>
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {machines.map((machine) => (
          <MachineCard key={machine.id} machine={machine} />
        ))}
      </div>
    </div>
  )
}

export default Machines
