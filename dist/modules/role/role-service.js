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
const roles_1 = require("../../helpers/roles");
const role_repository_1 = __importDefault(require("./role-repository"));
class roleService {
    constructor(prismaClient) {
        this.prismaClient = prismaClient;
        this.roleRepository = new role_repository_1.default(prismaClient);
    }
    fetchAll(params) {
        return __awaiter(this, void 0, void 0, function* () {
            const roles = yield this.roleRepository.all(params);
            return { roles };
        });
    }
    fetchById(id, params) {
        return __awaiter(this, void 0, void 0, function* () {
            const role = yield this.roleRepository.get(id, params);
            return { role };
        });
    }
    fetchDefaultUserRole() {
        return __awaiter(this, void 0, void 0, function* () {
            const role = yield this.roleRepository.getByName(roles_1.roles.user);
            return { role };
        });
    }
    batchSave(payload) {
        return __awaiter(this, void 0, void 0, function* () {
            const rolePermission = yield this.roleRepository.batchSaveRolesPermissions(payload);
            return rolePermission.count;
        });
    }
    batchDestroy(payload) {
        return __awaiter(this, void 0, void 0, function* () {
            const rolePermission = yield this.roleRepository.batchDestroyRolesPermissions(payload);
            return rolePermission.count;
        });
    }
}
exports.default = roleService;
//# sourceMappingURL=role-service.js.map