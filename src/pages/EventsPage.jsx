import { SimpleGrid } from "@chakra-ui/react";
import { useLoaderData } from "react-router-dom";
import { Link } from "react-router-dom";
import { EventCard } from "../components/EventCard";

export const loader = async () => {
  const response = await fetch("http://localhost:3000/events");
  return { events: await response.json() };
};

export const EventsPage = () => {
  const { events } = useLoaderData();
  return (
    <>
      <SimpleGrid columns={[1, 2, 2, 3, 4]} gap="6" p="10" justify="center">
        {events.map((event) => (
          <div key={event.id}>
            <Link to={`events/${event.id}`}>
              <EventCard key={event.id} event={event} />
            </Link>
          </div>
        ))}
      </SimpleGrid>
    </>
  );
};
