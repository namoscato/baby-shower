import { GoogleSpreadsheetRow } from "google-spreadsheet";
import { loadSheet } from "lib/googleSheet";
import { Wish, WishResponse } from "./types";

export async function fetchWishes(
  documentId: string,
  sheetId: string
): Promise<WishResponse[]> {
  const sheet = await loadSheet(documentId, sheetId);
  const rows = await sheet.getRows();

  return rows.map(wishFromRow);
}

function wishFromRow(row: GoogleSpreadsheetRow): WishResponse {
  const wishes: Wish[] = [];

  for (const prompt of Object.keys(row)) {
    const response = row[prompt];

    if (response && prompt.startsWith("I hope you ")) {
      wishes.push({ prompt, response });
    }
  }

  return { wishes };
}
