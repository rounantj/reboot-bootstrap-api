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
const email_template_repository_1 = __importDefault(require("./email_template-repository"));
class email_TemplateService {
    constructor(prismaClient) {
        this.prismaClient = prismaClient;
        this.email_TemplateRepository = new email_template_repository_1.default(prismaClient);
    }
    fetchAll() {
        return __awaiter(this, void 0, void 0, function* () {
            const email_Templates = yield this.email_TemplateRepository.all();
            return { email_Templates };
        });
    }
    fetchById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const email_template = yield this.email_TemplateRepository.get(id);
            return { email_template };
        });
    }
    store(payload) {
        return __awaiter(this, void 0, void 0, function* () {
            const email_template = yield this.email_TemplateRepository.save(payload);
            return { email_template };
        });
    }
    update(id, payload) {
        return __awaiter(this, void 0, void 0, function* () {
            const email_template = yield this.email_TemplateRepository.update(id, payload);
            return { email_template };
        });
    }
    destroy(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const email_template = yield this.email_TemplateRepository.delete(id);
            return { email_template };
        });
    }
}
exports.default = email_TemplateService;
//# sourceMappingURL=email_template-service.js.map