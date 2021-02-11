import { createRouter, createWebHashHistory } from 'vue-router';
import Dashboard from '../components/Dashboard.vue';

const routes = [
    {
        path: '/',
        name: 'dashboard',
        component: Dashboard,
    },

    {
        path: '/recipes',
        name: 'recipes',
        component: () => import('../pages/Recipes.vue'),
    },
    {
      path: '/batches',
      name: 'batches',
      component: () => import('../pages/Batches.vue'),
    },
    {
      path: '/inventory',
      name: 'inventory',
      component: () => import('../pages/Inventory.vue'),
    },
    {
      path: '/sales',
      name: 'sales',
      component: () => import('../pages/Sales.vue'),
    },{
      path: '/reports',
      name: 'reports',
      component: () => import('../pages/Reports.vue'),
    },
    {
      path: '/calculators',
      name: 'calculators',
      component: () => import('../pages/Calculators.vue'),
    },
    {
        path: '/calendar',
        name: 'calendar',
        component: () => import('../pages/Calendars.vue'),
    },
];

const router = createRouter({
    history: createWebHashHistory(),
    routes,
});

export default router;
