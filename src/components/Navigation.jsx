import { Flex, Link, HStack } from "@chakra-ui/react";
import { useState } from "react";
import { Toaster, toaster } from "./ui/toaster";
import { ColorModeToggle } from "./ColorModeToggle";
import { useNavigate } from "react-router";
import EventForm from "./EventForm";

export const Navigation = () => {
  const [modalOpen, setModalOpen] = useState(false);
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

    setModalOpen(false);

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
    <>
      <nav>
        <Flex
          position="sticky"
          top={0}
          zIndex="sticky"
          bgColor="blue.800"
          paddingX={{ base: "2", sm: "10" }}
          paddingY="2"
          justify={{ base: "space-evenly", sm: "space-between" }}
        >
          <HStack
            justify={{ base: "space-between", sm: "flex-start" }}
            gap={{ base: "6", sm: "10" }}
          >
            {/* events page */}
            <Link color="white" href="/">
              Events
            </Link>

            {/* add event page */}
            <Link
              color="white"
              onClick={() => {
                setModalOpen(true);
              }}
            >
              Add Event
            </Link>

            {/* contact page */}
            <Link color="white" href="/contact">
              Contact us
            </Link>
          </HStack>

          <ColorModeToggle />
        </Flex>
      </nav>

      <EventForm
        open={modalOpen}
        onClose={() => {
          setModalOpen(false);
        }}
        onCheckboxChange={(e) => handleChange(e)}
        changeFn={addEvent}
        submitButtonText="Add event"
        placeholderEvent={{
          title: "i.e. Bowling night",
          description: "i.e. Strike up some fun with friends at the lanes!",
          image:
            "i.e. https://images.pexels.com/photos/7429750/pexels-photo-7429750.jpeg",
          location: "i.e. Downtown Bowling Alley",
        }}
      />

      <Toaster />
    </>
  );
};
