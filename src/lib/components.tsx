

export type CustomComponentProps<T = Record<string, unknown>> =
  Readonly<{
    children: React.ReactNode;
    className?: string
  } & T>;

