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
class languageRepository {
    constructor(client) {
        this.client = client;
    }
    all() {
        return __awaiter(this, void 0, void 0, function* () {
            // TODO: transform word in plural with irregular to0
            const data = yield this.client.language.findMany({});
            return data;
        });
    }
    get(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const language = yield this.client.language.findFirst({
                where: { id },
            });
            return language;
        });
    }
    save(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const language = yield this.client.language.create({
                data,
            });
            return language;
        });
    }
    update(id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            const language = yield this.client.language.update({
                where: { id },
                data,
            });
            return language;
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const language = yield this.client.language.delete({
                where: { id },
            });
            return language;
        });
    }
}
exports.default = languageRepository;
//# sourceMappingURL=language-repository.js.map