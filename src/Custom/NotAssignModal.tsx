import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";

const options = [
  "This action has not been assigned.",
  "Wrong Button",
  "Not a valid action",
  "This action is not available",
  "This action is not allowed",
  "This action is not supported",
  "Wait for version 2.",
];

export function NotAssignDialog({
  isOpen,
  setIsOpen,
}: {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
}) {
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className={cn("dark:text-white")}>Note</DialogTitle>
          <DialogDescription className={cn("dark:text-white")}>
            {/* This action has not been assigned. */}
            {options[Math.floor(Math.random() * 7)]}
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button
            type="button"
            variant="outline"
            onClick={() => setIsOpen(false)}
            className={cn("dark:text-white dark:bg-black/80")}
          >
            Exit
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
