import { SimpleGrid, Button } from "@chakra-ui/react";
import { useLoaderData, Link } from "react-router-dom";
import { EventCard } from "../components/EventCard";
import { Checkbox, CheckboxGroup, Fieldset } from "@chakra-ui/react";
import { useReducer } from "react";
import { useContext } from "react";
import { EventsContext } from "../EventsContext";
import { useState } from "react";
import { eventsReducer } from "../eventsReducer";

export const loader = async () => {
  const eventsResponse = await fetch("http://localhost:3000/events");
  return {
    allEvents: await eventsResponse.json(),
  };
};

export const EventsPage = () => {
  const { categories } = useContext(EventsContext);
  const { allEvents } = useLoaderData();
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [state, dispatch] = useReducer(eventsReducer, {
    selectedCheckboxes: [],
    checked: false,
  });

  // filter events based on selectedCheckboxes
  const filterEvents = () => {
    const eventsArray = allEvents.filter(({ categoryIds }) => {
      return state.selectedCheckboxes.some((id) => {
        return categoryIds.includes(id);
      });
    });
    setFilteredEvents(eventsArray);
  };

  return (
    <>
      <Fieldset.Root>
        <CheckboxGroup name="categories">
          <Fieldset.Legend fontSize="sm" mb="2">
            Filter on category
          </Fieldset.Legend>
          <Fieldset.Content>
            {categories.map((category) => (
              <Checkbox.Root
                key={category.id}
                value={category.id}
                name="categoryIds"
                checked={() => dispatch({ type: "checkCategory" })}
                onChange={() =>
                  dispatch({
                    type: "create_array_of_checked_ids",
                    payload: category.id,
                  })
                }
              >
                {console.log(state.selectedCheckboxes)}
                <Checkbox.HiddenInput />
                <Checkbox.Control />
                <Checkbox.Label>{category.name}</Checkbox.Label>
              </Checkbox.Root>
            ))}
          </Fieldset.Content>
        </CheckboxGroup>
      </Fieldset.Root>
      <Button onClick={filterEvents}></Button>

      <SimpleGrid columns={[1, 2, 2, 3, 4]} gap="6" p="10" justify="center">
        {filteredEvents.map((event) => (
          <Link to={`events/${event.id}`} key={event.id}>
            <EventCard key={event.id} event={event} />
          </Link>
        ))}
      </SimpleGrid>
    </>
  );
};
