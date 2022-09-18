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
const category_service_1 = __importDefault(require("./category-service"));
class CategoryController {
    constructor(prismaClient) {
        this.prismaClient = prismaClient;
        this.service = new category_service_1.default(prismaClient);
    }
    index(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const categorys = yield this.service.fetchAll();
                return (0, reboot_solutions_cms_1.onSuccess)(response, 200, categorys);
            }
            catch (error) {
                return (0, reboot_solutions_cms_1.onError)(response, error);
            }
        });
    }
    show(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const categoryId = parseInt(request.params.id);
                const category = yield this.service.fetchById(categoryId);
                return (0, reboot_solutions_cms_1.onSuccess)(response, 200, category);
            }
            catch (error) {
                return (0, reboot_solutions_cms_1.onError)(response, error);
            }
        });
    }
    showBySlug(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const category = yield this.service.fetchBySlug(request.params.slug);
                return (0, reboot_solutions_cms_1.onSuccess)(response, 200, category);
            }
            catch (error) {
                return (0, reboot_solutions_cms_1.onError)(response, error);
            }
        });
    }
    store(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const category = yield this.service.store(request.body);
                return (0, reboot_solutions_cms_1.onSuccess)(response, 200, category);
            }
            catch (error) {
                return (0, reboot_solutions_cms_1.onError)(response, error);
            }
        });
    }
    update(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const categoryId = parseInt(request.params.id);
                const category = yield this.service.update(categoryId, request.body);
                return (0, reboot_solutions_cms_1.onSuccess)(response, 200, category);
            }
            catch (error) {
                return (0, reboot_solutions_cms_1.onError)(response, error);
            }
        });
    }
    destroy(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const categoryId = parseInt(request.params.id);
                const category = yield this.service.destroy(categoryId);
                return (0, reboot_solutions_cms_1.onSuccess)(response, 200, category);
            }
            catch (error) {
                return (0, reboot_solutions_cms_1.onError)(response, error);
            }
        });
    }
}
exports.default = CategoryController;
//# sourceMappingURL=category-controller.js.map