import { gql, useQuery } from "@apollo/client";
import { GET_ACCUMULATED_DATA } from "@/lib/queries/GetAccumulatedData";
import { useUser } from "@/context/userContext";
import { useState, useEffect } from "react";

export const useFetchMonthlyData = (year: string, username: string) => {
  const { user, userLoading } = useUser();
  const [expenseData, setExpenseData] = useState<number[]>(Array(12).fill(0));
  const [incomeData, setIncomeData] = useState<number[]>(Array(12).fill(0));

  const shouldSkipQuery = !user;

  const {
    data: MonthlyData,
    loading: queryLoading,
    error,
    refetch: refetchMonthlyData,
  } = useQuery(GET_ACCUMULATED_DATA, {
    variables: {
      data: {
        username: username,
        year: year,
      },
    },
    fetchPolicy: "cache-first",
    pollInterval: 300000,
    skip: shouldSkipQuery || !username,
  });

  useEffect(() => {
    if (MonthlyData?.getAccumulatedData?.success) {
      const fetchedExpenseData = MonthlyData.getAccumulatedData.expense;
      const fetchedIncomeData = MonthlyData.getAccumulatedData.income;

      setExpenseData(
        Array.isArray(fetchedExpenseData)
          ? fetchedExpenseData
          : Array(12).fill(0)
      );
      setIncomeData(
        Array.isArray(fetchedIncomeData) ? fetchedIncomeData : Array(12).fill(0)
      );
    }
  }, [MonthlyData]);

  const loading = queryLoading || userLoading;

  return {
    loading,
    error,
    expenseData,
    incomeData,
    refetchMonthlyData,
  };
};
