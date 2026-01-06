import { Outlet } from "react-router-dom";
import { Navigation } from "./Navigation";
import { Box } from "@chakra-ui/react";
import { EventsProvider } from "../EventsContext";

export const Root = () => {
  return (
    <Box>
      <EventsProvider>
        <Navigation />
        <Outlet />
      </EventsProvider>
    </Box>
  );
};
