import { Button, SimpleGrid, Link } from "@chakra-ui/react";
import { useLoaderData } from "react-router-dom";
import { Checkbox, CheckboxGroup, Fieldset } from "@chakra-ui/react";
import { useReducer, useContext } from "react";
import { EventsContext } from "../EventsContext";
import { eventsReducer } from "../eventsReducer";
import { EventCard } from "../components/EventCard";
import { SearchBar } from "../components/SearchBar";

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
    searchInput: "",
  });

  const EventsList = () => {
    const eventsMatchingSearch = allEvents.filter(({ title }) => {
      return title
        .toLocaleLowerCase()
        .includes(state.searchInput.toLocaleLowerCase());
    });

    return (
      <>
        <SimpleGrid columns={[1, 2, 2, 3, 4]} gap="6" p="10" justify="center">
          {eventsMatchingSearch.map((event) => (
            <Link to={`events/${event.id}`} key={event.id}>
              <EventCard key={event.id} event={event} />
            </Link>
          ))}
        </SimpleGrid>
      </>
    );
  };

  // const filterEvents = (events) => {
  //   if (
  //     state.filteredEvents.length === 0 &&
  //     state.searchBarInput.length === 0
  //   ) {
  //     return events;
  //   } else if (
  //     state.filteredEvents.length >= 1 &&
  //     state.searchBarInput.length >= 1
  //   ) {
  //     return events;
  //   } else if (
  //     state.filteredEvents.length >= 1 &&
  //     state.searchBarInput.length === 0
  //   ) {
  //     return state.filteredEvents;
  //   } else if (
  //     state.filteredEvents.length === 0 &&
  //     state.searchBarInput.length >= 1
  //   ) {
  //     return events.filter((event) => {
  //       return (
  //         event.title.toLowerCase().includes(inputValue.toLocaleLowerCase()) ||
  //         recipe.recipe.healthLabels.some((healthLabel) =>
  //           healthLabel.toLowerCase().includes(inputValue.toLocaleLowerCase())
  //         )
  //       );
  //     });
  //   } else {
  //     return console.log("No events found");
  //   }
  // };

  return (
    <>
      {/* search bar */}
      <SearchBar
        inputValue={state.searchInput}
        changeFn={(e) =>
          dispatch({
            type: "search_input",
            payload: e.target.value,
          })
        }
      />

      {/* category filter */}
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

      {/* events */}
      <EventsList />
    </>
  );
};
