import { LoadingSkeleton } from "@/components/loading-skeleton";

export default function Loading() {
  return (
    <div className="max-w-4xl mx-auto px-4">
      <div className="bg-white rounded-lg shadow-md p-6">
        <LoadingSkeleton className="h-9 w-48 mb-6" /> {/* Title */}
        
        <div className="mb-6">
          <LoadingSkeleton className="h-7 w-32 mb-3" /> {/* Welcome heading */}
          <LoadingSkeleton className="h-4 w-96" /> {/* Description */}
        </div>
      </div>
    </div>
  );
}
