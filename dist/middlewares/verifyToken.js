"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyToken = void 0;
const client_1 = require("@prisma/client");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const user_repository_1 = __importDefault(require("../modules/user/user-repository"));
const fs_1 = __importDefault(require("fs"));
const userRepository = new user_repository_1.default(new client_1.PrismaClient());
let config = fs_1.default.readFileSync("reboot.config.json");
const env = JSON.parse(config.toString());
function verifyToken(request, response, next) {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const token = (_a = request.headers.authorization) === null || _a === void 0 ? void 0 : _a.replace("Bearer ", "");
            const decodedToken = jsonwebtoken_1.default.verify(token, `${env.jwtSecret}`);
            request.user = yield userRepository.getByEmail(`${decodedToken.payload}`);
            next();
        }
        catch (error) {
            response.status(401).json({ ok: false });
        }
    });
}
exports.verifyToken = verifyToken;
//# sourceMappingURL=verifyToken.js.map