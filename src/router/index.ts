import FourZeroFour from '@/views/Errors/FourZeroFour.vue'
import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/stores/authStore'

const baseUrl = '/'

const router = createRouter({
  history: createWebHistory(baseUrl),
  scrollBehavior(to, from, savedPosition) {
    return savedPosition || { left: 0, top: 0 }
  },
  routes: [
    {
      path: '/',
      name: 'Home',
      component: () => import('../views/Users/Users.vue'),
      meta: {
        title: 'Home',
        requiresAuth: true,
        module: 'users',
      },
    },

    {
      path: '/signin',
      name: 'Signin',
      component: () => import('../views/Auth/Signin.vue'),
      meta: {
        title: 'Signin',
      },
    },

    {
      path: '/profile',
      name: 'Profile',
      component: () => import('../views/Profile/Profile.vue'),
      meta: {
        title: 'My Profile',
        requiresAuth: true,
      },
    },

    {
      path: '/dashboard',
      name: 'Dashboard',
      component: () => import('../views/LabDashboard.vue'),
      meta: {
        title: 'Dashboard',
        requiresAuth: true,
        module: 'dashboard',
      },
    },

    {
      path: '/products',
      name: 'Products',
      component: () => import('../views/Users/Users.vue'),
      meta: {
        title: 'Products',
        requiresAuth: true,
        module: 'products',
      },
    },

    {
      path: '/users',
      name: 'Users',
      component: () => import('../views/Users/Users.vue'),
      meta: {
        title: 'Users',
        requiresAuth: true,
        module: 'users',
      },
    },

    {
      path: '/users/create-user',
      name: 'createUser',
      component: () => import('../views/Users/CreateUser.vue'),
      meta: {
        title: 'Create user',
        requiresAuth: true,
        module: 'users',
        permission: 'create',
      },
    },

    {
      path: '/users/edit-user/:id',
      name: 'editUser',
      component: () => import('../views/Users/EditUser.vue'),
      meta: {
        title: 'Edit user',
        requiresAuth: true,
        module: 'users',
        permission: 'edit',
      },
    },

    {
      path: '/roles',
      name: 'Roles',
      component: () => import('../views/Settings/Settings.vue'),
      meta: {
        title: 'Roles',
        requiresAuth: true,
        module: 'roles',
      },
    },

    /* Gestion de Catalogo */
    {
      path: '/categories',
      name: 'Categories',
      component: () => import('../views/Category/Category.vue'),
      meta: {
        title: 'Categories',
        requiresAuth: true,
        module: 'categories',
      },
    },

    {
      path: '/categories/create-category',
      name: 'createCategory',
      component: () => import('../views/Category/CreateCategory.vue'),
      meta: {
        title: 'Create category',
        requiresAuth: true,
        module: 'categories',
        permission: 'create',
      },
    },

    {
      path: '/categories/edit-category/:id',
      name: 'editCategory',
      component: () => import('../views/Category/EditCategory.vue'),
      meta: {
        title: 'Edit category',
        requiresAuth: true,
        module: 'categories',
        permission: 'edit',
      },
    },

    /* Gestion de Equipos  */
    {
      path: '/equipment',
      name: 'equipment',
      component: () => import('../views/Equipment/Equipment.vue'),
      meta: {
        title: 'Equipment',
        requiresAuth: true,
        module: 'equipment',
      },
    },
    {
      path: '/  equipment/create-equipment',
      name: 'createEquipment',
      component: () => import('../views/Equipment/EquipmentCreate.vue'),
      meta: {
        title: 'Create Equipment',
        requiresAuth: true,
        module: 'equipment',
        permission: 'create',
      },
    },
    
    {
      path: '/equipment/edit-equipment/:id',
      name: 'editEquipment',
      component: () => import('../views/Equipment/EquipmentEdit.vue'),
      meta: {
        title: 'Edit Equipment',
        requiresAuth: true,
        module: 'equipment',
        permission: 'edit',
      },
    },

    /* Gestion de Reservas */
    {
      path: '/reservations',
      name: 'Reservations',
      component: () => import('../views/Reservations/Reservations.vue'),
      meta: {
        title: 'Reservations',
        requiresAuth: true,
        module: 'reservations',
      },
    },
    {
      path: '/reservations/create',
      name: 'createReservation',
      component: () => import('../views/Reservations/CreateReservation.vue'),
      meta: {
        title: 'Create Reservation',
        requiresAuth: true,
        module: 'reservations',
        permission: 'create',
      },
    },
    {
      path: '/reservations/edit/:id',
      name: 'editReservation',
      component: () => import('../views/Reservations/EditReservation.vue'),
      meta: {
        title: 'Edit Reservation',
        requiresAuth: true,
        module: 'reservations',
        permission: 'edit',
      },
    },

    /* Gestion de Reportes */
    {
      path: '/report-requests',
      name: 'ReportRequests',
      component: () => import('../views/Reports/ReportRequests.vue'),
      meta: {
        title: 'Report Requests',
        requiresAuth: true,
        module: 'report-requests',
      },
    },
    {
      path: '/report-requests/create',
      name: 'createReportRequest',
      component: () => import('../views/Reports/CreateReportRequest.vue'),
      meta: {
        title: 'Create Report Request',
        requiresAuth: true,
        module: 'report-requests',
        permission: 'create',
      },
    },
    {
      path: '/reports',
      name: 'Reports',
      component: () => import('../views/Reports/Reports.vue'),
      meta: {
        title: 'Reports',
        requiresAuth: true,
        module: 'reports',
      },
    },

    // ERROR ROUTES
    {
      path: '/error-404',
      name: '404 Error',
      component: FourZeroFour,
      meta: {
        title: '404 Error',
      },
    },

    {
      path: '/:pathMatch(.*)*',
      redirect: '/error-404',
    },
  ],
})

// ROUTER GUARDS CON VERIFICACIÓN DE PERMISOS
router.beforeEach((to, from, next) => {
  document.title = `${to.meta.title} | LabNova`

  const authStore = useAuthStore()
  const requiresAuth = to.matched.some((record) => record.meta.requiresAuth)
  const isAuthenticated = !!authStore.token

  // si requiere auth y no está logueado
  if (requiresAuth && !isAuthenticated) {
    next({ name: 'Signin' })
    return
  }

  // Redirección desde home
  if (to.path === '/') {
    if (isAuthenticated) {
      const firstModule = authStore.modules[0]

      if (firstModule?.children?.length) {
        next(firstModule.children[0].route!)
      } else if (firstModule?.route) {
        next(firstModule.route)
      } else {
        next('/dashboard')
      }
    } else {
      next({ name: 'Signin' })
    }
    return
  }

  // Verificar permisos
  if (requiresAuth && to.meta.module) {
    const moduleSlug = to.meta.module as string
    const requiredPermission = to.meta.permission as string | undefined

    if (!authStore.hasModule(moduleSlug)) {
      next('/error-404')
      return
    }

    if (requiredPermission && !authStore.hasPermission(moduleSlug, requiredPermission)) {
      next('/error-404')
      return
    }
  }

  next()
})

export default router
