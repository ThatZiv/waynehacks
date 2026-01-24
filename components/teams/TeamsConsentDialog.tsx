"use client";

import React from "react";
import Splitter from "../Splitter";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { useRouter } from "next/navigation";

const CONSENT_KEY = "teams-consent-given";

export default function TeamsConsentDialog() {
  const router = useRouter();
  const [open, setOpen] = React.useState(false);
  React.useEffect(() => {
    const consentGiven = localStorage.getItem(CONSENT_KEY);
    if (!consentGiven || consentGiven === "false") {
      setOpen(true);
    }
  }, []);
  const handleConsent = () => {
    localStorage.setItem(CONSENT_KEY, "true");
    setOpen(false);
  };
  const handleLeaving = (e: Event) => {
    e.preventDefault();
  };
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent
        className="[&>button]:hidden"
        onOpenAutoFocus={handleLeaving}
        onCloseAutoFocus={handleLeaving}
        onEscapeKeyDown={handleLeaving}
        onInteractOutside={handleLeaving}
      >
        <DialogHeader>
          <DialogTitle className="text-xl">Teams Feature Consent</DialogTitle>
          <DialogDescription className="text-secondary">
            By using the Teams feature, you consent to sharing information from
            your application with others on this platform. This includes: your
            full name, email address, and university. Please ensure you are
            comfortable with this before proceeding.
          </DialogDescription>
          <Splitter />
        </DialogHeader>
        <DialogFooter>
          <DialogClose asChild>
            <Button
              variant="secondary"
              onClick={() => {
                localStorage.setItem(CONSENT_KEY, "false");
                router.push("/application");
              }}
            >
              Back
            </Button>
          </DialogClose>
          <DialogClose asChild>
            <Button variant="outline" onClick={handleConsent}>
              I Understand
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
