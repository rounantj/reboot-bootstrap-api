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
class email_TemplateRepository {
    constructor(client) {
        this.client = client;
    }
    all() {
        return __awaiter(this, void 0, void 0, function* () {
            // TODO: transform word in plural with irregular to0
            const data = yield this.client.email_template.findMany({});
            return data;
        });
    }
    get(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const email_template = yield this.client.email_template.findFirst({
                where: { id },
            });
            return email_template;
        });
    }
    save(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const email_template = yield this.client.email_template.create({
                data,
            });
            return email_template;
        });
    }
    update(id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            const email_template = yield this.client.email_template.update({
                where: { id },
                data,
            });
            return email_template;
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const email_template = yield this.client.email_template.delete({
                where: { id },
            });
            return email_template;
        });
    }
}
exports.default = email_TemplateRepository;
//# sourceMappingURL=email_template-repository.js.map