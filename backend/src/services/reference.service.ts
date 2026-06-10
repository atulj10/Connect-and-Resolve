import { referenceCounterRepository } from "../repositories/reference-counter.repository.js";

export const referenceService = {
  async generate(): Promise<string> {
    const year = new Date().getFullYear();
    const count = await referenceCounterRepository.incrementAndGet(year);
    return `MIN/${year}/${String(count).padStart(8, "0")}`;
  },
};
