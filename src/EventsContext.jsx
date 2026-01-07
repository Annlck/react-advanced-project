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
      }}
    >
      {children}
    </EventsContext.Provider>
  );
}
