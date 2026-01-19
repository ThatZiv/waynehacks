"use client";
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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CirclePlus } from "lucide-react";
import { Checkbox } from "../ui/checkbox";
import React from "react";
import createTeam from "@/actions/teams/create";
import { toast } from "sonner";

export default function CreateTeamDialog() {
  const teamNameRef = React.useRef<HTMLInputElement>(null);
  const openInviteRef = React.useRef<HTMLButtonElement>(null);

  const [open, setOpen] = React.useState(false);
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const tst = toast.loading("Creating team...");
    const teamName = teamNameRef.current?.value;
    const openInvite =
      openInviteRef.current?.getAttribute("aria-checked") === "true";

    // if (!teamName) {
    //   toast.error("Team name is required.");
    //   return;
    // }

    try {
      // validation
      if (!teamName) {
        throw new Error("Please provide a team name");
      }

      const resp = await createTeam(teamName, openInvite);
      if (!resp.ok) {
        throw new Error(resp.error);
      }
      toast.success("Team created successfully!", {
        id: tst,
      });
      setOpen(false);
    } catch (error: any) {
      console.error("Error creating team:", error);
      toast.error(error.message || "An unknown error occurred.", {
        id: tst,
      });
    }
  };
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <form>
        <DialogTrigger className="w-full" asChild>
          <Button>
            <div className="wh-btn flex items-center justify-center">
              <span>Create Team</span>
              <CirclePlus className="ml-2 h-5 w-5" />
            </div>{" "}
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Create team</DialogTitle>
            <DialogDescription>
              Create a new team for Wayne Hacks. You can invite members after
              creating the team.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4">
            <div className="grid gap-3">
              <Label htmlFor="name-1">Team Name</Label>
              <Input id="name-1" ref={teamNameRef} name="name" />
            </div>
            <div className="flex items-start space-x-2">
              <Label htmlFor="open-invite-1">Open Invite?</Label>
              <Checkbox
                id="open-invite-1"
                name="open-invite"
                ref={openInviteRef}
                defaultChecked={false}
                className="bg-secondary"
              />
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <DialogClose asChild>
              <Button type="submit" onClick={handleSubmit}>
                Create
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  );
}
