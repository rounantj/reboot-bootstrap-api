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
const order_repository_1 = __importDefault(require("./order-repository"));
class orderService {
    constructor(prismaClient) {
        this.prismaClient = prismaClient;
        this.orderRepository = new order_repository_1.default(prismaClient);
    }
    fetchAll(params) {
        return __awaiter(this, void 0, void 0, function* () {
            const order = yield this.orderRepository.all(params);
            return { order };
        });
    }
    fetchById(id, params) {
        return __awaiter(this, void 0, void 0, function* () {
            const order = yield this.orderRepository.get(id, params);
            return { order };
        });
    }
    fetchBySlug(slug, params) {
        return __awaiter(this, void 0, void 0, function* () {
            const order = yield this.orderRepository.getBySlug(slug, params);
            return { order };
        });
    }
    store(payload) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(payload);
            const order = yield this.orderRepository.save(payload);
            return { order };
        });
    }
    update(id, payload) {
        return __awaiter(this, void 0, void 0, function* () {
            const order = yield this.orderRepository.update(id, payload);
            return { order };
        });
    }
    destroy(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const order = yield this.orderRepository.delete(id);
            return { order };
        });
    }
}
exports.default = orderService;
//# sourceMappingURL=order-service.js.map