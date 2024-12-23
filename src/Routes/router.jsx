import {createBrowserRouter} from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../Pages/Home/Home";
import AddProducts from "../Pages/AddProducts/AddProducts";
import EditProduct from "../Pages/EditProduct/EditProduct";
import Registration from "../Pages/Registration/Registration";
  
export const router = createBrowserRouter([
    {
      path: "/",
        element: <Main />,
        children: [
            {
                path: '/',
                element: <Home/>
          },
          {
            path: '/addProducts',
            element: <AddProducts/>
          },
          {
            path: '/edit_product/:id',
            element: <EditProduct/>
          },
          {
            path: '/registration',
            element: <Registration/>
          }
      ]
    },
  ]);