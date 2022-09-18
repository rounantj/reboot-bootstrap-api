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
const product_service_1 = __importDefault(require("./product-service"));
class ProductController {
    constructor(prismaClient) {
        this.prismaClient = prismaClient;
        this.service = new product_service_1.default(prismaClient);
    }
    index(request, response) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const params = this._verifyParamsRelations((_a = request.query.includes) === null || _a === void 0 ? void 0 : _a.toString());
                const products = yield this.service.fetchAll(params);
                return (0, reboot_solutions_cms_1.onSuccess)(response, 200, products);
            }
            catch (error) {
                return (0, reboot_solutions_cms_1.onError)(response, error);
            }
        });
    }
    upload(request, response, uploads) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { file } = request;
                return (0, reboot_solutions_cms_1.onSuccess)(response, 200, { file });
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
                const productId = parseInt(request.params.id);
                const params = this._verifyParamsRelations((_a = request.query.includes) === null || _a === void 0 ? void 0 : _a.toString());
                const product = yield this.service.fetchById(productId, params);
                return (0, reboot_solutions_cms_1.onSuccess)(response, 200, product);
            }
            catch (error) {
                return (0, reboot_solutions_cms_1.onError)(response, error);
            }
        });
    }
    showBySlug(request, response) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const params = this._verifyParamsRelations((_a = request.query.includes) === null || _a === void 0 ? void 0 : _a.toString());
                const product = yield this.service.fetchBySlug(request.params.slug, params);
                return (0, reboot_solutions_cms_1.onSuccess)(response, 200, product);
            }
            catch (error) {
                return (0, reboot_solutions_cms_1.onError)(response, error);
            }
        });
    }
    showByEan(request, response) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const params = this._verifyParamsRelations((_a = request.query.includes) === null || _a === void 0 ? void 0 : _a.toString());
                const product = yield this.service.fetchByEan(request.params.ean, params);
                return (0, reboot_solutions_cms_1.onSuccess)(response, 200, product);
            }
            catch (error) {
                return (0, reboot_solutions_cms_1.onError)(response, error);
            }
        });
    }
    store(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const product = yield this.service.store(request.body);
                return (0, reboot_solutions_cms_1.onSuccess)(response, 200, product);
            }
            catch (error) {
                return (0, reboot_solutions_cms_1.onError)(response, error);
            }
        });
    }
    update(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const productId = parseInt(request.params.id);
                const product = yield this.service.update(productId, request.body);
                return (0, reboot_solutions_cms_1.onSuccess)(response, 200, product);
            }
            catch (error) {
                return (0, reboot_solutions_cms_1.onError)(response, error);
            }
        });
    }
    destroy(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const productId = parseInt(request.params.id);
                const product = yield this.service.destroy(productId);
                return (0, reboot_solutions_cms_1.onSuccess)(response, 200, product);
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
//# sourceMappingURL=product-controller.js.map