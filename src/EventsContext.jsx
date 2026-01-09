import { createContext, useState, useEffect } from "react";

export const EventsContext = createContext({});
export function EventsProvider({ children }) {
  const [categories, setCategories] = useState([]);
  const [selectedCheckboxes, setSelectedCheckboxes] = useState([]);

  // Get categories
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

  // create array of selected categoryIds in checkbox
  const selectCheckboxes = (e) => {
    const value = Number(e.target.value);
    setSelectedCheckboxes((prev) =>
      prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value]
    );
  };

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
        setSelectedCheckboxes,
      }}
    >
      {children}
    </EventsContext.Provider>
  );
}
