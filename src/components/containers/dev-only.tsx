

export default function DevOnly({ children }: Readonly<{ children: React.ReactNode; }>) {
  if (process.env.NODE_ENV !== 'development') {
    return null;
  }

  return <div className="mt-8">{children}</div>;
}
