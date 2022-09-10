import { PrismaClient } from "@prisma/client";
import CategoryRepository from "./category-repository";

export default class categoryService {
  private readonly categoryRepository: CategoryRepository;

  constructor(public prismaClient: PrismaClient) {
    this.categoryRepository = new CategoryRepository(prismaClient);
  }

  async fetchAll() {
    const categorys = await this.categoryRepository.all();
    return { categorys };
  }

  async fetchById(id: number) {
    const category = await this.categoryRepository.get(id);
    return { category };
  }

  async fetchBySlug(slug: string) {
    const category = await this.categoryRepository.getBySlug(slug);
    return { category };
  }

  async store(payload: Object) {
    const category = await this.categoryRepository.save(payload);
    return { category };
  }

  async update(id: number, payload: Object) {
    const category = await this.categoryRepository.update(id, payload);
    return { category };
  }

  async destroy(id: number) {
    const category = await this.categoryRepository.delete(id);
    return { category };
  }
}
