
import HeaderGetter from "../header-getter";
import { stringFields, numberFields, booleanFields } from "src/shared/datatype-fields";

/**
 * Clase abstracta para leer los archivos de solicitud de servicio. Cada clase que la implementa usa 
 * una estrategia distinta para leer los archivos 
 */
export default abstract class SRFileReaderAbstractStrategy {

    headerGetter: HeaderGetter;

    public constructor() {
        this.headerGetter = new HeaderGetter()
    }
    /**
     * Lee el archivo de solicitud de servicio y devuelvo un array de json "fieldname": "value"
     * 
     * @param file - el archivo a leer
     * @param options
     * @param fieldnamesPositions - array de json con con el nombre del campo y su respectiva posicion
     */
    public async readFile(file: any, {...options}, fieldnamesPositions?: any[]) {
        let res = await this.readFileAux(file, options, fieldnamesPositions)
        return this.fillUndefinedFieldsWithNull(res);
    }

    protected abstract readFileAux(file: any, options: { [x: string]: any; }, fieldnamesPositions: any[]);

    // Los campos que viene como undefined, el xlsx no agrega esas keys, por eso se agregan las mismas
    // como null para hacer las validaciones despues
    private fillUndefinedFieldsWithNull(rows: any): any {
        const allFields = stringFields.concat(numberFields).concat(booleanFields);
        let res = [];

        for (let i = 0; i < rows.length; i++) {
            let row = rows[i];
            allFields.map( f => {
                if (row[f] === undefined) row[f] = null;
            })

            res = res.concat(row);
        }

        return res;
    }
}
