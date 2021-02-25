import { container } from 'tsyringe'

import '@modules/users/providers'
import '@shared/container/providers'

import ICoursesRepository from '@modules/courses/repositories/ICoursesRepository';
import CoursesRepository from '@modules/courses/infra/typeorm/repositories/CoursesRepository'

import IUsersRepository from '@modules/users/repositories/IUsersRepository'
import UsersRepository from '@modules/users/infra/typeorm/repositories/UsersRepository'

import IUserTokensRepository from '@modules/users/repositories/IUserTokensRepository'
import UserTokensRepository from '@modules/users/infra/typeorm/repositories/UserTokensRepository'

import ICourseContentRepository from '@modules/courses/repositories/ICourseContentRepository'
import CourseContentRepository from '@modules/courses/infra/typeorm/repositories/CourseContentRepository'

import ICoursesCategoryRepository from '@modules/courses/repositories/ICoursesCategoryRepository'
import CoursesCategoryRepository from '@modules/courses/infra/typeorm/repositories/CoursesCategoryRepository'

import INotificationsRepository from '@modules/notifications/repositories/INotificationsRepository'
import NotificationsRepository from '@modules/notifications/infra/repositories/NotificationsRepository'

container.registerSingleton<ICoursesRepository>('CoursesRepository', CoursesRepository);
container.registerSingleton<IUsersRepository>('UsersRepository', UsersRepository);
container.registerSingleton<IUserTokensRepository>('UserTokensRepository', UserTokensRepository);
container.registerSingleton<INotificationsRepository>('NotificationsRepository', NotificationsRepository);
container.registerSingleton<ICourseContentRepository>('CourseContentRepository', CourseContentRepository);
container.registerSingleton<ICoursesCategoryRepository>('CoursesCategoryRepository', CoursesCategoryRepository);
