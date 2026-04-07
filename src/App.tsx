import { RouterProvider } from "react-router-dom";
import router from "./router/router";
import { useEffect } from "react";
import { getToken, removeToken } from "./utils/helper";
import { useGetAdminQuery } from "./redux/api";
import Loader from "./components/Loader";

function App() {
  const token = getToken();
  const { isLoading, isError, error } = useGetAdminQuery(undefined, {
    skip: !token,
  });

  useEffect(() => {
    if (isError) {
      console.log("error::", error);
      removeToken();
      window.location.href = "/login";
    }
  }, [isError, error]);

  if (token && isLoading) return <Loader />;

  return <RouterProvider router={router} />;
}

export default App;
