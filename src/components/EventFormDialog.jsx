"use client";
import { useForm } from "react-hook-form";
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
} from "@chakra-ui/react";
import { FileUpload, Float, useFileUploadContext } from "@chakra-ui/react";
import { LuFileImage, LuX } from "react-icons/lu";
import { useState, useEffect } from "react";

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

export default function EventFormDialog({ open, onClose, finish }) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  // set default values
  useForm({
    defaultValues: {
      id: self.crypto.randomUUID(),
      createdBy: 0,
      title: "",
      description: "",
      image: "src/images/new-event.png",
      categoryIds: [],
      location: "",
      startTime: "",
      endTime: "",
    },
  });

  // addEvent function
  const addEvent = async (data) => {
    await fetch("http://localhost:3000/events", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id: self.crypto.randomUUID(),
        createdBy: 0,
        title: data.title,
        description: data.description,
        image: "src/images/new-event.jpg",
        categoryIds: checked,
        location: data.location,
        startTime: data.startTime,
        endTime: data.endTime,
      }),
    });
    finish();
  };

  // GET categories from events.json for checkboxes
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    async function fetchCategories() {
      const response = await fetch("http://localhost:3000/categories");
      const json = await response.json();
      setCategories(json);
    }
    fetchCategories();
  }, []);

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
          <Dialog.Header>Add Event</Dialog.Header>
          <form onSubmit={handleSubmit(addEvent)}>
            <Dialog.Body>
              {/* event title */}
              <Field.Root invalid={errors.title} mt={4}>
                <Field.Label>Event title</Field.Label>
                <Input
                  type="text"
                  placeholder="i.e. bowling night"
                  {...register("title", { required: "title is required" })}
                />
                <Field.ErrorText>{errors.title?.message}</Field.ErrorText>
              </Field.Root>

              {/* event description */}
              <Field.Root invalid={errors.description} mt={4}>
                <Field.Label>Description</Field.Label>
                <Textarea
                  placeholder="tell a bit more about the event"
                  {...register("description", {
                    required: "description is required",
                  })}
                />
                <Field.ErrorText>{errors.location?.message}</Field.ErrorText>
              </Field.Root>

              {/* event location */}
              <Field.Root invalid={errors.location} mt={4}>
                <Field.Label>Location</Field.Label>
                <Input
                  type="location"
                  placeholder="i.e. bowling alley"
                  {...register("location", {
                    required: "location is required",
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
                      required: "startTime is required",
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
                      required: "endTime is required",
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
              </VStack>
            </Dialog.Footer>
          </form>
        </Dialog.Content>
      </Dialog.Positioner>
    </Dialog.Root>
  );
}
