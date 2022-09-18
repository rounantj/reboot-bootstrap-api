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
const permission_controller_1 = __importDefault(require("./permission-controller"));
const verifyAdmin_1 = require("../../middlewares/verifyAdmin");
class PermissionRouter {
    constructor(prismaClient) {
        this.prismaClient = prismaClient;
        this.router = (0, express_1.Router)();
        this.controller = new permission_controller_1.default(prismaClient);
    }
    index() {
        this.router.get("/", verifyAdmin_1.verifyAdmin, (request, response) => this.controller.index(request, response));
        return this;
    }
    show() {
        this.router.get("/:id", verifyAdmin_1.verifyAdmin, (request, response) => __awaiter(this, void 0, void 0, function* () {
            this.controller.show(request, response);
        }));
        return this;
    }
    delete() {
        this.router.delete("/:id", verifyAdmin_1.verifySuperAdmin, (request, response) => __awaiter(this, void 0, void 0, function* () {
            this.controller.destroy(request, response);
        }));
        return this;
    }
}
exports.default = PermissionRouter;
//# sourceMappingURL=permission-router.js.map