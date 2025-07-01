'use client';
import { useState } from "react";

export default function CyclesPage() {
  const [showCycles, setShowCycles] = useState(true);
  const [showBills, setShowBills] = useState(true);
  
  return (
    <div>
      <aside>
        <section className='flex gap-4'>
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
      </aside>
    </div>
  );
}
