
export default class HeaderGetter {
  
  public getDefaultHeader(): string[] {
    return [
      "requestId",
      "recipientFullname",
      "docType",
      "docNumber",
      "phone",
      "email",
      "enabledPlace",
      "locality",
      "province",
      "cpa",
      "homeDelivery",
      "addressStreet",
      "addressNumber",
      "addressBuilding",
      "addressFloor",
      "addressApartment",
      "addressCpa",
      "qtyPieces",
      "totalWeight",
      "observations",
    ]
  }

  public getCustomHeader(fieldnamesPositions: any[]): string[] {
    const orderFieldnamesPositions =
      fieldnamesPositions 
        .sort((fp1, fp2) => fp1.position - fp2.position);

    const res = [];

    // fstFp = first position
    const fstPos = orderFieldnamesPositions[0].position;

    if (fstPos !== 0) {
      const nEmptyStrings = this.getNEmptyStrings(fstPos);
      res.push(...nEmptyStrings);
    }

    for (let i = 0; i < orderFieldnamesPositions.length - 1; i++) {
      let currentFp = orderFieldnamesPositions[i];
      let nextFp = orderFieldnamesPositions[i+1];
      // si la diferencia entre la posicion actual y la siguiente es a igual uno, se agrega el fieldname directamente
      // si no se agrega la cantidad de espacios vacios de la diferencia - 1
      let diffPositions = nextFp.position - currentFp.position;
      let currentFieldname = currentFp.fieldname;
      if (diffPositions === 1) {
        res.push(currentFieldname);
      } else {
        let emptyStrings = this.getNEmptyStrings(diffPositions - 1);
        res.push(currentFieldname, ...emptyStrings);
      }      
    }
    
    const lastFP = orderFieldnamesPositions[orderFieldnamesPositions.length - 1]
    res.push(lastFP.fieldname);

    return res
  }

  private getNEmptyStrings(n: number): number[] {
    let res = [];
    for (let i = 0; i < n; i++) {
      res.push("");
    }

    return res;
  }
}
