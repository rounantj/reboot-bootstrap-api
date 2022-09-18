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
const product_repository_1 = __importDefault(require("./product-repository"));
class productService {
    constructor(prismaClient) {
        this.prismaClient = prismaClient;
        this.productRepository = new product_repository_1.default(prismaClient);
    }
    fetchAll(params) {
        return __awaiter(this, void 0, void 0, function* () {
            const products = yield this.productRepository.all(params);
            return { products };
        });
    }
    fetchById(id, params) {
        return __awaiter(this, void 0, void 0, function* () {
            const product = yield this.productRepository.get(id, params);
            return { product };
        });
    }
    fetchBySlug(slug, params) {
        return __awaiter(this, void 0, void 0, function* () {
            const product = yield this.productRepository.getBySlug(slug, params);
            return { product };
        });
    }
    fetchByEan(ean, params) {
        return __awaiter(this, void 0, void 0, function* () {
            const product = yield this.productRepository.getByEan(ean, params);
            return { product };
        });
    }
    store(payload) {
        return __awaiter(this, void 0, void 0, function* () {
            const product = yield this.productRepository.save(payload);
            return { product };
        });
    }
    update(id, payload) {
        return __awaiter(this, void 0, void 0, function* () {
            const product = yield this.productRepository.update(id, payload);
            return { product };
        });
    }
    destroy(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const product = yield this.productRepository.delete(id);
            return { product };
        });
    }
}
exports.default = productService;
//# sourceMappingURL=product-service.js.map