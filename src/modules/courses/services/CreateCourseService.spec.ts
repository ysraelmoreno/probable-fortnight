import CreateCourseService from './CreateCourseService'
import FakeCoursesRepository from '../repositories/fakes/FakeCoursesRepository'
import AppError from '@shared/errors/AppError'

describe('CreateCourse', () => {
  it('should be able to create a new course', async () => {
    const fakeCoursesRepository = new FakeCoursesRepository();
    const createCourse = new CreateCourseService(fakeCoursesRepository)

    const course = await createCourse.execute({
      name: "ReactJS + PHP",
      description: "Aprenda como criar aplicações com ReactJS + PHP",
      teacherId: "b617a884-ca47-4d22-8ea4-af31e39fbf00"
    })

    expect(course).toHaveProperty('id')
    expect(course.teacherId).toBe('b617a884-ca47-4d22-8ea4-af31e39fbf00')
  });

  it('should not be able to create two courses with same name', async () => {
    const fakeCoursesRepository = new FakeCoursesRepository();
    const createCourse = new CreateCourseService(fakeCoursesRepository)

    const name = "ReactJS + PHP";
    const teacherId = "b617a884-ca47-4d22-8ea4-af31e39fbf00";

    const course = await createCourse.execute({
      name: name,
      description: "Aprenda como criar aplicações com ReactJS + PHP",
      teacherId: teacherId
    })

    expect(createCourse.execute({
      name: name,
      description: "Aprenda como criar aplicações com ReactJS + PHP",
      teacherId: teacherId
    })).rejects.toBeInstanceOf(AppError);
  });
});
