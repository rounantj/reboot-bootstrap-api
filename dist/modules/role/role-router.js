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
const express_1 = require("express");
const role_controller_1 = __importDefault(require("./role-controller"));
const verifyAdmin_1 = require("../../middlewares/verifyAdmin");
const verifyToken_1 = require("../../middlewares/verifyToken");
class RoleRouter {
    constructor(prismaClient) {
        this.prismaClient = prismaClient;
        this.router = (0, express_1.Router)();
        this.controller = new role_controller_1.default(prismaClient);
    }
    index() {
        this.router.get("/", verifyToken_1.verifyToken, verifyAdmin_1.verifyAdmin, (request, response) => this.controller.index(request, response));
        return this;
    }
    show() {
        this.router.get("/:id", verifyToken_1.verifyToken, verifyAdmin_1.verifyAdmin, (request, response) => __awaiter(this, void 0, void 0, function* () {
            this.controller.show(request, response);
        }));
        return this;
    }
    showDefaultRoleUser() {
        this.router.get("/default", (request, response) => __awaiter(this, void 0, void 0, function* () {
            this.controller.showDefaultUserRole(request, response);
        }));
        return this;
    }
    batchSave() {
        this.router.post("/batch", verifyToken_1.verifyToken, verifyAdmin_1.verifyAdmin, (request, response) => __awaiter(this, void 0, void 0, function* () {
            this.controller.batchSave(request, response);
        }));
        return this;
    }
    batchDestroy() {
        this.router.delete("/batch", verifyToken_1.verifyToken, verifyAdmin_1.verifyAdmin, (request, response) => __awaiter(this, void 0, void 0, function* () {
            this.controller.batchDestroy(request, response);
        }));
        return this;
    }
}
exports.default = RoleRouter;
//# sourceMappingURL=role-router.js.map