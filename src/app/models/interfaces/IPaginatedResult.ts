export class PaginatedResult<T> {
    constructor(
        public first: number,
        public prev: number | null,
        public last: number,
        public pages: number,
        public items: number,
        public data: T[]) {

    }
}