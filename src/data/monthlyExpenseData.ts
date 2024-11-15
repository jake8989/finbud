import React from "react";
import { GET_CATEGORY_WISE_EXPENSES } from "@/lib/queries/getCategoryWiseExpenseData";
import { useQuery } from "@apollo/client";
import { categoryWiseExpenseData } from "@/utils/types";
import { CHART_COLORS } from "@/utils/colors";
export const useFetchMonthlyExpenseData = (year: string, username: string) => {
  const [cateogoryWiseExpenseData, setCategoryWiseExpenseData] =
    React.useState();
  const {
    data: categoryWiseExpense,
    loading,
    error,
    refetch: refetchCategoryWiseExpense,
  } = useQuery(GET_CATEGORY_WISE_EXPENSES, {
    variables: {
      data: {
        year: year,
        username: username,
      },
    },
    fetchPolicy: "cache-first",
    skip: !username,
  });

  React.useEffect(() => {
    if (categoryWiseExpense?.getCategoryWiseExpenseData?.success) {
      const colors = Object.values(CHART_COLORS) as string[];

      // Map through each category and add a background color
      const categorizedExpensesWithColors =
        categoryWiseExpense?.getCategoryWiseExpenseData?.categoryWiseExpenses.map(
          (category, index) => ({
            ...category,
            backgroundColor: colors[index % colors.length], // Cycle through colors
          })
        );

      setCategoryWiseExpenseData(categorizedExpensesWithColors);
    }
  }, [categoryWiseExpense]);
  console.log(categoryWiseExpense);
  return {
    cateogoryWiseExpenseData,
    loading,
    error,
    refetchCategoryWiseExpense,
  };
};
