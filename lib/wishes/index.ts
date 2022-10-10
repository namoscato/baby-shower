import { GoogleSpreadsheetRow } from "google-spreadsheet";
import { loadSheet } from "lib/googleSheet";
import { Wish, WishResponse } from "./types";

export async function fetchWishes(
  documentId = String(process.env.GOOGLE_SHEETS_DOCUMENT_ID),
  sheetId = String(process.env.GOOGLE_SHEETS_WISHES_SHEET_ID)
): Promise<WishResponse[]> {
  const sheet = await loadSheet(documentId, sheetId);
  const rows = await sheet.getRows();

  return rows.map(wishFromRow);
}

function wishFromRow(row: GoogleSpreadsheetRow, id: number): WishResponse {
  const wishes: Wish[] = [];

  for (const prompt of Object.keys(row)) {
    const response = row[prompt];

    if (response && prompt.startsWith("I hope you ")) {
      wishes.push({ prompt, response });
    }
  }

  return { id, wishes };
}
