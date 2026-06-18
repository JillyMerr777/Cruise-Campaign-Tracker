import { createRouter, createWebHistory } from 'vue-router';

const routes = [
  {
    path: '/',
    name: 'dashboard',
    component: () => import('../views/DashboardView.vue')
  },
  {
    path: '/campaigns/new',
    name: 'new-campaign',
    component: () => import('../views/NewCampaignView.vue')
  },
  {
    path: '/campaigns/:id',
    name: 'campaign-detail',
    component: () => import('../views/CampaignDetailView.vue')
  },
  {
    path: '/lifecycle',
    name: 'lifecycle',
    component: () => import('../views/LifecycleTrackerView.vue')
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
