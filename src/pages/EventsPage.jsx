import { SimpleGrid, Button } from "@chakra-ui/react";
import { useLoaderData, Link } from "react-router-dom";
import { EventCard } from "../components/EventCard";
import { Checkbox, CheckboxGroup, Fieldset } from "@chakra-ui/react";
import { useReducer, useContext } from "react";
import { EventsContext } from "../EventsContext";
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
  const [state, dispatch] = useReducer(eventsReducer, {
    selectedCheckboxes: [],
    checked: false,
    filteredEvents: [],
  });

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
                <Checkbox.HiddenInput />
                <Checkbox.Control />
                <Checkbox.Label>{category.name}</Checkbox.Label>
              </Checkbox.Root>
            ))}
          </Fieldset.Content>
        </CheckboxGroup>
      </Fieldset.Root>
      <Button
        onClick={() =>
          dispatch({
            type: "filter_events",
            payload: allEvents,
          })
        }
      ></Button>

      <SimpleGrid columns={[1, 2, 2, 3, 4]} gap="6" p="10" justify="center">
        {state.selectedCheckboxes.length === 0
          ? allEvents.map((event) => (
              <Link to={`events/${event.id}`} key={event.id}>
                <EventCard key={event.id} event={event} />
              </Link>
            ))
          : state.filteredEvents.map((event) => (
              <Link to={`events/${event.id}`} key={event.id}>
                <EventCard key={event.id} event={event} />
              </Link>
            ))}
      </SimpleGrid>
    </>
  );
};
