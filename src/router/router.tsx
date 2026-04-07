import { lazy, Suspense } from "react";
import { createBrowserRouter } from "react-router-dom";
import Loader from "../components/Loader";
import PublicRoute from "../components/Route/public-route";
import PrivateRoute from "../components/Route/private-route";
import AdminLayout from "../layout/admin-layout";

const Login = lazy(() => import("../pages/auth/login"));
const MetaData = lazy(() => import("../pages/dashboard/metadata"));

const router = createBrowserRouter([
  {
    path: "/login",
    element: (
      <Suspense fallback={<Loader />}>
        <PublicRoute>
          <Login />
        </PublicRoute>
      </Suspense>
    ),
  },
  {
    path: "/",
    element: (
      <Suspense fallback={<Loader />}>
        <PrivateRoute>
          <AdminLayout />
        </PrivateRoute>
      </Suspense>
    ),
    children: [
      {
        index: true,
        element: (
          <Suspense fallback={<Loader />}>
            <MetaData />
          </Suspense>
        ),
      },
    ],
  },
]);

export default router;

