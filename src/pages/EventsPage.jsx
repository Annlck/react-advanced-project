import { SimpleGrid, AbsoluteCenter, Checkbox, Flex } from "@chakra-ui/react";
import { useReducer, useContext, useEffect, useState } from "react";
import { EventsContext } from "../EventsContext";
import { filterReducer } from "../filterReducer";
import { EventCard } from "../components/EventCard";
import { SearchBar } from "../components/SearchBar";
import { FilterMenu } from "../components/FilterMenu";
import EventCardSkeleton from "../components/EventCardSkeleton";

export const EventsPage = () => {
  const { categories } = useContext(EventsContext);
  const [state, dispatch] = useReducer(filterReducer, {
    selectedCheckboxes: [],
    searchInput: "",
  });

  const [allEvents, setAllEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvents = async () => {
      const eventsResponse = await fetch("http://localhost:3000/events");
      const eventsData = await eventsResponse.json();
      setAllEvents(eventsData);
      setLoading(false);
    };
    fetchEvents();
  }, []);

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
      {loading ? (
        <SimpleGrid columns={[1, 2, 2, 3, 4]} gap={4} mx="10">
          {Array.from({ length: 12 }).map((_, i) => (
            <EventCardSkeleton key={i} />
          ))}
        </SimpleGrid>
      ) : filteredEvents.length === 0 ? (
        <AbsoluteCenter>No events found</AbsoluteCenter>
      ) : (
        <SimpleGrid columns={[1, 2, 2, 3, 4]} gap={4} mx="10">
          {filteredEvents.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </SimpleGrid>
      )}
    </>
  );
};
