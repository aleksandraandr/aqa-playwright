import { Locator } from '@playwright/test';

export async function getFirstRowDataByHeaders(table: Locator): Promise<Record<string, string>> {
  const headers = (await table.locator('thead th').allInnerTexts()).map(header => header.trim());
  const cells = (await table.locator('tbody tr').first().locator('td').allInnerTexts()).map(cell => cell.trim());

  const data: Record<string, string> = {};
  headers.forEach((header, index) => {
    data[header] = cells[index] ?? '';
  });

  return data;
}
