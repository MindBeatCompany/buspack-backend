
export default class FormatSrPositionsValidator {

    public static validate(positions: number[]): void {
        const set = new Set();
        positions.map(p => set.add(p));

        if(set.size !== positions.length) {
            throw new Error("There are repetead positions on request fields");
        }
    }

}
