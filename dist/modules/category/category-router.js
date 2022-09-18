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
const category_controller_1 = __importDefault(require("./category-controller"));
class CategoryRouter {
    constructor(prismaClient) {
        this.prismaClient = prismaClient;
        this.router = (0, express_1.Router)();
        this.controller = new category_controller_1.default(prismaClient);
    }
    index() {
        this.router.get("/", (request, response) => this.controller.index(request, response));
        return this;
    }
    show() {
        this.router.get("/id/:id", (request, response) => __awaiter(this, void 0, void 0, function* () {
            this.controller.show(request, response);
        }));
        return this;
    }
    showBySlug() {
        this.router.get("/slug/:slug", (request, response) => __awaiter(this, void 0, void 0, function* () {
            this.controller.showBySlug(request, response);
        }));
        return this;
    }
    store() {
        this.router.post("/", (request, response) => __awaiter(this, void 0, void 0, function* () {
            this.controller.store(request, response);
        }));
        return this;
    }
    update() {
        this.router.patch("/:id", (request, response) => __awaiter(this, void 0, void 0, function* () {
            this.controller.update(request, response);
        }));
        return this;
    }
    delete() {
        this.router.delete("/:id", (request, response) => __awaiter(this, void 0, void 0, function* () {
            this.controller.destroy(request, response);
        }));
        return this;
    }
}
exports.default = CategoryRouter;
//# sourceMappingURL=category-router.js.map