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
    searchedEvents: [],
  });

  const EventsList = ({ events }) => {
    return (
      <>
        <SimpleGrid columns={[1, 2, 2, 3, 4]} gap="6" p="10" justify="center">
          {events.map((event) => (
            <Link to={`events/${event.id}`} key={event.id}>
              <EventCard key={event.id} event={event} />
            </Link>
          ))}
        </SimpleGrid>
      </>
    );
  };

  const handleSearchBarChange = (input) => {
    const eventsMatchingSearch = allEvents.filter(({ title }) => {
      return title.toLocaleLowerCase().includes(input.toLocaleLowerCase());
    });
    return eventsMatchingSearch;
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
      <Button onClick={(e) => handleSearchBarChange(e.target.value)}>
        Search
      </Button>

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

      {/* events
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
      </SimpleGrid> */}
      {/* events */}

      <EventsList
        events={handleSearchBarChange(state.searchInput)}
        // state.selectedCheckboxes.length === 0
        //   ? allEvents
        //   : state.filteredEvents
      />
      {console.log(state.searchedEvents)}
      {console.log(state.searchInput)}
    </>
  );
};
// };
