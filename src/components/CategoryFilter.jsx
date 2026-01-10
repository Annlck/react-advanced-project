// "use client";

// import { Checkbox, CheckboxGroup, Fieldset } from "@chakra-ui/react";
// import { useContext } from "react";
// import { EventsContext } from "../EventsContext";
// import { useReducer } from "react";
// import { eventsReducer } from "../eventsReducer";

// export const CategoryFilter = () => {
//   const { categories } = useContext(EventsContext);

//   const [state, dispatch] = useReducer(eventsReducer, {
//     selectedCheckboxes: [],
//     checked: [],
//   });

//   return (
//     <>
//       <Fieldset.Root>
//         <CheckboxGroup name="categories">
//           <Fieldset.Legend fontSize="sm" mb="2">
//             Filter on category
//           </Fieldset.Legend>
//           <Fieldset.Content>
//             {categories.map((category) => (
//               <Checkbox.Root
//                 key={category.id}
//                 value={category.id}
//                 name="categoryIds"
//                 checked={state.checked}
//                 onChange={() =>
//                   dispatch({ type: "create_array_of_checked_ids" })
//                 }
//               >
//                 <Checkbox.HiddenInput />
//                 <Checkbox.Control />
//                 <Checkbox.Label>{category.name}</Checkbox.Label>
//               </Checkbox.Root>
//             ))}
//           </Fieldset.Content>
//         </CheckboxGroup>
//       </Fieldset.Root>
//     </>
//   );
// };
