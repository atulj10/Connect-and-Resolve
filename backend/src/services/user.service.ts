import { userRepository } from "../repositories/user.repository.js";

export const userService = {
  async list(page: number, pageSize: number) {
    const skip = (page - 1) * pageSize;
    const [users, total] = await Promise.all([
      userRepository.findAll(skip, pageSize),
      userRepository.countAll(),
    ]);
    return { users, total, page, pageSize, totalPages: Math.ceil(total / pageSize) };
  },

  async search(query: string) {
    return userRepository.search(query);
  },

  async getById(id: string) {
    const user = await userRepository.findById(id);
    if (!user) throw new Error("User not found");
    return user;
  },
};
