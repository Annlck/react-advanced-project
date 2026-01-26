// doesn't show checked checkboxes properly when filtering. Functionality works, but checks don't show on form
// (works the 1st time you filter, not the 2nd time).

// how to use "[loading, setLoading] = useState(true);"? I am using a loader, so where/how can I handle the loading state?

// when filtering & showing 2 or 3  results, the grid display looks weird on bigger screens (too much spacing)

import { SimpleGrid, AbsoluteCenter, Checkbox, Flex } from "@chakra-ui/react";
import { useLoaderData } from "react-router-dom";
import { useReducer, useContext } from "react";
import { EventsContext } from "../EventsContext";
import { filterReducer } from "../filterReducer";
import { EventCard } from "../components/EventCard";
import { SearchBar } from "../components/SearchBar";
import { FilterMenu } from "../components/FilterMenu";
// import EventCardSkeleton from "../components/EventCardSkeleton";

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

  return (
    <>
      <Flex justify="center" mx="10" my="6">
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
        <FilterMenu
          checkboxes={categories.map((category) => (
            <Checkbox.Root
              key={category.id}
              value={category.id}
              name="categoryIds"
              // checked doesnt work
              checked={state.selectedCheckboxes.includes(category.id)}
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
        />
      </Flex>

      {/* events */}
      {filteredEvents.length === 0 ? (
        <AbsoluteCenter>No events found</AbsoluteCenter>
      ) : (
        <SimpleGrid
          gap={4}
          minChildWidth={{ base: "200px", md: "300px" }}
          mx="10"
        >
          {filteredEvents.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}

          {/* Skeleton test */}
          {/* {Array.from({ length: 12 }).map((_, i) => (
            <EventCardSkeleton key={i} />
          ))} */}
        </SimpleGrid>
      )}
    </>
  );
};
