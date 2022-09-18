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
Object.defineProperty(exports, "__esModule", { value: true });
class categoryRepository {
    constructor(client) {
        this.client = client;
    }
    all() {
        return __awaiter(this, void 0, void 0, function* () {
            // TODO: transform word in plural with irregular to0
            const data = yield this.client.category.findMany({});
            return data;
        });
    }
    get(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const category = yield this.client.category.findFirst({
                where: { id },
            });
            return category;
        });
    }
    getBySlug(slug) {
        return __awaiter(this, void 0, void 0, function* () {
            const category = yield this.client.category.findFirst({
                where: { slug },
            });
            return category;
        });
    }
    save(data) {
        return __awaiter(this, void 0, void 0, function* () {
            // TODO: change any to properly interface
            const category = yield this.client.category.create({
                data,
            });
            return category;
        });
    }
    update(id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            const category = yield this.client.category.update({
                where: { id },
                data,
            });
            return category;
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const category = yield this.client.category.delete({
                where: { id },
            });
            return category;
        });
    }
}
exports.default = categoryRepository;
//# sourceMappingURL=category-repository.js.map