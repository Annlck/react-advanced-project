import { SimpleGrid, AbsoluteCenter, Heading } from "@chakra-ui/react";
import { useLoaderData, Link } from "react-router-dom";
import { EventCard } from "../components/EventCard";
import { CategoryFilter } from "../components/CategoryFilter";
import { useContext } from "react";
import { EventsContext } from "../EventsContext";

export const loader = async () => {
  const eventsResponse = await fetch("http://localhost:3000/events");
  return {
    allEvents: await eventsResponse.json(),
  };
};

export const EventsPage = () => {
  const { allEvents } = useLoaderData();
  const { selectedCheckboxes, filteredEvents } = useContext(EventsContext);

  console.log("allEvents");
  console.log(allEvents);

  console.log("selectedCheckboxes");
  console.log(selectedCheckboxes);

  console.log("selectedCheckboxes length");
  console.log(selectedCheckboxes.length);

  console.log("filteredEvents");
  console.log(filteredEvents);

  console.log("filteredEvents length");
  console.log(filteredEvents.length);

  return (
    <>
      <CategoryFilter />

      {filteredEvents.length === 0 ? (
        <AbsoluteCenter>
          <Heading> No events found</Heading>
        </AbsoluteCenter>
      ) : (
        <SimpleGrid columns={[1, 2, 2, 3, 4]} gap="6" p="10" justify="center">
          {filteredEvents.map((event) => (
            <Link to={`events/${event.id}`} key={event.id}>
              <EventCard key={event.id} event={event} />
            </Link>
          ))}
        </SimpleGrid>
      )}
    </>
  );
};
