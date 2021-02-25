import CreateCategoryService from './CreateCategoryService'
import FakeCoursesCategoryRepository from '../repositories/fakes/FakeCoursesCategoryRepository'
import AppError from '@shared/errors/AppError'

describe('Create Category', () => {
  it('should be able to create a new category', async () => {
    const fakeCategoryRepository = new FakeCoursesCategoryRepository();
    const createCategory = new CreateCategoryService(fakeCategoryRepository)

    const name = "Programação"
    const category = await createCategory.execute(name)

    expect(category).toHaveProperty('name');
    expect(category.name).toBe(name)
  });

});
