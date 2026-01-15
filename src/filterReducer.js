export const filterReducer = (state, action) => {
  switch (action.type) {
    case "check_category": {
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

    case "search_input": {
      return {
        ...state,
        searchInput: action.payload,
      };
    }
  }
};
