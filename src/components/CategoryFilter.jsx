"use client";

import { Checkbox, CheckboxGroup, Fieldset } from "@chakra-ui/react";
import { useContext } from "react";
import { EventsContext } from "../EventsContext";

export const CategoryFilter = () => {
  const { categories, selectedCheckboxes, selectCheckboxes } =
    useContext(EventsContext);

  return (
    <>
      <Fieldset.Root>
        <CheckboxGroup name="categories">
          <Fieldset.Legend fontSize="sm" mb="2">
            Filter on category
          </Fieldset.Legend>
          <Fieldset.Content>
            {categories.map((category) => (
              <Checkbox.Root
                key={category.id}
                value={category.id}
                name="categoryIds"
                checked={selectedCheckboxes.includes(category.value)}
                onChange={(e) => selectCheckboxes(e)}
                // checked={checked}
                // onChange={onChange}
              >
                <Checkbox.HiddenInput />
                <Checkbox.Control />
                <Checkbox.Label>{category.name}</Checkbox.Label>
              </Checkbox.Root>
            ))}
          </Fieldset.Content>
        </CheckboxGroup>
      </Fieldset.Root>
    </>
  );
};
