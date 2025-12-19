import { useContext } from "react";
import { useState, createContext } from "react";

export const EventsContext = createContext({});

export function EventsProvider({ children }) {
  const [selectedEvent, setSelectedEvent] = useState();

  //   const addEvent = (event) => {
  //     ////
  //   };

  //   const deleteEvent = (event) => {
  //     ////
  //   };

  return (
    <EventsContext.Provider value={{ selectedEvent, setSelectedEvent }}>
      {children}
    </EventsContext.Provider>
  );
}

export const useEvent = () => {
  const context = useContext(EventsContext);
  if (!context) {
    throw new Error("no context found...");
  }
  return context;
};
