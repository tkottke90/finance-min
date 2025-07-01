import { useSearchParams } from "next/navigation";

export function LoginError() {
  const searchParams = useSearchParams();
  const error = searchParams.get('error');

  if (!error) return null;

  return (
    <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
      <p>Authentication Error: {decodeURIComponent(error)}</p>
    </div>
  );
}