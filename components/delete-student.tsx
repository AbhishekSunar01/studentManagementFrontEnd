import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Delete } from "lucide-react";

type DeleteStudentProps = {
  id: number; // id should ideally be required for deletion
  onStudentDeleted: () => void; // Callback to refresh the list
};

export function DeleteStudent({ id, onStudentDeleted }: DeleteStudentProps) {
  async function handleDelete() {
    if (!id) {
      console.error("No student ID provided for deletion.");
      return;
    }
    try {
      const response = await fetch(
        `http://localhost:8080/api/v1/students/${id}`,
        {
          method: "DELETE",
        }
      );

      if (response.ok) {
        console.log("Student deleted successfully:", id);
        // Call the callback to notify the parent to re-fetch
        onStudentDeleted();
      } else {
        console.error("Failed to delete student:", response.statusText);
        // Potentially show a user-friendly error message
      }
    } catch (error) {
      console.error("Error deleting student:", error);
      // Potentially show a user-friendly error message
    }
  }

  return (
    <Dialog>
      <form>
        <DialogTrigger asChild>
          <Button variant="destructive" type="button">
            <Delete className="h-4 w-4" />
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Delete Student</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this student? This action cannot
              be undone.
            </DialogDescription>
          </DialogHeader>

          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button type="submit" variant="destructive" onClick={handleDelete}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  );
}
