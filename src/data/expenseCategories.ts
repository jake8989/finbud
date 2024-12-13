// const expenseCategories = [
//   {
//     category: "Cloths",
//     key: 1,
//   },
//   {
//     category: "Rent",
//     key: 7,
//   },
//   {
//     category: "Stationary",
//     key: 2,
//   },
//   {
//     category: "Clothing & (Shoes,Accessories etc.)",
//     key: 5,
//   },
//   {
//     category: "Groceries",
//     key: 6,
//   },
//   {
//     category: "Utilities (Electricity, Water, Gas)",
//     key: 8,
//   },
//   {
//     category: "Feul",
//     key: 9,
//   },
//   {
//     category: "Parking",
//     key: 10,
//   },
//   {
//     category: "Public Transportation (Bus, Train, etc.)",
//     key: 11,
//   },
//   {
//     category: "Dining Out",
//     key: 12,
//   },
//   {
//     category: "Personal Grooming (Haircuts, Skincare, etc.)",
//     key: 13,
//   },
//   {
//     category: "Doctor Visits",
//     key: 14,
//   },
//   {
//     category: "Movies & Streaming Services (Netflix, Spotify, etc.)",
//     key: 15,
//   },
//   {
//     category: "Sports & Fitness (Gym, Sports Equipment)",
//     key: 16,
//   },
//   {
//     category: "Events (Concerts, Festivals, etc.)",
//     key: 17,
//   },
//   {
//     category: "School/College Fees",
//     key: 18,
//   },
//   {
//     category: "Online Courses & Subscriptions",
//     key: 19,
//   },

//   {
//     category: "Investment Accounts (Stocks, Mutual Funds, etc.)",
//     key: 20,
//   },
//   {
//     category: "Loan Repayments (Personal, Auto, etc.)",
//     key: 21,
//   },
//   {
//     category: "EMI",
//     key: 31,
//   },
//   {
//     category: "Student Loan Payments",
//     key: 22,
//   },
//   {
//     category: "Gifts for Family & Friends",
//     key: 23,
//   },
//   {
//     category: "Phones & Accessories",
//     key: 24,
//   },
//   {
//     category: "Repairs & Maintenance",
//     key: 25,
//   },

//   {
//     category: "Travel & Vacations",
//     key: 27,
//   },
//   {
//     category: "Socializing",
//     key: 28,
//   },
//   {
//     category: "Personal Savings",
//     key: 0,
//   },
//   {
//     category: "Short term Savings",
//     key: 30,
//   },
//   {
//     category: "Miscellaneous Purchases (Impulse buys, small household items)",
//     key: 26,
//   },
// ];
// export default expenseCategories;
import { useState, useEffect } from "react";
import { useQuery } from "@apollo/client";
import { GET_ALL_EXPENSES_CATEGORIES } from "@/lib/queries/getAllexpenseCategories";

export const FetchExpenseCategories = (username: string) => {
  const [expenseCategories, setExpenseCategories] = useState([]);
  const { data, loading, error, refetch } = useQuery(
    GET_ALL_EXPENSES_CATEGORIES,
    {
      variables: { username },
      fetchPolicy: "cache-first",
      skip: !username,
      // pollInterval: 300000,
    }
  );

  useEffect(() => {
    if (data && data.getAllExpenseCategories.success) {
      const categories = data.getAllExpenseCategories.userExpenseCategories.map(
        (category, index) => ({ key: index, category })
      );
      setExpenseCategories(categories);
    }
  }, [data]);

  return { expenseCategories, loading, error, refetch };
};
