import { createContext } from "react";

export const EventsContext = createContext({});

export function EventsProvider({ children }) {
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
      }}
    >
      {children}
    </EventsContext.Provider>
  );
}
