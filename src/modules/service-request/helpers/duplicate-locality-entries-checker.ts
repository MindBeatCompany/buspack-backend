
export default class DuplicateLocalityEntriesChecker {

    public static hasDuplicates(entries: any[]): boolean {

        for (let i = 0; i < entries.length; i++) {
            entries[i].id = i
        }

        let res = false;

        for (let i = 0; i < entries.length; i++) {
            let current = entries[i];
            if (this.isThereADuplicate(current, entries)) {
                return true;
            }
        }

        return res;
    }

    private static isThereADuplicate(current: any, entries: any[]): boolean {
        let res = false;

        for (let i = 0; i < entries.length; i++) {
            if (this.hasSameContent(current, entries[i]) && current.id !== entries[i].id) {
                return true;
            }
        }

        return res;
    }

    private static hasSameContent(entry1: any, entry2: any): boolean {
        const l1 = entry1.locality;
        const l2 = entry2.locality;
        const p1 = entry1.province;
        const p2 = entry2.province;
        const cp1 = entry1.cp;
        const cp2 = entry2.cp;

        return ((this.hasSameLength(l1, l2) && this.hasSameValue(l1, l2)) || this.bothAreUndefined(l1, l2)) &&
               ((this.hasSameLength(p1, p2) && this.hasSameValue(p1, p2)) || this.bothAreUndefined(p1, p2)) &&
               (this.isSameCp(cp1, cp2) || this.bothAreUndefined(cp1, cp2));
    }

    private static hasSameLength(value1: string, value2: string) {
        return value1 !== undefined && value2 !== undefined && value1.length === value2.length;
    }

    private static hasSameValue(value1: any, value2: any): boolean {
        const re = new RegExp(value2, 'i');
        return value1.match(re);
    }

    private static bothAreUndefined(v1: any, v2: any): boolean {
        return v1 === undefined && v2 === undefined;
    }

    private static isSameCp(cp1: any, cp2: any): boolean {
        return cp1 !== undefined && cp2 !== undefined && cp1 === cp2;
    }
}
