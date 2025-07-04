'use client';
import { useState } from "react";

export default function CyclesPage() {
  return (
    <div className="w-full h-full grid grid-cols-[1fr] sm:grid-cols-[300px_1fr]">
      <aside className="flex justify-start align-center flex-col gap-4 h-full">
        <ToggleButtonGroup />
        <ActiveCycle />
        <hr className="border-t-2 border-zinc-400 dark:border-zinc-300 border"/>
        {/* TODO: Bill & Scheduled Income List */}
      </aside>
    </div>
  );
}


const activeCycleColors = [
  'text-black',
  'bg-illuminating-emerald-200',
  'border-illuminating-emerald-300',
  'dark:bg-illuminating-emerald-600',
  'dark:border-illuminating-emerald-500',
  'dark:text-white'
].join(' ')


export function ActiveCycle() {
  const startDate = new Date(2025, 6, 1);
  const endDate = new Date(2025, 6, 31);

  const daysRemaining = Math.ceil((endDate.getTime() - Date.now()) / (1000 * 60 * 60 * 24));
  const transactionCount = 42;

  return (
    <div className={`card grid grid-cols-[1fr_2.5fr] ${activeCycleColors}`}>
      {/* Cycle Identifier */}
      <div className="text-center">
        <h3>Cycle</h3>
        <h1 className="text-6xl">11</h1>
        <h4>2025</h4>
      </div>

      {/* Cycle Details */}
      <div className="test">
        <p><strong>Start Date:</strong> {startDate.toLocaleDateString()}</p>
        <p><strong>End Date:</strong> {endDate.toLocaleDateString()}</p>
        <p><strong>Days Remaining:</strong> {daysRemaining}</p>
        <p><strong>Transaction Count:</strong> {transactionCount}</p>
      </div>
    </div>
  )
}

function ToggleButtonGroup() {
  const [showCycles, setShowCycles] = useState(true);
  const [showBills, setShowBills] = useState(true);

  return (
    <section className='flex gap-4 justify-evenly'>
      <input readOnly type="checkbox" checked={showCycles} className="hidden" />
      <button
        onClick={() => setShowCycles(!showCycles)}
        className='cycle-btn'
      >
        Cycles
      </button>

      <input readOnly type="checkbox" checked={showBills} className="hidden" />
      <button
        onClick={() => setShowBills(!showBills)}
        className='bills-btn'
      >
          Bills
      </button>
    </section>
  );
}