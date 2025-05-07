import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/client/frontend/HomeView.vue'
import CategoriesView from '@/views/client/frontend/CategoriesView.vue'
import CategoryDetailsView from '@/views/client/frontend/CategoryDetailsView.vue'
import AboutsUsView from '@/views/client/frontend/AboutsUsView.vue'
import ContactView from '@/views/client/frontend/ContactView.vue'
import LoginView from '@/views/client/frontend/LoginView.vue'
import RegisterView from '@/views/client/frontend/RegisterView.vue'
import PlanView from '@/views/client/frontend/PlanView.vue'
import PanierView from '@/views/client/frontend/PanierView.vue'
import MainView from '@/views/client/UserDashboard/MainView.vue'
import DashboardLayoutView from '@/views/client/UserDashboard/DashboardLayoutView.vue'
import RequestResetPasswordView from '@/views/client/frontend/RequestResetPasswordView.vue'
import ResetPasswordView from '@/views/client/frontend/ResetPasswordView.vue'
import AdminDashboardLayoutView from '@/views/admin/AdminDashboardLayoutView.vue'
import AdminMainView from '@/views/admin/AdminMainView.vue'
import SectorsListView from '@/views/admin/sectors/SectorsListView.vue'
import SubSectorsEditView from '@/views/admin/subsectors/SubSectorsEditView.vue'
import SubSectorsCreateView from '@/views/admin/subsectors/SubSectorsCreateView.vue'
import SubSectorsListView from '@/views/admin/subsectors/SubSectorsListView.vue'
import SectorsCreateView from '@/views/admin/sectors/SectorsCreateView.vue'
import SectorsEditView from '@/views/admin/sectors/SectorsEditView.vue'
// ✅ Importation de useAuthStore
import { useAuthStore } from '@/stores/auth/authStore'; // Assure-toi que le chemin est correct
import CategoriesEditView from '@/views/admin/categories/CategoriesEditView.vue'
import CategoriesCreateView from '@/views/admin/categories/CategoriesCreateView.vue'
import CategoriesListView from '@/views/admin/categories/CategoriesListView.vue'
import LanguagesListView from '@/views/admin/Languages/LanguagesListView.vue'
import LanguagesCreateView from '@/views/admin/Languages/LanguagesCreateView.vue'
import LanguagesEditView from '@/views/admin/Languages/LanguagesEditView.vue'
import InstructorsCreateView from '@/views/admin/Instructors/InstructorsCreateView.vue'
import InstructorsEditView from '@/views/admin/Instructors/InstructorsEditView.vue'
import InstructorsListView from '@/views/admin/Instructors/InstructorsListView.vue'
import SpecialtiesCreateView from '@/views/admin/Specialty/SpecialtiesCreateView.vue'
import SpecialtiesEditView from '@/views/admin/Specialty/SpecialtiesEditView.vue'
import SpecialtiesListView from '@/views/admin/Specialty/SpecialtiesListView.vue'
import CoursesCreateView from '@/views/admin/Courses/CoursesCreateView.vue'
import CoursesEditView from '@/views/admin/Courses/CoursesEditView.vue'
import CoursesListView from '@/views/admin/Courses/CoursesListView.vue'
import InstructorCreateUView from '@/views/client/UserDashboard/Instructors/InstructorCreateUView.vue'
import InstructorsEditViewU from '@/views/client/UserDashboard/Instructors/InstructorsEditViewU.vue'
import InstructorsListViewU from '@/views/client/UserDashboard/Instructors/InstructorsListViewU.vue'
import PrerequisitesCreateView from '@/views/admin/prerequisites/PrerequisitesCreateView.vue'
import PrerequisitesEditView from '@/views/admin/prerequisites/PrerequisitesEditView.vue'
import PrerequisitesListView from '@/views/admin/prerequisites/PrerequisitesListView.vue'
import ChaptersCreateView from '@/views/admin/chapters/ChaptersCreateView.vue'
import ChaptersEditView from '@/views/admin/chapters/ChaptersEditView.vue'
import ChaptersListView from '@/views/admin/chapters/ChaptersListView.vue'
import RecommandationsCreateView from '@/views/admin/recommandations/RecommandationsCreateView.vue'
import RecommandationsEditView from '@/views/admin/recommandations/RecommandationsEditView.vue'
import RecommandationsListView from '@/views/admin/recommandations/RecommandationsListView.vue'
import RecommandationsListSumView from '@/views/admin/recommandations/RecommandationsListSumView .vue'
import ResourceCreateView from '@/views/admin/resources/ResourceCreateView.vue'
import ResourceListView from '@/views/admin/resources/ResourceListView.vue'
import ResourceEditView from '@/views/admin/resources/ResourceEditView.vue'
import VideoCreateView from '@/views/admin/videos/VideoCreateView.vue'
import VideoEditView from '@/views/admin/videos/VideoEditView.vue'
import VideoListView from '@/views/admin/videos/VideoListView.vue'
import CoursesCreateUView from '@/views/client/UserDashboard/Courses/CoursesCreateUView.vue'
import CoursesEditUView from '@/views/client/UserDashboard/Courses/CoursesEditUView.vue'
import CoursesListUView from '@/views/client/UserDashboard/Courses/CoursesListUView.vue'
import ChaptersCreateUView from '@/views/client/UserDashboard/chapters/ChaptersCreateUView.vue'
import ChaptersEditUView from '@/views/client/UserDashboard/chapters/ChaptersEditUView.vue'
import ChaptersListUView from '@/views/client/UserDashboard/chapters/ChaptersListUView.vue'
import VideoCreateUView from '@/views/client/UserDashboard/videos/VideoCreateUView.vue'
import VideoEditUView from '@/views/client/UserDashboard/videos/VideoEditUView.vue'
import VideoListUView from '@/views/client/UserDashboard/videos/VideoListUView.vue'
import ResourceEditUView from '@/views/client/UserDashboard/resources/ResourceEditUView.vue'
import ResourceListUView from '@/views/client/UserDashboard/resources/ResourceListUView.vue'
import ResourceCreateUView from '@/views/client/UserDashboard/resources/ResourceCreateUView.vue'
import SpecialtiesEditUView from '@/views/client/UserDashboard/Specialty/SpecialtiesEditUView.vue'
import SpecialtiesUCreateView from '@/views/client/UserDashboard/Specialty/SpecialtiesUCreateView.vue'
import SpecialtiesListUView from '@/views/client/UserDashboard/Specialty/SpecialtiesListUView.vue'
import CoursesDetailsView from '@/views/client/frontend/CoursesDetailsView.vue'
import SearchView from '@/views/client/frontend/SearchView.vue'
import ProfileView from '@/views/client/UserDashboard/profile/ProfileView.vue'
import FavoritesCoursesView from '@/views/client/UserDashboard/favorites/FavoritesCoursesView.vue'
import BuysCoursesView from '@/views/client/UserDashboard/Courses/BuysCoursesView.vue'
import SellingCourseView from '@/views/client/UserDashboard/Courses/SellingCourseView.vue'
import UserListView from '@/views/admin/users/UserListView.vue'
import UserCreateView from '@/views/admin/users/UserCreateView.vue'
import UserEditView from '@/views/admin/users/UserEditView.vue'
import OrdersListView from '@/views/admin/orders/OrdersListView.vue'
import AdminContactsView from '@/views/admin/Contacts/AdminContactsView.vue'
import NotificationUserView from '@/views/client/UserDashboard/Notification/NotificationUserView.vue'
import NotificationAdminView from '@/views/admin/Notification/NotificationAdminView.vue'
import WithdrawView from '@/views/client/UserDashboard/withdraw/WithdrawView.vue'
import axios from '@/plugins/axios'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/home-course/:id',
      name: 'homeCourse',
      component: CoursesDetailsView
    },

    {
      path: '/categories',
      name: 'allCategories',
      component: CategoriesView
    },
    {
      path: '/search',
      name: 'search',
      component: SearchView
    },
    {
      path: '/category-details/:id',
      name: 'categoriesDetails',
      component: CategoryDetailsView
    },
    {
      path: '/about',
      name: 'aboutUs',
      component: AboutsUsView
    },
    {
      path: '/contact',
      name: 'contact',
      component: ContactView
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView
    },
    {
      path: '/register',
      name: 'register',
      component: RegisterView
    },
    {
      path: '/plan',
      name: 'plan',
      component: PlanView
    },
    {
      path: '/panier',
      name: 'panier',
      component: PanierView,
      meta: { requiresAuth: true },

    },

    {
      path: '/request-reset-password',
      name: 'requestResetPassword',
      component: RequestResetPasswordView
    },
    {
      path: '/users/password/reset',
      name: 'resetPassword',
      component: ResetPasswordView
    },












    {
      path: '/users-dashboard',
      component: DashboardLayoutView,
      meta: { requiresAuth: true },
      children: [
        {
          path: '',
          name: 'DashboardLayoutView',
          component: MainView,
        },

        // action pour notification
        {
          path: '/users-dashboard/notifications',
          name: 'userNotifications',
          component: NotificationUserView,
        },
        // action pour notification
        {
          path: '/users-dashboard/withdraw',
          name: 'withdraw',
          component: WithdrawView,
        },

        // action pour instructeurs
        {
          path: '/users-dashboard/create-instructor',
          name: 'beginInstructor',
          component: InstructorCreateUView,
        },

        // action pour instructeurs
        {
          path: '/users-dashboard/selling-courses',
          name: 'sellingcourses',
          component: SellingCourseView,
        },
        // action pour instructeurs
        {
          path: '/users-dashboard/buys-courses',
          name: 'byscourses',
          component: BuysCoursesView,
        },
        // action pour favoris courses
        {
          path: '/users-dashboard/My-favorites-courses',
          name: 'favcourses',
          component: FavoritesCoursesView,
        },
        // action pour profile
        {
          path: '/users-dashboard/profile',
          name: 'profile',
          component: ProfileView,
        },
        {
          path: '/users-dashboard/profile-instructor',
          name: 'ProfileInstructor',
          component: InstructorsListViewU,
        },
        {
          path: '/users-dashboard/edit-instructor',
          name: 'UpdateInstructorU',
          component: InstructorsEditViewU,
        },
        // action pour cours
        {
          path: '/users-dashboard/create-course',
          name: 'userCreateCourse',
          component: CoursesCreateUView,
        },
        {
          path: '/users-dashboard/courses',
          name: 'userCourses',
          component: CoursesListUView,
        },
        {
          path: '/users-dashboard/edit-course/:id',
          name: 'userUpdateCourse',
          component: CoursesEditUView,
        },
        // action pour chapters
        {
          path: '/users-dashboard/create-chapter',
          name: 'userCreateChapter',
          component: ChaptersCreateUView,
        },
        {
          path: '/users-dashboard/chapters',
          name: 'userChapters',
          component: ChaptersListUView,
        },
        {
          path: '/users-dashboard/edit-chapter/:id',
          name: 'userUpdateChapter',
          component: ChaptersEditUView,
        },
        // action pour videos
        {
          path: '/users-dashboard/create-video',
          name: 'userCreateVideo',
          component: VideoCreateUView,
        },
        {
          path: '/users-dashboard/videos',
          name: 'userVideos',
          component: VideoListUView,
        },
        {
          path: '/users-dashboard/edit-video/:id',
          name: 'userUpdateVideo',
          component: VideoEditUView,
        },



        // action pour ressource
        {
          path: '/users-dashboard/create-resource',
          name: 'userCreateResource',
          component: ResourceCreateUView,
        },
        {
          path: '/users-dashboard/resources',
          name: 'userResources',
          component: ResourceListUView,
        },
        {
          path: '/users-dashboard/edit-resource/:id',
          name: 'userUpdateResource',
          component: ResourceEditUView,
        },


        // action pour specialite
        {
          path: '/users-dashboard/create-specialty',
          name: 'userCreateSpecialty',
          component: SpecialtiesUCreateView,
        },
        {
          path: '/users-dashboard/specialties',
          name: 'userSpecialties',
          component: SpecialtiesListUView,
        },
        {
          path: '/users-dashboard/edit-specialty/:id',
          name: 'userUpdateSpecialty',
          component: SpecialtiesEditUView,
        },

      ],
    },






















    // les routes cotes administration
    {
      path: '/admin',
      component: AdminDashboardLayoutView,
      meta: { requiresAuth: true, requiresAdmin: true },
      children: [
        {
          path: '',
          name: 'AdminMainView',
          component: AdminMainView,
        },
        // les notif
        {
          path: '/admin-notifications',
          name: 'notif',
          component: NotificationAdminView,
        },
        // les secteurs
        {
          path: '/admin-sectors',
          name: 'sectors',
          component: SectorsListView,
        },

        {
          path: '/admin-create-sector',
          name: 'createSectors',
          component: SectorsCreateView,
        },
        {
          path: '/admin-edit-sector/:id',
          name: 'editSectors',
          component: SectorsEditView,
        },
        // les secteurs
        {
          path: '/admin-contacts',
          name: 'admincontacts',
          component: AdminContactsView,
        },

        // les user
        {
          path: '/admin-users',
          name: 'users',
          component: UserListView,
        },
        {
          path: '/admin-create-user',
          name: 'createuser',
          component: UserCreateView,
        },
        {
          path: '/admin-edit-user/:id',
          name: 'edituser',
          component: UserEditView,
        },
        // les orders
        {
          path: '/admin-orders',
          name: 'orders',
          component: OrdersListView,
        },


        // les sous-secteurs
        {
          path: '/admin-subsectors',
          name: 'subsectors',
          component: SubSectorsListView,
        },
        {
          path: '/admin-create-subsector',
          name: 'createSubSectors',
          component: SubSectorsCreateView,
        },
        {
          path: '/admin-edit-subsector/:id',
          name: 'editSubSector',
          component: SubSectorsEditView,
        },
        // les categories
        {
          path: '/admin-categories',
          name: 'categories',
          component: CategoriesListView,
        },
        {
          path: '/admin-create-category',
          name: 'createCategories',
          component: CategoriesCreateView,
        },
        {
          path: '/admin-edit-category/:id',
          name: 'editCategories',
          component: CategoriesEditView,
        },
        // les Langues
        {
          path: '/admin-languages',
          name: 'languages',
          component: LanguagesListView,
        },
        {
          path: '/admin-create-language',
          name: 'createLanguages',
          component: LanguagesCreateView,
        },
        {
          path: '/admin-edit-language/:id',
          name: 'editlanguages',
          component: LanguagesEditView,
        },
        // les instructeurs
        {
          path: '/admin-instructors',
          name: 'instructors',
          component: InstructorsListView,
        },
        {
          path: '/admin-create-instructor',
          name: 'createInstructors',
          component: InstructorsCreateView,
        },
        {
          path: '/admin-edit-instructor/:id',
          name: 'editInstructors',
          component: InstructorsEditView,
        },

        // les specialies
        {
          path: '/admin-specialties',
          name: 'specialties',
          component: SpecialtiesListView,
        },
        {
          path: '/admin-create-specialty',
          name: 'createSpecialties',
          component: SpecialtiesCreateView,
        },
        {
          path: '/admin-edit-specialty/:id',
          name: 'editSpecialties',
          component: SpecialtiesEditView,
        },
        // les cours
        {
          path: '/admin-courses',
          name: 'courses',
          component: CoursesListView,
        },
        {
          path: '/admin-create-course',
          name: 'createCourses',
          component: CoursesCreateView,
        },
        {
          path: '/admin-edit-course/:id',
          name: 'editCourses',
          component: CoursesEditView,
        },
        // les prerequis
        {
          path: '/admin-prerequisites',
          name: 'prerequisites',
          component: PrerequisitesListView,
        },
        {
          path: '/admin-create-prerequisite',
          name: 'CreatePrerequisite',
          component: PrerequisitesCreateView,
        },
        {
          path: '/admin-edit-prerequisite/:id',
          name: 'editPrerequisite',
          component: PrerequisitesEditView,
        },
        // les chapters
        {
          path: '/admin-chapters',
          name: 'chapters',
          component: ChaptersListView,
        },
        {
          path: '/admin-create-chapter',
          name: 'CreateChapter',
          component: ChaptersCreateView,
        },
        {
          path: '/admin-edit-chapter/:id',
          name: 'editChapter',
          component: ChaptersEditView,
        },
        // les recommandation
        {
          path: '/admin-recommandations',
          name: 'recommandations',
          component: RecommandationsListView,
        },
        {
          path: '/admin-create-recommandation',
          name: 'CreateRecommandation',
          component: RecommandationsCreateView,
        },
        {
          path: '/admin-edit-recommandation/:id',
          name: 'editRecommandation',
          component: RecommandationsEditView,
        },
        {
          path: '/admin-recommandations-sum',
          name: 'recommandationsSum',
          component: RecommandationsListSumView,
        },
        // les resources
        {
          path: '/admin-resources',
          name: 'resources',
          component: ResourceListView,
        },
        {
          path: '/admin-create-resource',
          name: 'CreateResource',
          component: ResourceCreateView,
        },
        {
          path: '/admin-edit-resource/:id',
          name: 'editResource',
          component: ResourceEditView,
        },

        // les videos
        {
          path: '/admin-videos',
          name: 'videos',
          component: VideoListView,
        },
        {
          path: '/admin-create-video',
          name: 'CreateVideo',
          component: VideoCreateView,
        },
        {
          path: '/admin-edit-video/:id',
          name: 'editVideo',
          component: VideoEditView,
        },


      ],
    },

  ]



});

router.beforeEach(async (to, from, next) => {
  const authStore = useAuthStore();
  if (to.meta.requiresAuth && !authStore.isAuthenticated) {
    next('/login');
  }// Vérifie l'accès admin si nécessaire
  if (to.meta.requiresAdmin) {
    const hasAdmin = localStorage.getItem('is_admin');

    if (hasAdmin === 'true') {
      return next();
    }

    try {
      // Appel API pour vérifier s’il est admin
      const res = await axios.get('/me/check-admin');

      if (res.data.is_admin) {
        localStorage.setItem('is_admin', 'true');
        return next();
      } else {
        localStorage.removeItem('is_admin');
        return next('/');
      }
    } catch (e) {
      console.error('Erreur admin check', e);
      return next('/');
    }
  }

  return next();
});

export default router
