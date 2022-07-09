import {
  GoogleSpreadsheet,
  GoogleSpreadsheetWorksheet,
} from "google-spreadsheet";

export async function loadSheet(
  documentId: string,
  sheetId: string,
  authenticate: (
    document: GoogleSpreadsheet
  ) => Promise<void> = serviceAccountAuthentication
): Promise<GoogleSpreadsheetWorksheet> {
  const document = new GoogleSpreadsheet(documentId);

  await authenticate(document);

  await document.loadInfo();

  const sheet = document.sheetsById[sheetId];

  if (!sheet) {
    throw new Error(`Sheet "${sheetId}" not found`);
  }

  return sheet;
}

async function serviceAccountAuthentication(
  document: GoogleSpreadsheet
): Promise<void> {
  await document.useServiceAccountAuth({
    client_email: process.env.GOOGLE_SHEETS_CLIENT_EMAIL ?? "",
    private_key: (process.env.GOOGLE_SHEETS_PRIVATE_KEY ?? "").replace(
      /\\n/g,
      "\n"
    ),
  });
}
