import { createContext, useState, useEffect } from "react";

export const EventsContext = createContext({});
export function EventsProvider({ children }) {
  // Get categories
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    async function fetchCategories() {
      const response = await fetch("http://localhost:3000/categories");
      const json = await response.json();
      setCategories(json);
    }
    fetchCategories();
  }, []);

  // match categories
  const matchCategories = (eventCategoryId) => {
    let categoryName;

    categories.forEach((category) => {
      if (eventCategoryId === category.id) {
        categoryName = category.name;
        return categoryName;
      }
    });
    return categoryName;
  };

  // Get events
  const [allEvents, setAllEvents] = useState([]);

  useEffect(() => {
    async function fetchEvents() {
      const response = await fetch("http://localhost:3000/events");
      const json = await response.json();
      setAllEvents(json);
    }
    fetchEvents();
  }, []);

  // create array of selected categoryIds in checkbox
  const [selectedCheckboxes, setSelectedCheckboxes] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);

  const selectCheckboxes = (e) => {
    const value = Number(e.target.value);

    // create selectedCheckboxes array
    setSelectedCheckboxes((prev) =>
      prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value]
    );

    // filter events based on selectedCheckboxes
    const matchingEvents = allEvents.filter(({ categoryIds }) => {
      return selectedCheckboxes.some((id) => {
        return categoryIds.includes(id);
      });
    });

    setFilteredEvents(matchingEvents);
  };

  // // filter events based on selectedCheckboxes
  // const filterEvents = (allEvents, checkboxArray) =>
  //   setFilteredEvents(
  //     allEvents.filter(({ categoryIds }) => {
  //       return checkboxArray.some((id) => {
  //         return categoryIds.includes(id);
  //       });
  //     })
  //   );

  // delete event
  const deleteEvent = async (eventId) => {
    const result = await fetch(`http://localhost:3000/events/${eventId}`, {
      method: "DELETE",
    });

    if (!result.ok) {
      console.error("could not delete event");
      return;
    }
  };

  return (
    <EventsContext.Provider
      value={{
        deleteEvent,
        categories,
        matchCategories,
        selectCheckboxes,
        selectedCheckboxes,
        // setSelectedCheckboxes,
        filteredEvents,
        // filterEvents,
      }}
    >
      {children}
    </EventsContext.Provider>
  );
}
