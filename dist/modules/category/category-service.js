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
const category_repository_1 = __importDefault(require("./category-repository"));
class categoryService {
    constructor(prismaClient) {
        this.prismaClient = prismaClient;
        this.categoryRepository = new category_repository_1.default(prismaClient);
    }
    fetchAll() {
        return __awaiter(this, void 0, void 0, function* () {
            const categorys = yield this.categoryRepository.all();
            return { categorys };
        });
    }
    fetchById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const category = yield this.categoryRepository.get(id);
            return { category };
        });
    }
    fetchBySlug(slug) {
        return __awaiter(this, void 0, void 0, function* () {
            const category = yield this.categoryRepository.getBySlug(slug);
            return { category };
        });
    }
    store(payload) {
        return __awaiter(this, void 0, void 0, function* () {
            const category = yield this.categoryRepository.save(payload);
            return { category };
        });
    }
    update(id, payload) {
        return __awaiter(this, void 0, void 0, function* () {
            const category = yield this.categoryRepository.update(id, payload);
            return { category };
        });
    }
    destroy(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const category = yield this.categoryRepository.delete(id);
            return { category };
        });
    }
}
exports.default = categoryService;
//# sourceMappingURL=category-service.js.map