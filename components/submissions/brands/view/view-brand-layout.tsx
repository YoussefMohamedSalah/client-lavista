"use client";

import { BrandSubmission } from "@/types/brand-submission";
import React from "react";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Textarea } from "@/components/ui/textarea";
import { brandSubmissionService } from "@/services/brand-submission.service";
import { toast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import { Icons } from "@/components/icons";

interface ViewBrandSubmissionProps {
  brandSubmission: BrandSubmission;
}

export default function ViewBrandSubmissionLayout({
  brandSubmission,
}: ViewBrandSubmissionProps) {
  async function rejectBrandSubmission(brandId: number, rejectReason: string) {
    const response = await brandSubmissionService.rejectBrandSubmission(
      brandId,
      rejectReason
    );

    if (response.status) {
      return true;
    }
    setIsRejectLoading(false);
    toast({
      title: "Something went wrong.",
      description: "Brand submission was not deleted. Please try again.",
      variant: "destructive",
    });
  }

  async function acceptBrandSubmission(brandId: number) {
    const response = await brandSubmissionService.acceptBrandSubmission(
      brandId
    );

    if (response.status) {
      return true;
    }
    setIsRejectLoading(false);
    toast({
      title: "Something went wrong.",
      description: "Brand submission was not deleted. Please try again.",
      variant: "destructive",
    });
  }

  const [isRejectLoading, setIsRejectLoading] = React.useState<boolean>(false);
  const [isAcceptedLoading, setIsAcceptedLoading] =
    React.useState<boolean>(false);
  const [rejectReason, setRejectReason] = React.useState<string>("");

  const router = useRouter();

  return (
    <div className="px-2 py-8 flex w-full flex-col space-y-6">
      <div>Name: {brandSubmission.name}</div>
      <a href={brandSubmission.website} target="_blank">
        Website: {brandSubmission.website}
      </a>
      <div>Why: {brandSubmission.why_reason}</div>
      <div>Status: {brandSubmission.status}</div>
      <div>
        Submitted On: {format(new Date(brandSubmission.created_at), "PPP")}
      </div>
      {brandSubmission.status == "Pending" && (
        <div className="flex flex-row gap-4">
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant={"outline"}>Approve</Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This will add the submission to the brands database.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction
                  onClick={async (event) => {
                    event.preventDefault();
                    setIsAcceptedLoading(true);
                    const accepted = await acceptBrandSubmission(
                      brandSubmission.id
                    );
                    if (accepted) {
                      setIsAcceptedLoading(false);
                      router.back();
                    }
                  }}
                >
                  Continue
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
          <Dialog>
            <DialogTrigger asChild>
              <Button variant={"ghost"}>Reject</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Rejection Reason</DialogTitle>
                <DialogDescription>
                  Please provide a reason for rejecting this submission
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <Textarea
                  onChange={(event) => setRejectReason(event.target.value)}
                  placeholder="Type your message here."
                />
              </div>
              <DialogFooter>
                <Button
                  onClick={async (event) => {
                    event.preventDefault();
                    if (rejectReason !== "") {
                      setIsRejectLoading(true);
                      const rejected = await rejectBrandSubmission(
                        brandSubmission.id,
                        rejectReason
                      );
                      if (rejected) {
                        setIsRejectLoading(false);
                        router.back();
                      }
                    } else {
                      toast({
                        title: "Rejection reason is mandatory.",
                        variant: "destructive",
                      });
                    }
                  }}
                  type="submit"
                >
                  {isRejectLoading && (
                    <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                  )}
                  Proceed
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      )}
    </div>
  );
}
