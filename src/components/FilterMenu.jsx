import {
  Button,
  CloseButton,
  Drawer,
  Portal,
  CheckboxGroup,
  Fieldset,
  Text,
} from "@chakra-ui/react";
import { LuFilter } from "react-icons/lu";
import { useState } from "react";
import { useReducer } from "react";
import { filterReducer } from "../filterReducer";

export const FilterMenu = ({ checkboxes }) => {
  const [filterOpen, setFilterOpen] = useState(false);

  const [state, dispatch] = useReducer(filterReducer, {
    selectedCheckboxes: [],
  });

  return (
    <Drawer.Root open={filterOpen} onOpenChange={(e) => setFilterOpen(e.open)}>
      <Drawer.Trigger asChild>
        <Button
          variant="outline"
          onClick={() => {
            setFilterOpen(true);
          }}
        >
          <LuFilter />
          <Text hideBelow="md">Filter</Text>
        </Button>
      </Drawer.Trigger>
      <Portal>
        <Drawer.Backdrop />
        <Drawer.Positioner>
          <Drawer.Content>
            <Drawer.Header>
              <Drawer.Title>Filter events</Drawer.Title>
            </Drawer.Header>
            <Drawer.Body>
              <Fieldset.Root>
                <CheckboxGroup
                  value={state.selectedCheckboxes}
                  checked={state.selectedCheckboxes}
                  onChange={(e) =>
                    dispatch({
                      type: "create_array_of_checked_ids",
                      payload: e.target.value,
                    })
                  }
                  name="categories"
                >
                  <Fieldset.Legend fontSize="sm" mb="2">
                    Category
                  </Fieldset.Legend>
                  <Fieldset.Content>{checkboxes}</Fieldset.Content>
                </CheckboxGroup>
              </Fieldset.Root>
            </Drawer.Body>
            <Drawer.Footer>
              <Button onClick={() => setFilterOpen(false)}>Apply Filter</Button>
            </Drawer.Footer>
            <Drawer.CloseTrigger asChild>
              <CloseButton size="sm" />
            </Drawer.CloseTrigger>
          </Drawer.Content>
        </Drawer.Positioner>
      </Portal>
    </Drawer.Root>
  );
};
