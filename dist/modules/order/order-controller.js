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
const order_service_1 = __importDefault(require("./order-service"));
class ProductController {
    constructor(prismaClient) {
        this.prismaClient = prismaClient;
        this.service = new order_service_1.default(prismaClient);
    }
    index(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const products = yield this.service.fetchAll(request.body);
                return (0, reboot_solutions_cms_1.onSuccess)(response, 200, products);
            }
            catch (error) {
                return (0, reboot_solutions_cms_1.onError)(response, error);
            }
        });
    }
    show(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const orderId = parseInt(request.params.id);
                const order = yield this.service.fetchById(orderId, request.body);
                return (0, reboot_solutions_cms_1.onSuccess)(response, 200, order);
            }
            catch (error) {
                return (0, reboot_solutions_cms_1.onError)(response, error);
            }
        });
    }
    showBySlug(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const order = yield this.service.fetchBySlug(request.params.slug, request.body);
                return (0, reboot_solutions_cms_1.onSuccess)(response, 200, order);
            }
            catch (error) {
                return (0, reboot_solutions_cms_1.onError)(response, error);
            }
        });
    }
    store(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const order = yield this.service.store(request.body);
                return (0, reboot_solutions_cms_1.onSuccess)(response, 200, order);
            }
            catch (error) {
                return (0, reboot_solutions_cms_1.onError)(response, error);
            }
        });
    }
    update(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const orderId = parseInt(request.params.id);
                const order = yield this.service.update(orderId, request.body);
                return (0, reboot_solutions_cms_1.onSuccess)(response, 200, order);
            }
            catch (error) {
                return (0, reboot_solutions_cms_1.onError)(response, error);
            }
        });
    }
    destroy(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const orderId = parseInt(request.params.id);
                const order = yield this.service.destroy(orderId);
                return (0, reboot_solutions_cms_1.onSuccess)(response, 200, order);
            }
            catch (error) {
                return (0, reboot_solutions_cms_1.onError)(response, error);
            }
        });
    }
    _verifyParamsRelations(query) {
        const relations = query === null || query === void 0 ? void 0 : query.split(",");
        return {
            category: !relations || !relations.includes("category") ? false : true,
            analysis: !relations || !relations.includes("analysis") ? false : true,
        };
    }
}
exports.default = ProductController;
//# sourceMappingURL=order-controller.js.map