"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GameDataError = void 0;
class GameDataError extends Error {
    isGameDataError = true;
    sdk = 'GameData';
    code;
    ctx;
    status = -1;
    // `err.notFound` rather than a magic number at every call site.
    get notFound() { return 404 === this.status; }
    constructor(code, msg, ctx) {
        super(msg);
        this.code = code;
        this.ctx = ctx;
    }
}
exports.GameDataError = GameDataError;
//# sourceMappingURL=GameDataError.js.map