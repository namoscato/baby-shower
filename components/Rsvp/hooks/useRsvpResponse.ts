import { RsvpResponse } from "lib/rsvp/types";
import { ApiResponse } from "pages/api/rsvp";
import useSWR from "swr";

interface Response {
  isFetching: boolean;
  rsvpResponse: RsvpResponse | null;
}

export function useRsvpResponse(token: string | undefined): Response {
  const { data, error } = useSWR<ApiResponse<RsvpResponse>>(
    token ? `/api/rsvp/${token}` : null,
    fetcher
  );

  return {
    isFetching: !!token && !error && !data,
    rsvpResponse: data?.data ?? null,
  };
}

function fetcher(url: string) {
  return fetch(url).then((res) => res.json());
}
