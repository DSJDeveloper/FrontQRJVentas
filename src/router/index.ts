import { createRouter, createWebHistory } from 'vue-router';
import MainRoutes from './MainRoutes';
import AuthRoutes from './AuthRoutes';
// import { useAuthStore } from '@/stores/auth';
import { useTokenStore } from '@/stores/useTokenStore';

export const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/:pathMatch(.*)*',
      component: () => import('@/views/pages/maintenance/error/Error404Page.vue')
    },
    MainRoutes,
    AuthRoutes
  ]
});

// interface User {
//   // Define the properties and their types for the user data here
//   // For example:
//   id: number;
//   name: string;
// }

// Assuming you have a type/interface for your authentication store
// interface AuthStore {
//   user: User | null;
//   returnUrl: string | null;
//   login(username: string, password: string): Promise<void>;
//   logout(): void;
// }

router.beforeEach(async (to, from, next) => {
  // redirect to login page if not logged in and trying to access a restricted page
  const publicPages = ['/auth/login'];
  const authRequired = !publicPages.includes(to.path);
  const usetoken = useTokenStore()
  const auth = usetoken.isSelectCompany
  // if (authRequired && !auth) {
  //   next(publicPages[0])
  // } else {
  //   next()
  // }

  // const auth: AuthStore = useAuthStore();
  
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (authRequired && !auth) {
      //auth.returnUrl = to.fullPath;
      return next('/auth/login');
    } else next();
  } else {
    next();
  }
});

