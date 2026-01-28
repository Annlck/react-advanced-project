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
import { useContext } from "react";
import { useForm } from "react-hook-form";
import { EventsContext } from "../EventsContext";

// form dialog
export default function EventForm({
  open,
  onClose,
  changeFn,
  placeholderEvent,
  onCheckboxChange,
  submitButtonText,
  defaultValues,
}) {
  const { categories } = useContext(EventsContext);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: defaultValues,
  });

  return (
    <Dialog.Root open={open} onOpenChange={onClose}>
      <Dialog.Backdrop />
      <Dialog.Positioner>
        <Dialog.Content>
          <Dialog.Header textStyle="xl">Create a new event</Dialog.Header>
          <form onSubmit={handleSubmit(changeFn)}>
            <Dialog.Body>
              {/* event title */}
              <Field.Root invalid={errors.title} mt={0}>
                <Field.Label>Event title</Field.Label>
                <Input
                  type="text"
                  placeholder={placeholderEvent.title}
                  {...register("title", { required: "Title is required" })}
                />
                <Field.ErrorText>{errors.title?.message}</Field.ErrorText>
              </Field.Root>

              {/* event description */}
              <Field.Root invalid={errors.description} mt={4}>
                <Field.Label>Description</Field.Label>
                <Textarea
                  placeholder={placeholderEvent.title}
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
                  placeholder={placeholderEvent.title}
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
                  placeholder={placeholderEvent.title}
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
                        // checked={checked.includes(category.value)}
                        onChange={onCheckboxChange}
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
                  {submitButtonText}
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
