export const eventsReducer = (state, action) => {
  switch (action.type) {
    case "checkCategory": {
      return { ...state, checked: !state.checked };
    }

    case "create_array_of_checked_ids": {
      return {
        ...state,
        selectedCheckboxes: state.selectedCheckboxes.includes(action.payload)
          ? state.selectedCheckboxes.filter((v) => v !== action.payload)
          : [...state.selectedCheckboxes, action.payload],
      };
    }

    case "filter_events": {
      return {
        ...state,
        filteredEvents: action.payload.filter(({ categoryIds }) => {
          return state.selectedCheckboxes.some((id) => {
            return categoryIds.includes(id);
          });
        }),
      };
    }

    case "search_input": {
      return {
        ...state,
        searchInput: action.payload,
      };
    }
  }
};
