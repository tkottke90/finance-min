const activeCycleColors = [
  "text-black",
  "bg-illuminating-emerald-200",
  "border-illuminating-emerald-300",
  "dark:bg-illuminating-emerald-600",
  "dark:border-illuminating-emerald-500",
  "dark:text-white",
].join(" ");

export default function CategoriesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="w-full h-full">
      <h2 className="text-3xl font-bold">Categories</h2>
      <br />
      {children}
    </div>
  );
}
