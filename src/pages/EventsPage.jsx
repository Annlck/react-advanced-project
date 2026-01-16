import {
  SimpleGrid,
  Link,
  AbsoluteCenter,
  Checkbox,
  CheckboxGroup,
  Fieldset,
} from "@chakra-ui/react";
import { useLoaderData } from "react-router-dom";
import { useReducer, useContext } from "react";
import { EventsContext } from "../EventsContext";
import { filterReducer } from "../filterReducer";
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
  const [state, dispatch] = useReducer(filterReducer, {
    selectedCheckboxes: [],
    checked: false,
    searchInput: "",
  });

  const eventsMatchingSearch = allEvents.filter(({ title }) => {
    return title
      .toLocaleLowerCase()
      .includes(state.searchInput.toLocaleLowerCase());
  });

  const filteredEvents =
    state.selectedCheckboxes.length === 0
      ? eventsMatchingSearch
      : eventsMatchingSearch.filter(({ categoryIds }) => {
          return state.selectedCheckboxes.some((id) => {
            return categoryIds.includes(id);
          });
        });

  console.log(filteredEvents);

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
                checked={() => dispatch({ type: "check_category" })}
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

      {/* events */}
      {filteredEvents.length === 0 ? (
        <AbsoluteCenter>No events found</AbsoluteCenter>
      ) : (
        <SimpleGrid columns={[1, 2, 2, 3, 4]} gap="6" p="10" justify="center">
          {filteredEvents.map((event) => (
            <Link href={`/events/${event.id}`} key={event.id}>
              <EventCard key={event.id} event={event} />
            </Link>
          ))}
        </SimpleGrid>
      )}
    </>
  );
};
