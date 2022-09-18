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
const reboot_solutions_cms_1 = require("reboot-solutions-cms");
const role_service_1 = __importDefault(require("./role-service"));
class RoleController {
    constructor(prismaClient) {
        this.prismaClient = prismaClient;
        this.service = new role_service_1.default(prismaClient);
    }
    index(request, response) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const params = this._verifyParamsRelations((_a = request.query.includes) === null || _a === void 0 ? void 0 : _a.toString());
                const roles = yield this.service.fetchAll(params);
                return (0, reboot_solutions_cms_1.onSuccess)(response, 200, roles);
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
                const roleId = parseInt(request.params.id);
                const params = this._verifyParamsRelations((_a = request.query.includes) === null || _a === void 0 ? void 0 : _a.toString());
                const role = yield this.service.fetchById(roleId, params);
                return (0, reboot_solutions_cms_1.onSuccess)(response, 200, role);
            }
            catch (error) {
                return (0, reboot_solutions_cms_1.onError)(response, error);
            }
        });
    }
    showDefaultUserRole(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const role = yield this.service.fetchDefaultUserRole();
                return (0, reboot_solutions_cms_1.onSuccess)(response, 200, role);
            }
            catch (error) {
                return (0, reboot_solutions_cms_1.onError)(response, error);
            }
        });
    }
    batchSave(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const rolePermissionCount = yield this.service.batchSave(request.body);
                return (0, reboot_solutions_cms_1.onSuccess)(response, 200, {
                    message: `A operação registrou ${rolePermissionCount} permissão(ões) com sucesso!`,
                });
            }
            catch (error) {
                return (0, reboot_solutions_cms_1.onError)(response, error);
            }
        });
    }
    batchDestroy(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const rolePermissionCount = yield this.service.batchDestroy(request.body);
                return (0, reboot_solutions_cms_1.onSuccess)(response, 200, {
                    message: `A operação excluiu ${rolePermissionCount} permissão(ões) com sucesso!`,
                });
            }
            catch (error) {
                return (0, reboot_solutions_cms_1.onError)(response, error);
            }
        });
    }
    _verifyParamsRelations(query) {
        const relations = query === null || query === void 0 ? void 0 : query.split(",");
        return {
            user: !relations || !relations.includes("user") ? false : true,
            permission: !relations || !relations.includes("permission") ? false : true,
        };
    }
}
exports.default = RoleController;
//# sourceMappingURL=role-controller.js.map