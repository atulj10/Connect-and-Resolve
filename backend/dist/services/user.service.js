import { userRepository } from "../repositories/user.repository.js";
export const userService = {
    async list(page, pageSize) {
        const skip = (page - 1) * pageSize;
        const [users, total] = await Promise.all([
            userRepository.findAll(skip, pageSize),
            userRepository.countAll(),
        ]);
        return { users, total, page, pageSize, totalPages: Math.ceil(total / pageSize) };
    },
    async search(query) {
        return userRepository.search(query);
    },
    async getById(id) {
        const user = await userRepository.findById(id);
        if (!user)
            throw new Error("User not found");
        return user;
    },
};
//# sourceMappingURL=user.service.js.map