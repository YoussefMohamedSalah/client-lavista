import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import { ShoppingCategoryTableShell } from "@/components/e-commerce/shopping-categories/shopping-categories-table-shell";

interface ShoppingCategoryTableProps {
  url: string;
}

async function ShoppingCategoryTable({ url }: ShoppingCategoryTableProps) {
  const session = await getServerSession(authOptions);

  const apiResponse = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${session?.user.accessToken}`,
    },
  });

  const shoppingCategories = await apiResponse.json();
  const pageCount = shoppingCategories.total_pages;

  return (
    <div className="px-2 py-10">
      <ShoppingCategoryTableShell
        data={shoppingCategories.results}
        pageCount={pageCount}
      />
    </div>
  );
}

export default ShoppingCategoryTable;
