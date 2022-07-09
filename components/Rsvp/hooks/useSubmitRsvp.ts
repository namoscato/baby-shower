import { RsvpResponse, RsvpSubmission } from "lib/rsvp/types";
import { ApiResponse } from "pages/api/rsvp";
import { useCallback } from "react";
import { Key } from "swr";
import useSWRMutation from "swr/mutation";

interface Response {
  submitRsvp: (submission: RsvpSubmission) => Promise<RsvpResponse>;
  isSubmitting: boolean;
}

export function useSubmitRsvp(): Response {
  const { trigger, isMutating } = useSWRMutation<
    ApiResponse<RsvpResponse>,
    any,
    Key,
    RsvpSubmission
  >("/api/rsvp", sendRequest);

  const submitRsvp = useCallback(
    async (submission: RsvpSubmission) => {
      const data = await trigger(submission);

      if (!data?.data) {
        throw new Error("Error submitting RSVP");
      }

      return data.data;
    },
    [trigger]
  );

  return {
    submitRsvp,
    isSubmitting: isMutating,
  };
}

async function sendRequest(url: string, { arg }: { arg: any }) {
  return fetch(url, {
    method: "POST",
    body: JSON.stringify(arg),
  }).then((res) => res.json());
}
