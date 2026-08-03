import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import OrganizationSchema from "./components/OrganizationSchema";
import { Provider, useSelector, useDispatch } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { useEffect } from "react";
import { fetchCart } from "./Features/Cart/cartSlice";
import store, { persistor } from "./store";
import ProtectedAdminRoute from "./components/ProtectedAdminRoute";
import {
  HomeLayout,
  Landing,
  Blog,
  SingleBlog,
  Profile,
  Cart,
  Error,
  Meals,
  SingleMeal,
  Checkout,
  Orders,
  OrderSuccess,
  SingleOrder,
  Admin,
  ChangePassword,
  AdminLogin,
  Login,
  Register,
  CreateReminder,
  Reminders,
  AdminMeals,
  AdminBlog,
  AdminCart,
  AdminOrders,
  AdminReminders,
  AdminReviews,
  AdminUsers,
  AdminDashboard,
  UpdateMeal,
  Nutrition,
} from "./pages";

//Actions
import { action as registerAction } from "./actionsAndLoaders/RegisterAction";
import { action as loginAction } from "./actionsAndLoaders/LoginAction";
// import { action as reminderAction } from "./actionsAndLoaders/ReminderAction";

//Loaders
import { loader as mealsLoader } from "./actionsAndLoaders/MealsLoader";
import { loader as singleMealLoader } from "./actionsAndLoaders/SingleMealLoader";
import { loader as ordersLoader } from "./actionsAndLoaders/OrderLoader";
import { loader as singleOrder } from "./actionsAndLoaders/SingleOrderLoader";
import { loader as adminOrdersLoader } from "./actionsAndLoaders/AdminOrdersLoader";
import { loader as adminUsersLoader } from "./actionsAndLoaders/AdminUsersLoader";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,
    },
  },
});

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeLayout />,
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: <Landing />,
        errorElement: <Error />,
      },
      {
        path: "/meals",
        element: <Meals />,
        loader: mealsLoader(queryClient),
        errorElement: <Error />,
      },
      {
        path: "meals/:id",
        element: <SingleMeal />,
        loader: singleMealLoader(queryClient),
        errorElement: <Error />,
      },
      {
        path: "blog",
        element: <Blog />,
      },
      {
        path: "blogs/:id",
        element: <SingleBlog />,
      },
      {
        path: "profile",
        element: <Profile />,
        loader: ordersLoader(queryClient, store),
        errorElement: <Error />,
      },
      {
        path: "cart",
        element: <Cart />,
      },
      {
        path: "checkout",
        element: <Checkout />,
      },
      {
        path: "order-success",
        element: <OrderSuccess />,
      },
      {
        path: "/orders",
        element: <Orders />,
        loader: ordersLoader(queryClient, store),
      },
      {
        path: "/orders/:orderId",
        element: <SingleOrder />,
        loader: singleOrder(queryClient),
      },
      {
        path: "/create-reminders",
        element: <CreateReminder />,
      },
      {
        path: "/reminders",
        element: <Reminders />,
      },
      {
        path: "/nutrition",
        element: <Nutrition />,
      },
    ],
  },
  {
    path: "login",
    element: <Login />,
    action: loginAction(queryClient),
    errorElement: <Error />,
  },
  {
    path: "register",
    element: <Register />,
    action: registerAction,
    errorElement: <Error />,
  },
  {
    path: "admin",
    element: <Admin />,
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: <AdminLogin />,
        action: loginAction(queryClient),
      },
      {
        path: "dashboard",
        element: (
          <ProtectedAdminRoute>
            <AdminDashboard />
          </ProtectedAdminRoute>
        ),
      },
      {
        path: "meals",
        loader: mealsLoader(queryClient),
        element: (
          <ProtectedAdminRoute>
            <AdminMeals />
          </ProtectedAdminRoute>
        ),
      },
      {
        path: "meals/:mealId/edit",
        element: (
          <ProtectedAdminRoute>
            <UpdateMeal />
          </ProtectedAdminRoute>
        ),
      },
      {
        path: "blog",
        element: (
          <ProtectedAdminRoute>
            <AdminBlog />
          </ProtectedAdminRoute>
        ),
      },
      {
        path: "cart",
        element: (
          <ProtectedAdminRoute>
            <AdminCart />
          </ProtectedAdminRoute>
        ),
      },
      {
        path: "orders",
        element: (
          <ProtectedAdminRoute>
            <AdminOrders />
          </ProtectedAdminRoute>
        ),
        loader: adminOrdersLoader(queryClient, store),
      },
      {
        path: "reminders",
        element: (
          <ProtectedAdminRoute>
            <AdminReminders />
          </ProtectedAdminRoute>
        ),
      },
      {
        path: "users",
        element: (
          <ProtectedAdminRoute>
            <AdminUsers />
          </ProtectedAdminRoute>
        ),
        loader: adminUsersLoader(queryClient, store),
      },
      {
        path: "reviews",
        element: (
          <ProtectedAdminRoute>
            <AdminReviews />
          </ProtectedAdminRoute>
        ),
      },
    ],
  },
], {
  future: {
    v7_startTransition: true,
    v7_relativeSplatPath: true,
  },
});

// Cart initialization component
const CartInitializer = () => {
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.user?.user?._id);

  useEffect(() => {
    if (userId) {
      dispatch(fetchCart(userId));
    }
  }, [dispatch, userId]);

  return null;
};

const App = () => {
  return (
    <HelmetProvider>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <QueryClientProvider client={queryClient}>
            <CartInitializer />
            <OrganizationSchema />
            <RouterProvider router={router} />
            <ReactQueryDevtools initialIsOpen={false} />
          </QueryClientProvider>
        </PersistGate>
      </Provider>
    </HelmetProvider>
  );
};

export default App;
