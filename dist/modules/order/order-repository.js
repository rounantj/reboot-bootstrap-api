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
class orderRepository {
    constructor(client) {
        this.client = client;
    }
    all(params) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = yield this.client.order.findMany({
                include: {
                    category: params.category,
                },
            });
            return data;
        });
    }
    get(id, params) {
        return __awaiter(this, void 0, void 0, function* () {
            const order = yield this.client.order.findFirst({
                where: { id },
                include: {
                    category: params.category,
                },
            });
            return order;
        });
    }
    getBySlug(slug, params) {
        return __awaiter(this, void 0, void 0, function* () {
            const order = yield this.client.order.findFirst({
                where: { slug },
                include: {
                    category: params.category,
                },
            });
            return order;
        });
    }
    save(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const order = yield this.client.order.create({
                include: {
                    category: true,
                },
                data,
            });
            return order;
        });
    }
    update(id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            const order = yield this.client.order.update({
                where: { id },
                include: {
                    category: true,
                },
                data,
            });
            return order;
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const order = yield this.client.order.delete({
                where: { id },
            });
            return order;
        });
    }
}
exports.default = orderRepository;
//# sourceMappingURL=order-repository.js.map