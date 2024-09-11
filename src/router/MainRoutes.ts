const MainRoutes = {
  path: '/main',
  meta: {
    requiresAuth: true
  },
  redirect: '/main/dashboard/default',
  component: () => import('@/layouts/full/FullLayout.vue'),
  children: [
    {
      name: 'LandingPage',
      path: '/',
      component: () => import('@/views/dashboards/default/DefaultDashboard.vue')
    },
    {
      name: 'Default',
      path: '/dashboard/default',
      component: () => import('@/views/dashboards/default/DefaultDashboard.vue')
    },
    {
      name: 'Starter',
      path: '/starter',
      component: () => import('@/views/StarterPage.vue')
    },
    {
      name: 'Tabler Icons',
      path: '/icons/tabler',
      component: () => import('@/views/utilities/icons/TablerIcons.vue')
    },
    {
      name: 'Material Icons',
      path: '/icons/material',
      component: () => import('@/views/utilities/icons/MaterialIcons.vue')
    },
    {
      name: 'Typography',
      path: '/utils/typography',
      component: () => import('@/views/utilities/typography/TypographyPage.vue')
    },
    {
      name: 'Shadows',
      path: '/utils/shadows',
      component: () => import('@/views/utilities/shadows/ShadowPage.vue')
    },
    {
      name: 'Colors',
      path: '/utils/colors',
      component: () => import('@/views/utilities/colors/ColorPage.vue')
    }
    ,
    {
      name: 'ListUser',
      path: '/users/list',
      component: () => import('@/views/users/ListUsers.vue')
    }
    ,
    {
      name: 'ListClients',
      path: '/client/list',
      component: () => import('@/views/clients/ListClients.vue')
    },
    {
      name: 'ListSellers',
      path: '/sellers/list',
      component: () => import('@/views/sellers/ListSellers.vue')
    }
    ,
    {
      name: 'ListProducts',
      path: '/products/list',
      component: () => import('@/views/products/ListProducts.vue')
    }
    ,
    {
      name: 'ListOrders',
      path: '/orders/list',
      component: () => import('@/views/orders/ListOrders.vue')
    }
    ,
    {
      name: 'ListWorkSpaces',
      path: '/workspaces/list',
      component: () => import('@/views/workspaces/ListWorkSpaces.vue')
    }
    ,
    {
      name: 'ListCurrencys',
      path: '/currencys/list',
      component: () => import('@/views/currencys/ListCurrencys.vue')
    }
  ]
};

export default MainRoutes;
