import { GoogleSpreadsheetWorksheet } from "google-spreadsheet";
import { generateToken, getRowByToken, rsvpResponseFromRow } from "./functions";
import { RsvpResponse, RsvpSubmission, SheetColumn } from "./types";

export async function fetchResponse(
  sheet: GoogleSpreadsheetWorksheet,
  token: string
): Promise<RsvpResponse | null> {
  try {
    const row = await getRowByToken(sheet, token);

    return rsvpResponseFromRow(row);
  } catch {
    return null;
  }
}

export async function submitRsvp(
  sheet: GoogleSpreadsheetWorksheet,
  submission: RsvpSubmission
): Promise<RsvpResponse> {
  if (submission.token) {
    const row = await getRowByToken(sheet, submission.token);

    row[SheetColumn.Attending] = submission.attending;
    row[SheetColumn.Name] = submission.name;
    row[SheetColumn.Address] = submission.address;
    row[SheetColumn.AdditionalNotes] = submission.additionalNotes;
    row[SheetColumn.SubmittedAt] = new Date().toISOString();

    await row.save();

    return rsvpResponseFromRow(row);
  }

  const newRow = await sheet.addRow({
    [SheetColumn.Token]: await generateToken(sheet),
    [SheetColumn.Attending]: submission.attending,
    [SheetColumn.Name]: submission.name,
    [SheetColumn.Address]: submission.address,
    [SheetColumn.AdditionalNotes]: submission.additionalNotes,
    [SheetColumn.SubmittedAt]: new Date().toISOString(),
  });

  return rsvpResponseFromRow(newRow);
}
