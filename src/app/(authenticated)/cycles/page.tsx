'use client';
import { CustomComponentProps } from "@/lib/components";
import { useState } from "react";

export default function CyclesPage() {
  const [showCycles, setShowCycles] = useState(true);
  const [showBills, setShowBills] = useState(true);
  
  return (
    <div className="w-full h-full">
      <aside className="flex justify-start align-center flex-col gap-4 h-full">
       
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

        <ActiveCycle />

        <hr className="border-t-2 border-zinc-400 dark:border-zinc-300 border"/>

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
  return (
    <div className={`card grid grid-cols-[1fr_2fr] ${activeCycleColors}`}>
      {/* Cycle Identifier */}
      <div className="text-center">
        <h3>Cycle</h3>
        <h1 className="text-5xl">11</h1>
        <h4>2025</h4>
      </div>

      {/* Cycle Details */}
      <div>
        <p><strong>Start Date:</strong> 2025-01-01</p>
        <p><strong>End Date:</strong> 2025-01-31</p>
        <p><strong>Days Remaining:</strong> 15</p>
        <p><strong>Transaction Count:</strong> 42</p>
      </div>
    </div>
  )
}