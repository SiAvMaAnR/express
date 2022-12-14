"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Field {
    constructor() {
        this.field = [
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        ];
    }
    getArr() {
        return this.field;
    }
    edit(cell, y, x) {
        const length = this.field.length;
        if (y < length && x < length) {
            this.field[y][x] = cell;
        }
    }
    add(y, x) {
        const length = this.field.length;
        if (y < length && x < length) {
            this.field[y][x] = 1 /* Cell.Exists */;
        }
    }
    getCell(y, x) {
        const length = this.field.length;
        return (y < length && x < length)
            ? this.field[y][x]
            : null;
    }
    isDeadField() {
        return this.field.flat().filter(cell => cell == 1 /* Cell.Exists */).length == 0;
    }
}
exports.default = Field;
//# sourceMappingURL=field.js.map