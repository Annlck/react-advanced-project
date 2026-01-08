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
import { FileUpload, Float, useFileUploadContext } from "@chakra-ui/react";
import { LuFileImage, LuX } from "react-icons/lu";
import { useState, useContext } from "react";
import { useForm } from "react-hook-form";
import { EventsContext } from "../EventsContext";
import { useNavigate } from "react-router-dom";

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
          {console.log(file.name)}
          {console.log(file)}
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
export default function EventFormDialog({ open, onClose, finish }) {
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
      image: "http://localhost:5173/src/images/new-event.jpg",
      categoryIds: checked,
      location: data.location,
      startTime: data.startTime,
      endTime: data.endTime,
    };

    await fetch("http://localhost:3000/events", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newEvent),
    });

    navigate(`/events/${newEvent.id}`);
    finish();
  };

  // handleChange checkboxes
  const [checked, setChecked] = useState([]);
  const handleChange = (e) => {
    const value = Number(e.target.value);
    setChecked((prev) =>
      prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value]
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

              {/* event location */}
              <Field.Root invalid={errors.location} mt={4}>
                <Field.Label>Location</Field.Label>
                <Input
                  type="location"
                  placeholder="i.e. Downtown Bowling Alley"
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
