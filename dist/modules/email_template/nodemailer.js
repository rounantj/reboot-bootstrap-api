'use strict';
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
const fs_1 = __importDefault(require("fs"));
const nodemailer_1 = __importDefault(require("nodemailer"));
const config_1 = require("../../helpers/config");
const env = config_1.Config.instance;
const transport = nodemailer_1.default.createTransport({
    host: env.config.smtpHost,
    port: env.config.smtpPort,
    secure: env.config.smtpSecure,
    auth: {
        user: env.config.smtpUser,
        pass: env.config.smtpPass,
    },
    tls: {
        ciphers: 'SSLv3',
    },
});
function sendEmail(emailTo, subject, html, withAttachments = false, fileNamePdf = "") {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            if (withAttachments && fs_1.default.existsSync(`${__dirname}/document/${fileNamePdf}`)) {
                const info = yield transport.sendMail({
                    from: env.config.mailFrom,
                    to: emailTo,
                    subject,
                    html,
                    attachments: [
                        {
                            filename: `${__dirname}/document/9.pdf`,
                            path: `${__dirname}/document/${fileNamePdf}`,
                            contentType: 'application/pdf',
                            encoding: 'base64',
                        },
                    ],
                });
                console.log(info);
                return { msg: `Mensagem enviada para: ${emailTo}`, attachement: withAttachments, pathStatus: fs_1.default.existsSync(`${__dirname}/document/${fileNamePdf}`) };
            }
            else {
                const info = yield transport.sendMail({
                    from: env.config.mailFrom,
                    to: emailTo,
                    subject,
                    html
                });
                console.log(info);
                return { msg: `Mensagem enviada para: ${emailTo}`, attachement: withAttachments, pathStatus: fs_1.default.existsSync(`${__dirname}/document/${fileNamePdf}`) };
            }
        }
        catch (error) {
            console.error(error);
            return `Não foi possível enviar a mensagem`;
        }
    });
}
exports.default = sendEmail;
//# sourceMappingURL=nodemailer.js.map