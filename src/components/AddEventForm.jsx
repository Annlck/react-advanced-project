// how to get image uploaded - gewoon URL input van maken

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
  // InputGroup,
} from "@chakra-ui/react";
import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { EventsContext } from "../EventsContext";
import { toaster } from "./ui/toaster";

// form dialog
export default function AddEventForm({ open, onClose, finish }) {
  const { categories } = useContext(EventsContext);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  // set up useNaviage hook
  const navigate = useNavigate();

  // addEvent function
  const addEvent = async (data) => {
    const newEvent = {
      id: self.crypto.randomUUID(),
      createdBy: 0,
      title: data.title,
      description: data.description,
      image: data.image,
      categoryIds: checked,
      location: data.location,
      startTime: `${data.startDate}T${data.startHHMM}:00.000`,
      endTime: `${data.endDate}T${data.endHHMM}:00.000`,
    };

    const result = await fetch("http://localhost:3000/events", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newEvent),
    });

    finish();

    if (result.ok) {
      toaster.create({
        title: "Success",
        description: "Event has been added",
        type: "success",
      });
      navigate(`/events/${newEvent.id}`);
      return;
    } else {
      toaster.create({
        title: "Error",
        description: "Could not add event",
        type: "error",
      });
      return;
    }
  };

  // handleChange checkboxes
  const [checked, setChecked] = useState([]);
  const handleChange = (e) => {
    const value = Number(e.target.value);
    setChecked((prev) =>
      prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value],
    );
  };

  return (
    <Dialog.Root open={open} onOpenChange={onClose}>
      <Dialog.Backdrop />
      <Dialog.Positioner>
        <Dialog.Content>
          <Dialog.Header textStyle="xl">Create a new event</Dialog.Header>
          <form onSubmit={handleSubmit(addEvent)}>
            <Dialog.Body>
              {/* event title */}
              <Field.Root invalid={errors.title} mt={0}>
                <Field.Label>Event title</Field.Label>
                <Input
                  type="text"
                  placeholder="i.e. Bowling night"
                  {...register("title", { required: "Title is required" })}
                />
                <Field.ErrorText>{errors.title?.message}</Field.ErrorText>
              </Field.Root>

              {/* event description */}
              <Field.Root invalid={errors.description} mt={4}>
                <Field.Label>Description</Field.Label>
                <Textarea
                  placeholder="i.e. Strike up some fun with friends at the lanes!"
                  {...register("description", {
                    required: "Description is required",
                  })}
                />
                <Field.ErrorText>{errors.location?.message}</Field.ErrorText>
              </Field.Root>

              {/* event image */}
              <Field.Root invalid={errors.image} mt={4}>
                <Field.Label>Image url</Field.Label>
                <Input
                  type="text"
                  placeholder="i.e. https://images.pexels.com/photos/7429750/pexels-photo-7429750.jpeg"
                  {...register("image", {
                    required: "Image url is required",
                  })}
                />
                <Field.ErrorText>{errors.image?.message}</Field.ErrorText>
              </Field.Root>

              {/* event location */}
              <Field.Root invalid={errors.location} mt={4}>
                <Field.Label>Location</Field.Label>
                <Input
                  type="text"
                  placeholder="i.e. Downtown Bowling Alley"
                  {...register("location", {
                    required: "Location is required",
                  })}
                />
                <Field.ErrorText>{errors.location?.message}</Field.ErrorText>
              </Field.Root>

              {/* event startTime */}
              <HStack gap="10" width="full">
                {/* date */}
                <Field.Root invalid={errors.startDate} mt={4}>
                  <Field.Label>Start date</Field.Label>
                  <Input
                    type="date"
                    {...register("startDate", {
                      required: "Start date is required",
                    })}
                  />
                  <Field.ErrorText>{errors.startDate?.message}</Field.ErrorText>
                </Field.Root>

                {/* time HHMM*/}
                <Field.Root invalid={errors.startHHMM} mt={4}>
                  <Field.Label>Start time</Field.Label>
                  <Input
                    type="time"
                    {...register("startHHMM", {
                      required: "Start time is required",
                    })}
                  />
                  <Field.ErrorText>{errors.startHHMM?.message}</Field.ErrorText>
                </Field.Root>
              </HStack>

              {/* event endTime */}
              <HStack gap="10" width="full">
                {/* date */}
                <Field.Root invalid={errors.endDate} mt={4}>
                  <Field.Label>End date</Field.Label>
                  <Input
                    type="date"
                    {...register("endDate", {
                      required: "End date is required",
                    })}
                  />
                  <Field.ErrorText>{errors.endDate?.message}</Field.ErrorText>
                </Field.Root>

                {/* time HHMM*/}
                <Field.Root invalid={errors.endHHMM} mt={4}>
                  <Field.Label>End time</Field.Label>
                  <Input
                    type="time"
                    {...register("endHHMM", {
                      required: "End time is required",
                    })}
                  />
                  <Field.ErrorText>{errors.endHHMM?.message}</Field.ErrorText>
                </Field.Root>
              </HStack>

              {/* event categories */}
              <Fieldset.Root invalid={errors.categoryIds} mt="4">
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
                        <Checkbox.HiddenInput
                          {...register("categoryIds", {
                            required: "Select at least 1 category",
                          })}
                          value={category.id}
                        />

                        <Checkbox.Control />
                        <Checkbox.Label>{category.name}</Checkbox.Label>
                      </Checkbox.Root>
                    ))}
                  </Fieldset.Content>
                </CheckboxGroup>
                <Fieldset.ErrorText>
                  {errors.categoryIds?.message}
                </Fieldset.ErrorText>
              </Fieldset.Root>
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
                  Add event
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
