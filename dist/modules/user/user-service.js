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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const reboot_solutions_cms_1 = require("reboot-solutions-cms");
const user_repository_1 = __importDefault(require("./user-repository"));
class UserService {
    constructor(prismaClient) {
        this.prismaClient = prismaClient;
        this.userRepository = new user_repository_1.default(prismaClient);
    }
    fetchAll(params) {
        return __awaiter(this, void 0, void 0, function* () {
            const users = yield this.userRepository.all(params);
            if (!users || users.length == 0)
                throw new reboot_solutions_cms_1.NotFoundError("Nenhum usuário foi encontrado!");
            const mappedUsers = users.map((user) => {
                const { password, confirmationCode } = user, responseUser = __rest(user, ["password", "confirmationCode"]);
                return responseUser;
            });
            return mappedUsers;
        });
    }
    fetchById(id, params) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.userRepository.get(id, params);
            if (!user)
                throw new reboot_solutions_cms_1.NotFoundError("Usuário não encontrado!");
            return user;
        });
    }
    update(id, payload) {
        return __awaiter(this, void 0, void 0, function* () {
            const { status, roleId, activatedAt } = payload, bodyPayload = __rest(payload, ["status", "roleId", "activatedAt"]);
            const user = yield this.userRepository.update(id, bodyPayload);
            if (!user)
                throw new reboot_solutions_cms_1.NotFoundError("Usuário não encontrado!");
            return user;
        });
    }
    destroy(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.userRepository.delete(id);
            if (!user)
                throw new reboot_solutions_cms_1.NotFoundError("Usuário não encontrado!");
            return user;
        });
    }
}
exports.default = UserService;
//# sourceMappingURL=user-service.js.map