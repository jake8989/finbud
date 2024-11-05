import TrackerDrawer from "@/components/Drawer/TrackerDrawer";
import { useUser } from "@/context/userContext";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { useToast } from "@/context/customToastContext";
const TrackExpense = () => {
  const { user, userLoading } = useUser();
  const router = useRouter();
  const { toast } = useToast();
  // console.log(user, userLoading);

  useEffect(() => {
    console.log("user");
    if (!userLoading) {
      if (!user) {
        console.log("No User");
        toast("Login/Signup required for this step!", "info", 2000);
        router.push("/");
      }
    }
  }, [user, router, userLoading]);
  return (
    <>
      <TrackerDrawer></TrackerDrawer>
      {/* <h1>Tracker</h1> */}
    </>
  );
};
export default TrackExpense;
