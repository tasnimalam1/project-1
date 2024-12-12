import {
    createBrowserRouter
} from "react-router-dom";
import ErrorPage from "../Component/ErrorPage";
import Login from "../Component/Login";
import Register from "../Component/Register";
import AuthLayOut from "../MainLayOut/AuthLayOut";
import MainLayOut from "../MainLayOut/MainLayOut";
import AddVisa from "../Pages/AddVisa";
import AllVisas from "../Pages/AllVisas";
import Home from "../Pages/Home";
import MyAddedVisas from "../Pages/MyAddedVisas";
import MyVisa from "../Pages/MyVisa";
import VisaDetails from "../Pages/VisaDetails";
import PrivetRoute from "./PrivetRoute";

  const router = createBrowserRouter([
    {
      path: "/",
      element: <MainLayOut></MainLayOut>,
      children:[
        {
            path: "/",
            element: <Home></Home>
        },
        {
            path:  "/all-visas",
            element: <AllVisas></AllVisas>,
            loader: () => fetch('https://visa-navigator-server-theta.vercel.app/visas')
        },
        {
            path:  "/add-visa",
            element: <PrivetRoute>
                <AddVisa></AddVisa>
            </PrivetRoute>,
        },
        {
            path:  "/my-added-visas",
            element: <PrivetRoute>
                <MyAddedVisas></MyAddedVisas>
            </PrivetRoute>,
        },
        {
            path:  "/my-visa-applications",
            element: <PrivetRoute>
                <MyVisa></MyVisa>
            </PrivetRoute>,
        },
        {
            path: "/visa-details/:id",
            element: <PrivetRoute>
                <VisaDetails></VisaDetails>
                </PrivetRoute>,
            loader: ({params}) => fetch(`https://visa-navigator-server-theta.vercel.app/visas/${params.id}`)
        },
      ]
    },
    {
        path: "/auth",
        element: <AuthLayOut></AuthLayOut>,
        children: [
            {
                path: "/auth/login",
                element: <Login></Login>,
            },
            {
                path: "/auth/register",
                element: <Register></Register>
            },
        ]
    },
    {
        path: "*",
        element: <ErrorPage></ErrorPage>
    }
  ]);

export default router;