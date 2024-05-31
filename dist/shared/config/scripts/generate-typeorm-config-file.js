"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const constants_1 = require("../constants");
const fs = require("fs");
const generateTypeormConfigFile = (config) => {
    const typeormConfig = config.get(constants_1.TYPEORM_CONFIG);
    fs.writeFileSync('ormconfig.json', JSON.stringify(typeormConfig, null, 2));
};
exports.default = generateTypeormConfigFile;
//# sourceMappingURL=generate-typeorm-config-file.js.map