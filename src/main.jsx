import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { EventPage, loader as EventLoader } from "./pages/EventPage";
import { EventsPage, loader as EventsLoader } from "./pages/EventsPage";
import { Contact } from "./pages/Contact";
import { Provider } from "./components/ui/provider";
import { Root } from "./components/Root";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: "/",
        element: <EventsPage />,
        loader: EventsLoader,
      },
      {
        path: "/events/:eventId",
        element: <EventPage />,
        loader: EventLoader,
      },
      {
        path: "/contact",
        element: <Contact />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>,
);
