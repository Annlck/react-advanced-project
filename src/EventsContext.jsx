import { createContext, useState, useEffect } from "react";

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

  return (
    <EventsContext.Provider
      value={{
        categories,
        matchCategories,
      }}
    >
      {children}
    </EventsContext.Provider>
  );
}
