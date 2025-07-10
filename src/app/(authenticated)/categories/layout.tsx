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

      <table className="border-collapse max-w-3xl">
        <thead className="border-b border-gray-400">
          <tr>
            <th>Name</th>
            <th className="hidden sm:table-cell">Description</th>
            <th>Balance</th>
            <th className="hidden sm:table-cell">Last Used</th>
          </tr>
        </thead>
        <tbody>{children}</tbody>
      </table>
    </div>
  );
}
