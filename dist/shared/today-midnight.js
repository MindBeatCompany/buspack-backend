"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function todayAtMidnight() {
    const now = new Date(Date.now());
    now.setHours(now.getHours() - 3);
    now.setHours(0, 0, 0, 0);
    return now;
}
exports.default = todayAtMidnight;
//# sourceMappingURL=today-midnight.js.map