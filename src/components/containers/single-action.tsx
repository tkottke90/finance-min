'use client';

export default function SingleActionLayout({ children, className }: Readonly<{ children: React.ReactNode; className?: string; }>) {
  return <div className="flex h-full w-full justify-center py-8">
    <div className={`w-fit sm:h-fit p-8 ${className}`}>
      {children}
    </div>
  </div>;
}
