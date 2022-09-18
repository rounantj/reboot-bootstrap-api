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
const email_template_service_1 = __importDefault(require("./email_template-service"));
const jspdf_1 = __importDefault(require("jspdf"));
const jspdf_autotable_1 = __importDefault(require("jspdf-autotable"));
const fs_1 = __importDefault(require("fs"));
const nodemailer_1 = __importDefault(require("./nodemailer"));
const util_1 = require("util");
class Email_TemplateController {
    constructor(prismaClient) {
        this.prismaClient = prismaClient;
        this.service = new email_template_service_1.default(prismaClient);
    }
    index(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const email_Templates = yield this.service.fetchAll();
                return (0, reboot_solutions_cms_1.onSuccess)(response, 200, email_Templates);
            }
            catch (error) {
                return (0, reboot_solutions_cms_1.onError)(response, error);
            }
        });
    }
    show(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const email_TemplateId = parseInt(request.params.id);
                const email_template = yield this.service.fetchById(email_TemplateId);
                return (0, reboot_solutions_cms_1.onSuccess)(response, 200, email_template);
            }
            catch (error) {
                return (0, reboot_solutions_cms_1.onError)(response, error);
            }
        });
    }
    store(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const email_template = yield this.service.store(request.body);
                return (0, reboot_solutions_cms_1.onSuccess)(response, 200, email_template);
            }
            catch (error) {
                return (0, reboot_solutions_cms_1.onError)(response, error);
            }
        });
    }
    update(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const email_TemplateId = parseInt(request.params.id);
                const email_template = yield this.service.update(email_TemplateId, request.body);
                return (0, reboot_solutions_cms_1.onSuccess)(response, 200, email_template);
            }
            catch (error) {
                return (0, reboot_solutions_cms_1.onError)(response, error);
            }
        });
    }
    destroy(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const email_TemplateId = parseInt(request.params.id);
                const email_template = yield this.service.destroy(email_TemplateId);
                return (0, reboot_solutions_cms_1.onSuccess)(response, 200, email_template);
            }
            catch (error) {
                return (0, reboot_solutions_cms_1.onError)(response, error);
            }
        });
    }
    makePdfFromJson(jsonObj, pdfName) {
        return __awaiter(this, void 0, void 0, function* () {
            var doc = new jspdf_1.default();
            var colunas = jsonObj.columns;
            (0, jspdf_autotable_1.default)(doc, {
                head: [colunas],
                body: jsonObj.values,
            });
            doc.save(`modules/email_template/document/${pdfName}.pdf`);
        });
    }
    document(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            let ID = request.params.id;
            let path = require('path');
            if (ID) {
                console.log(path.join(__dirname, 'document', ID.toString(), '.pdf'));
                let arquivo = `/document/${ID.toString()}.pdf`;
                response.sendFile(__dirname + arquivo);
            }
        });
    }
    mailSender(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let { emailTo, subject, html, withAttachments, fileNamePdf } = request.body;
                if ((0, util_1.isObject)(html)) {
                    let newHtml = yield fs_1.default.readFileSync(`${__dirname}/templates/default.html`).toString();
                    newHtml = newHtml.replace(/{{MY_TITLE}}/g, html.title)
                        .replace(/{{MY_INNER_CONTENT}}/g, html.inner_content)
                        .replace(/{{MY_TOP_CONTENT}}/g, html.top_content)
                        .replace(/{{MY_FOOTER_CONTENT}}/g, html.footer_content)
                        .replace(/{{MY_CREDITS}}/g, html.credits)
                        .replace(/{{MY_SITE_URL}}/g, html.site_url);
                    const result = yield (0, nodemailer_1.default)(emailTo, subject, newHtml, withAttachments, fileNamePdf);
                    return (0, reboot_solutions_cms_1.onSuccess)(response, 200, { status: result });
                }
                else {
                    const result = yield (0, nodemailer_1.default)(emailTo, subject, html, withAttachments, fileNamePdf);
                    return (0, reboot_solutions_cms_1.onSuccess)(response, 200, { status: result });
                }
            }
            catch (error) {
                return (0, reboot_solutions_cms_1.onError)(response, error);
            }
        });
    }
    _verifyParamsRelations(query) {
        const relations = query === null || query === void 0 ? void 0 : query.split(",");
        return {
            consultant: !relations || !relations.includes("consultant") ? false : true,
            producer: !relations || !relations.includes("producer") ? false : true,
            culture: !relations || !relations.includes("culture") ? false : true,
            product: !relations || !relations.includes("product") ? false : true,
            investment: !relations || !relations.includes("investment") ? false : true,
        };
    }
}
exports.default = Email_TemplateController;
//# sourceMappingURL=email_template-controller.js.map