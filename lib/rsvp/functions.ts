import {
  GoogleSpreadsheetRow,
  GoogleSpreadsheetWorksheet,
} from "google-spreadsheet";
import { v4 as uuid } from "uuid";
import { RsvpResponse, SheetColumn } from "./types";

export async function getRowByToken(
  sheet: GoogleSpreadsheetWorksheet,
  token: string
): Promise<GoogleSpreadsheetRow> {
  const rows = await sheet.getRows();

  for (const row of rows) {
    if (token === row[SheetColumn.Token]) {
      return row;
    }
  }

  throw new Error("Error finding row");
}

export function rsvpResponseFromRow(row: GoogleSpreadsheetRow): RsvpResponse {
  const attending = row[SheetColumn.Attending];
  const submittedAt = row[SheetColumn.SubmittedAt];

  return {
    token: row[SheetColumn.Token],
    name: row[SheetColumn.Name],
    address: row[SheetColumn.Address],
    attending: attending ? "TRUE" === attending : undefined,
    additionalNotes: row[SheetColumn.AdditionalNotes],
    submittedAt: submittedAt ? new Date(submittedAt) : undefined,
  };
}

export async function generateToken(
  sheet: GoogleSpreadsheetWorksheet
): Promise<string> {
  const rows = await sheet.getRows();
  const tokens = rows.reduce<Set<string>>((set, row) => {
    return set.add(row[SheetColumn.Token]);
  }, new Set());

  let newToken;

  do {
    newToken = uuid();
  } while (tokens.has(newToken));

  return newToken;
}
