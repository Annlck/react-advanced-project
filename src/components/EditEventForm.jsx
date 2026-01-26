// require at least 1 checkbox to be selected
// doesn't show checked checkboxes properly. Functionality works, but checks don't show on form
// how to get image uploaded

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
  FileUpload,
  Float,
  useFileUploadContext,
} from "@chakra-ui/react";
import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { LuFileImage, LuX } from "react-icons/lu";
import { EventsContext } from "../EventsContext";
import { toaster } from "./ui/toaster";
import { getTime } from "./getTime";

// image upload
const FileUploadList = () => {
  const fileUpload = useFileUploadContext();
  const files = fileUpload.acceptedFiles;
  if (files.length === 0) return null;
  return (
    <FileUpload.ItemGroup>
      {files.map((file) => (
        <FileUpload.Item
          w="auto"
          boxSize="20"
          p="2"
          file={file}
          key={file.name}
        >
          <FileUpload.ItemPreviewImage />
          <Float placement="top-end">
            <FileUpload.ItemDeleteTrigger boxSize="4" layerStyle="fill.solid">
              <LuX />
            </FileUpload.ItemDeleteTrigger>
          </Float>
        </FileUpload.Item>
      ))}
    </FileUpload.ItemGroup>
  );
};

// form dialog
export default function EditEventForm({ eventToEdit, open, onClose, finish }) {
  const { categories } = useContext(EventsContext);

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
      prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value],
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

    const result = await fetch(
      `http://localhost:3000/events/${eventToEdit.id}`,
      {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editedEvent),
      },
    );

    finish();

    if (result.ok) {
      toaster.create({
        title: "Success",
        description: "Event has been edited",
        type: "success",
      });
      navigate(`/events/${eventToEdit.id}`);
      return;
    } else {
      toaster.create({
        title: "Error",
        description: "Could not edit event",
        type: "error",
      });
      return;
    }
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
                  {...register("title", { required: "Title is required" })}
                />
                <Field.ErrorText>{errors.title?.message}</Field.ErrorText>
              </Field.Root>

              {/* event description */}
              <Field.Root invalid={errors.description} mt={4}>
                <Field.Label>Description</Field.Label>
                <Textarea
                  placeholder={eventToEdit.description}
                  {...register("description", {
                    required: "Description is required",
                  })}
                />
                <Field.ErrorText>{errors.description?.message}</Field.ErrorText>
              </Field.Root>

              {/* event location */}
              <Field.Root invalid={errors.location} mt={4}>
                <Field.Label>Location</Field.Label>
                <Input
                  type="location"
                  placeholder={eventToEdit.location}
                  {...register("location", {
                    required: "Location is required",
                  })}
                />
                <Field.ErrorText>{errors.location?.message}</Field.ErrorText>
              </Field.Root>

              {/* event startTime */}
              <HStack gap="10" width="full">
                <Field.Root invalid={errors.startTime} mt={4}>
                  <Field.Label>Start time</Field.Label>
                  <Input
                    type="time"
                    {...register("startTime", {
                      required: "Start time is required",
                    })}
                  />
                  <Field.ErrorText>{errors.startTime?.message}</Field.ErrorText>
                </Field.Root>

                {/* event endTime */}
                <Field.Root invalid={errors.endTime} mt={4}>
                  <Field.Label>End time</Field.Label>
                  <Input
                    type="time"
                    {...register("endTime", {
                      required: "End time is required",
                    })}
                  />
                  <Field.ErrorText>{errors.endTime?.message}</Field.ErrorText>
                </Field.Root>
              </HStack>

              <HStack gap="10" width="full" mt="4">
                {/* event categories */}
                <Fieldset.Root invalid={errors.categoryIds}>
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
                          // checked doesnt work
                          checked={checked.includes(category.id)}
                          onChange={(e) => handleChange(e)}
                        >
                          <Checkbox.HiddenInput />
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

                {/* event image */}
                <FileUpload.Root accept="image/*">
                  <FileUpload.HiddenInput />
                  <FileUpload.Trigger asChild>
                    <Button variant="outline" size="sm">
                      <LuFileImage /> Upload Image
                    </Button>
                  </FileUpload.Trigger>
                  <FileUploadList />
                </FileUpload.Root>
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
