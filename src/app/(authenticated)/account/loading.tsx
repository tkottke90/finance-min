import { LoadingSkeleton } from "@/components/loading-skeleton";

export function AccountPageSkeleton() {
  return (
    <div className="card text-zinc-800 dark:text-white">
      <div className="mb-6">
        <LoadingSkeleton className="h-9 w-32 mb-2" /> {/* Title */}
      </div>

      <div className="space-y-6">
        {/* Name field */}
        <div className="form-field">
          <LoadingSkeleton className="h-4 w-16 mb-2" /> {/* Label */}
          <LoadingSkeleton className="h-12 w-full" /> {/* Input */}
        </div>

        {/* Email field */}
        <div className="form-field">
          <LoadingSkeleton className="h-4 w-12 mb-2" /> {/* Label */}
          <LoadingSkeleton className="h-12 w-full" /> {/* Input */}
        </div>

        {/* Button */}
        <div className="flex justify-end gap-2">
          <LoadingSkeleton className="h-12 w-20" /> {/* Update button */}
        </div>
      </div>

      {/* Development section skeleton */}
      <div className="mt-8">
        <LoadingSkeleton className="h-px w-full mb-4" /> {/* HR */}
        <LoadingSkeleton className="h-6 w-48 mb-2" /> {/* Details summary */}
      </div>
    </div>
  );
}

export default function Loading() {
  return <AccountPageSkeleton />;
}
