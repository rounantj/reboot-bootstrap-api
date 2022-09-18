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
const user_service_1 = __importDefault(require("./user-service"));
class UserController {
    constructor(prismaClient) {
        this.prismaClient = prismaClient;
        this.service = new user_service_1.default(prismaClient);
    }
    index(request, response) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const params = this._verifyParamsRelations((_a = request.query.includes) === null || _a === void 0 ? void 0 : _a.toString());
                const users = yield this.service.fetchAll(params);
                if (!users)
                    throw new reboot_solutions_cms_1.NotFoundError("Nenhum usuário encontrado");
                const responseDTO = { users };
                return (0, reboot_solutions_cms_1.onSuccess)(response, 200, responseDTO);
            }
            catch (error) {
                return (0, reboot_solutions_cms_1.onError)(response, error);
            }
        });
    }
    show(request, response) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userId = parseInt(request.params.id);
                const params = this._verifyParamsRelations((_a = request.query.includes) === null || _a === void 0 ? void 0 : _a.toString());
                const user = yield this.service.fetchById(userId, params);
                if (!user)
                    throw new reboot_solutions_cms_1.NotFoundError("Usuário não encontrado");
                const { confirmationCode, password } = user, responseUser = __rest(user, ["confirmationCode", "password"]);
                const responseDTO = { user: responseUser };
                return (0, reboot_solutions_cms_1.onSuccess)(response, 200, responseDTO);
            }
            catch (error) {
                return (0, reboot_solutions_cms_1.onError)(response, error);
            }
        });
    }
    update(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userId = parseInt(request.params.id);
                // @ts-expect-error
                if (userId != request.user.id)
                    throw new reboot_solutions_cms_1.ForbiddenError("Erro ao autorizar");
                const user = yield this.service.update(userId, request.body);
                if (!user)
                    throw new reboot_solutions_cms_1.NotFoundError("Usuário não encontrado");
                const { confirmationCode, password } = user, responseUser = __rest(user, ["confirmationCode", "password"]);
                const responseDTO = { user: responseUser };
                return (0, reboot_solutions_cms_1.onSuccess)(response, 200, responseDTO);
            }
            catch (error) {
                return (0, reboot_solutions_cms_1.onError)(response, error);
            }
        });
    }
    destroy(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userId = parseInt(request.params.id);
                const user = yield this.service.destroy(userId);
                if (!user)
                    throw new reboot_solutions_cms_1.NotFoundError("Usuário não encontrado");
                const { confirmationCode, password } = user, responseUser = __rest(user, ["confirmationCode", "password"]);
                const responseDTO = { user: responseUser };
                return (0, reboot_solutions_cms_1.onSuccess)(response, 200, responseDTO);
            }
            catch (error) {
                return (0, reboot_solutions_cms_1.onError)(response, error);
            }
        });
    }
    approve(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userId = parseInt(request.params.id);
                const user = yield this.service.update(userId, { status: "approved" });
                if (!user)
                    throw new reboot_solutions_cms_1.NotFoundError("Usuário não encontrado");
                const { confirmationCode, password } = user, responseUser = __rest(user, ["confirmationCode", "password"]);
                const responseDTO = { user: responseUser };
                return (0, reboot_solutions_cms_1.onSuccess)(response, 200, responseDTO);
            }
            catch (error) {
                return (0, reboot_solutions_cms_1.onError)(response, error);
            }
        });
    }
    _verifyParamsRelations(query) {
        const relations = query === null || query === void 0 ? void 0 : query.split(",");
        return {
            role: !relations || !relations.includes("role") ? false : true,
            city: !relations || !relations.includes("city") ? false : true,
            state: !relations || !relations.includes("state") ? false : true,
        };
    }
}
exports.default = UserController;
//# sourceMappingURL=user-controller.js.map