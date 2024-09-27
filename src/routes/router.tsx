import { createBrowserRouter, RouteObject } from "react-router-dom";
import { Home } from "../pages/home";
import { ErrorPage } from "../pages/errorPage";
import { SidebarCalendar } from "../components/sidebarMobile/calendar";
import { AccSettings } from "../components/taskLayout/accSettings/accSettings";
import { MailSub } from "../components/taskLayout/mailSub/mailSub";
import { Test } from "../test/test";
import { Login } from "../pages/login";
import { Register } from "../pages/register";
import { SidebarMobile } from "../ui/home/sidebar/sidebarMobile";
import { HomeSkeleton } from "../pages/homeSkeleton";

const routes: RouteObject[] = [
  {
    path: "/",
    element: <HomeSkeleton />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/u/:userName",
    element: <Home />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/mSideNav",
    element: <SidebarMobile />,
  },
  {
    path: "/calendar",
    element: <SidebarCalendar />,
  },
  {
    path: "/accountSettings",
    element: <AccSettings />,
  },
  {
    path: "/mailSub",
    element: <MailSub />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/signUp",
    element: <Register />,
  },
  {
    path: "/test",
    element: <Test />,
  },
];

export const router = createBrowserRouter(routes);
