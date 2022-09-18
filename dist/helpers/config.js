"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Config = void 0;
const fs_1 = __importDefault(require("fs"));
class Config {
    constructor() {
        this._config = this.readConfigFile();
    }
    static get instance() {
        if (!Config._instance) {
            Config._instance = new Config();
        }
        return Config._instance;
    }
    get config() {
        return this._config;
    }
    readConfigFile() {
        let config = fs_1.default.readFileSync('reboot.config.json');
        return JSON.parse(config.toString());
    }
}
exports.Config = Config;
//# sourceMappingURL=config.js.map