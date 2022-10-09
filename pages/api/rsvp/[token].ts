import { loadSheet } from "lib/googleSheet";
import { fetchResponse } from "lib/rsvp";
import { RsvpResponse } from "lib/rsvp/types";
import { isString } from "lodash";
import type { NextApiRequest, NextApiResponse } from "next";
import { ApiResponse } from ".";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ApiResponse<RsvpResponse>>
) {
  const {
    query: { token },
    method,
  } = req;

  if (!isString(token)) {
    throw new Error("token is required");
  }

  if ("GET" !== method) {
    return res
      .setHeader("Allow", "GET")
      .status(405)
      .end(`Method ${method} Not Allowed`);
  }

  const sheet = await loadSheet(
    String(process.env.GOOGLE_SHEETS_DOCUMENT_ID),
    String(process.env.GOOGLE_SHEETS_RSVP_SHEET_ID)
  );

  let data: RsvpResponse | null = null;

  try {
    data = await fetchResponse(sheet, token);
  } catch (err) {
    console.error(err);
  }

  res.status(200).json({ data });
}
