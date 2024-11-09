import { useUser } from "@/context/userContext";
import { useQuery } from "@apollo/client";
import { GET_ALL_USER_GOALS } from "@/lib/queries/getAllUserGoals";
export const FetchallUserGoals = (username: string) => {
  //   console.log(username);
  const {
    data,
    loading,
    error,
    refetch: refetchGoals,
  } = useQuery(GET_ALL_USER_GOALS, {
    variables: { username: username },
    fetchPolicy: "cache-first",
  });
  //   const success = data.getAllUserGoals.success;
  return { data, loading, error, refetchGoals };
};
