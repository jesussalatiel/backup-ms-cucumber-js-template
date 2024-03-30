import { DataTable } from '@cucumber/cucumber';
import RandomValueGenerator from '@automation/processor/ConfValueGenerator';

class BaseDataProcessor {
  static replaceRandomTextFromFields(worldType: any, table: DataTable): DataTable {
    const headers = table.raw()[0];
    const updatedData = table.raw().map(
      (row: string[]) => row.map((cell: string, colIndex: number) => {
        const header = headers[colIndex];
        const regex = /local:default:random/;
        if (regex.test(cell)) {
          return RandomValueGenerator.getRandomValueBasedOnHeader(header, worldType, cell);
        }
        return cell;
      }),
    );

    const newTable:DataTable = new DataTable(updatedData);

    newTable.hashes().forEach((row) => {
      RandomValueGenerator.setRandomValueBasedOnHeader(row, worldType);
    });

    return newTable;
  }
}

export default BaseDataProcessor;
