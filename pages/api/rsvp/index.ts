import { loadSheet } from "lib/googleSheet";
import { submitRsvp } from "lib/rsvp";
import { RsvpResponse } from "lib/rsvp/types";
import type { NextApiRequest, NextApiResponse } from "next";

export interface ApiResponse<T> {
  data: T | null;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ApiResponse<RsvpResponse>>
) {
  const { method, body } = req;

  if ("POST" !== method) {
    return res
      .setHeader("Allow", "POST")
      .status(405)
      .end(`Method ${method} Not Allowed`);
  }

  const sheet = await loadSheet(
    String(process.env.GOOGLE_SHEETS_DOCUMENT_ID),
    String(process.env.GOOGLE_SHEETS_SHEET_ID)
  );

  const data = await submitRsvp(sheet, JSON.parse(body));

  res.status(200).json({ data });
}
