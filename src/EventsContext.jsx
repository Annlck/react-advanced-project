import { createContext, useState, useEffect } from "react";
import { toaster } from "./components/ui/toaster";

export const EventsContext = createContext({});
export function EventsProvider({ children }) {
  const [categories, setCategories] = useState([]);

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

  // delete event
  const deleteEvent = async (eventId) => {
    const result = await fetch(`http://localhost:3000/events/${eventId}`, {
      method: "DELETE",
    });

    if (result.ok) {
      toaster.create({
        title: "Success",
        description: "Event has been deleted",
        type: "success",
      });
      return;
    } else {
      toaster.create({
        title: "Error",
        description: "Could not delete event",
        type: "error",
      });
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
