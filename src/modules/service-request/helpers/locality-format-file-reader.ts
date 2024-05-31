
import { unlinkSync } from "fs";

import { readFile, utils } from "xlsx";

/**
 * Clase para leer el xls con el formato de solicitudes
 */
export default class LocalityFormatFileReader {

  /**
   * Lee el xls con el formato de solicitudes y devuelve una lista de json con las properties idog, locality, province, cp
   * si es que hay valores en las celdas de dichas propiedades
   * @param file 
   * @returns locality to format list
   */
  public readFile(file: any) {
    const workbook = readFile(file.path);
    const sheetNames = workbook.SheetNames;
    const firstSheet = workbook.Sheets[sheetNames[0]];
    var res = utils.sheet_to_json(firstSheet, {
      header: this.getHeader(),
      range: "A3:H660"
    })

    //unlinkSync(file.path);
    
    return res
  }

  private getHeader() {
    return [
      "idog",
      null,
      null,
      null,
      null,
      "locality",
      "province",
      "cp"
    ]
  }

}