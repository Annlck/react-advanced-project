import { Button, CloseButton, Dialog, Portal } from "@chakra-ui/react";
import { useNavigate } from "react-router";
import { toaster } from "./ui/toaster";

export const DeleteEventDialog = ({ eventToDelete, open, onClose, finish }) => {
  // set up useNaviage hook
  const navigate = useNavigate();

  // delete event
  const deleteEvent = async (eventId) => {
    const result = await fetch(`http://localhost:3000/events/${eventId}`, {
      method: "DELETE",
    });

    finish();

    if (result.ok) {
      toaster.create({
        title: "Success",
        description: "Event has been deleted",
        type: "success",
      });
      navigate("/");
      return;
    } else {
      toaster.create({
        title: "Error",
        description: "Could not delete event",
        type: "error",
      });
      return;
    }
  };

  return (
    <Dialog.Root open={open} onOpenChange={onClose} role="alertdialog">
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content>
            <Dialog.Header>
              <Dialog.Title>Are you sure?</Dialog.Title>
            </Dialog.Header>
            <Dialog.Body>
              <p>
                This action cannot be undone, it will permanently delete this
                event.
              </p>
            </Dialog.Body>
            <Dialog.Footer>
              <Dialog.ActionTrigger asChild>
                <Button variant="outline">Cancel</Button>
              </Dialog.ActionTrigger>
              <Button
                colorPalette="red"
                onClick={() => deleteEvent(eventToDelete.id)}
              >
                Delete
              </Button>
            </Dialog.Footer>
            <Dialog.CloseTrigger asChild>
              <CloseButton size="sm" />
            </Dialog.CloseTrigger>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
};
