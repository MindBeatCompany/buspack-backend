"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.detectFileEncoding = void 0;
const languageEncoding = require("detect-file-encoding-and-language");
async function detectFileEncoding(filepath) {
    const encodingLanguage = await languageEncoding(filepath).then((fileInfo) => fileInfo);
    return encodingLanguage.encoding;
}
exports.detectFileEncoding = detectFileEncoding;
//# sourceMappingURL=detect-file-encoding.js.map