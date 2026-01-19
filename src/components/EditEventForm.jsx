"use client";
import {
  Button,
  Input,
  Textarea,
  VStack,
  Field,
  Dialog,
  HStack,
  Checkbox,
  CheckboxGroup,
  Fieldset,
  Text,
} from "@chakra-ui/react";
import { useState, useContext } from "react";
import { useForm } from "react-hook-form";
import { EventsContext } from "../EventsContext";
import { useNavigate } from "react-router-dom";
import { getTime } from "./getTime";

// form dialog
export default function EditEventForm({ eventToEdit, open, onClose, finish }) {
  const { categories } = useContext(EventsContext);

  // maybe add function, if field empty or field not changed => dont push to backend?
  // dirtyFields of useForm?

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      title: eventToEdit.title,
      description: eventToEdit.description,
      image: eventToEdit.image,
      categoryIds: eventToEdit.categoryIds,
      location: eventToEdit.location,
      startTime: getTime(eventToEdit.startTime),
      endTime: getTime(eventToEdit.endTime),
    },
  });

  // handleChange checkboxes
  const [checked, setChecked] = useState(eventToEdit.categoryIds);

  const handleChange = (e) => {
    const value = Number(e.target.value);
    setChecked((prev) =>
      prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value]
    );
  };
  // set up useNaviage hook
  const navigate = useNavigate();

  // editEvent function
  const editEvent = async (data) => {
    const editedEvent = {
      title: data.title,
      description: data.description,
      image: data.image,
      categoryIds: checked,
      location: data.location,
      startTime: data.startTime,
      endTime: data.endTime,
    };

    await fetch(`http://localhost:3000/events/${eventToEdit.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(editedEvent),
    });

    navigate(`/events/${eventToEdit.id}`);
    finish();
  };

  return (
    <Dialog.Root open={open} onOpenChange={onClose}>
      <Dialog.Backdrop />
      <Dialog.Positioner>
        <Dialog.Content>
          <Dialog.Header textStyle="xl">Edit event</Dialog.Header>
          <form onSubmit={handleSubmit(editEvent)}>
            <Dialog.Body>
              {/* event title */}
              <Field.Root invalid={errors.title} mt={0}>
                <Field.Label>Event title</Field.Label>
                <Input
                  type="text"
                  placeholder={eventToEdit.title}
                  {...register(
                    "title"
                    // , { required: "Title is required" }
                  )}
                />
                <Field.ErrorText>{errors.title?.message}</Field.ErrorText>
              </Field.Root>

              {/* event description */}
              <Field.Root invalid={errors.description} mt={4}>
                <Field.Label>Description</Field.Label>
                <Textarea
                  placeholder={eventToEdit.description}
                  {...register(
                    "description"
                    // , { required: "Description is required" }
                  )}
                />
                <Field.ErrorText>{errors.location?.message}</Field.ErrorText>
              </Field.Root>

              {/* event location */}
              <Field.Root invalid={errors.location} mt={4}>
                <Field.Label>Location</Field.Label>
                <Input
                  type="location"
                  placeholder={eventToEdit.location}
                  {...register(
                    "location"
                    // , { required: "Location is required"}
                  )}
                />
                <Field.ErrorText>{errors.location?.message}</Field.ErrorText>
              </Field.Root>

              {/* event startTime */}
              <HStack gap="10" width="full">
                <Field.Root invalid={errors.startTime} mt={4}>
                  <Field.Label>Start time</Field.Label>
                  <Input
                    type="time"
                    {...register(
                      "startTime"
                      // , { required: "Start time is required" }
                    )}
                  />
                  <Field.ErrorText>{errors.startTime?.message}</Field.ErrorText>
                </Field.Root>

                {/* event endTime */}
                <Field.Root invalid={errors.endTime} mt={4}>
                  <Field.Label>End time</Field.Label>
                  <Input
                    type="time"
                    {...register(
                      "endTime"
                      // , { required: "End time is required" }
                    )}
                  />
                  <Field.ErrorText>{errors.endTime?.message}</Field.ErrorText>
                </Field.Root>
              </HStack>

              <HStack gap="10" width="full" mt="4">
                {/* event categories */}
                <Fieldset.Root>
                  <CheckboxGroup name="categories">
                    <Fieldset.Legend fontSize="sm" mb="2">
                      Select categories
                    </Fieldset.Legend>
                    <Fieldset.Content>
                      {categories.map((category) => (
                        <Checkbox.Root
                          key={category.id}
                          value={category.id}
                          name="categoryIds"
                          checked={checked.includes(category.value)}
                          onChange={(e) => handleChange(e)}
                        >
                          <Checkbox.HiddenInput />
                          <Checkbox.Control />
                          <Checkbox.Label>{category.name}</Checkbox.Label>
                        </Checkbox.Root>
                      ))}
                    </Fieldset.Content>
                  </CheckboxGroup>
                </Fieldset.Root>
              </HStack>
            </Dialog.Body>

            {/* footer buttons */}
            <Dialog.Footer>
              <VStack w="full" spacing={3}>
                <Button
                  onClick={onClose}
                  variant="outline"
                  width="full"
                  type="button"
                >
                  Cancel
                </Button>
                <Button type="submit" isLoading={isSubmitting} width="full">
                  Apply changes
                </Button>
                {errors.name && <Text>{errors.name.message}</Text>}
              </VStack>
            </Dialog.Footer>
          </form>
        </Dialog.Content>
      </Dialog.Positioner>
    </Dialog.Root>
  );
}
