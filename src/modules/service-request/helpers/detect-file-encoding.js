

const languageEncoding = require("detect-file-encoding-and-language");

export async function  detectFileEncoding(filepath) {
    const encodingLanguage = await languageEncoding(filepath).then((fileInfo) => fileInfo);
    return encodingLanguage.encoding;
}
