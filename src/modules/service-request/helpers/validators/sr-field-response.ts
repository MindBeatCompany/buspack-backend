
// objeto que representa la respuesta de cada una de los campos a validar
// de una fila de una service request
export const srFieldResponse = (value: any, status: string, error: string) => {
    return {
        value: value,
        status: status,
        error: error
    }
}
