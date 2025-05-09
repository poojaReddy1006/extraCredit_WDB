import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue';
import TaskForm from '../components/TaskForm.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/add-task',
    name: 'AddTask',
    component: TaskForm,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
