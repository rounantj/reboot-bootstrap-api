"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class UserRepository {
    constructor(client) {
        this.client = client;
    }
    all(params) {
        return this.client.user.findMany({
            include: {
                role: params.role,
            },
        });
    }
    get(id, params) {
        return this.client.user.findFirst({
            where: { id },
            include: {
                role: params.role,
            },
        });
    }
    getByEmail(email) {
        return this.client.user.findFirst({
            where: { email },
        });
    }
    update(id, data) {
        return this.client.user.update({
            where: { id },
            data,
        });
    }
    delete(id) {
        return this.client.user.delete({
            where: { id },
        });
    }
}
exports.default = UserRepository;
//# sourceMappingURL=user-repository.js.map