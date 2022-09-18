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
const order_controller_1 = __importDefault(require("./order-controller"));
const resourcePermission_1 = require("../../middlewares/resourcePermission");
const modules_1 = require("../../helpers/modules");
const permissions_1 = require("../../helpers/permissions");
class ProductRouter {
    constructor(prismaClient) {
        this.prismaClient = prismaClient;
        this.router = (0, express_1.Router)();
        this.controller = new order_controller_1.default(prismaClient);
    }
    index() {
        this.router.get("/", (0, resourcePermission_1.resourcePermission)(`${permissions_1.permissions.view} ${modules_1.modules.order}`), (request, response) => this.controller.index(request, response));
        return this;
    }
    show() {
        this.router.get("/id/:id", (0, resourcePermission_1.resourcePermission)(`${permissions_1.permissions.view} ${modules_1.modules.order}`), (request, response) => __awaiter(this, void 0, void 0, function* () {
            this.controller.show(request, response);
        }));
        return this;
    }
    showBySlug() {
        this.router.get("/slug/:slug", (0, resourcePermission_1.resourcePermission)(`${permissions_1.permissions.view} ${modules_1.modules.order}`), (request, response) => __awaiter(this, void 0, void 0, function* () {
            this.controller.showBySlug(request, response);
        }));
        return this;
    }
    store() {
        this.router.post("/", (0, resourcePermission_1.resourcePermission)(`${permissions_1.permissions.create} ${modules_1.modules.order}`), (request, response) => __awaiter(this, void 0, void 0, function* () {
            console.log('começo', request.body);
            this.controller.store(request, response);
        }));
        return this;
    }
    update() {
        this.router.patch("/:id", (0, resourcePermission_1.resourcePermission)(`${permissions_1.permissions.update} ${modules_1.modules.order}`), (request, response) => __awaiter(this, void 0, void 0, function* () {
            this.controller.update(request, response);
        }));
        return this;
    }
    delete() {
        this.router.delete("/:id", (0, resourcePermission_1.resourcePermission)(`${permissions_1.permissions.destroy} ${modules_1.modules.order}`), (request, response) => __awaiter(this, void 0, void 0, function* () {
            this.controller.destroy(request, response);
        }));
        return this;
    }
}
exports.default = ProductRouter;
//# sourceMappingURL=order-router.js.map