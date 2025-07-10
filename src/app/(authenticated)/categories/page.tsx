import { prisma } from "@/lib/prisma-client";
import { Prisma } from "@/lib/prisma";
import { AsyncReturnType } from "@/lib/utils/type.utils";
import { CustomComponentProps } from "@/lib/components";

const mockCategories: AsyncReturnType<(typeof prisma)["category"]["findMany"]> =
  [
    {
      id: 1,
      name: "Groceries",
      description: "Expenses for Food",
      color: "red",
      balance: new Prisma.Decimal(0),
      userId: "1",
      isOverflow: false,
      isSubscription: false,
      willOverflow: null,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ];

export default async function CategoriesPage() {
  // const categories = await prisma.category.findMany();
  const categories = mockCategories;

  return categories.map((category) => {
    return (
      <tr key={category.id}>
        <td>{category.name}</td>
        <td className="hidden sm:table-cell">{category.description}</td>
        <td className="text-right">
          <span>$</span>
          <span className="ml-auto">{category.balance.toFixed(2)}</span>
        </td>
        <td className="hidden sm:table-cell text-center">
          {category.updatedAt.toLocaleDateString()}
        </td>
      </tr>
    );
  });
}
