import Vue from 'vue'
import VueRouter from 'vue-router'
import CartPage from '../views/CartPage.vue'
import ProductsPage from '../views/ProductsPage.vue'
import ProductDetailPage from '../views/ProductDetailPage.vue'
import NotFoundPage from '../views/NotFoundPage.vue'
import LoginPage from '../views/LoginPage.vue'
import RegisterPage from '../views/RegisterPage.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/cart',
    name: 'cart',
    component: CartPage
  },
  {
    path: '/products/:id',
    name: 'product',
    component: ProductDetailPage
  },
  {
    path: '/products',
    name: 'products',
    component: ProductsPage
  },
  {
    path: '/',
    redirect: '/products'
  },
  {
    path: '*',
    redirect: '/not-found'
  },
  {
    path: '/not-found',
    name: 'not-found',
    component: NotFoundPage
  },
  {
    path: '/login',
    name: 'login',
    component: LoginPage
  },
  {
    path: '/register',
    name: 'register',
    component: RegisterPage
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
