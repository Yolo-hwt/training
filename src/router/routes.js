export default [
    // 路由重定向
    {
        path: "*",
        redirect: "/login"
    },
    {
        name: 'login',
        path: '/login',
        component: () => import('@/pages/Login'),
        meta: {}
    },
    {
        name: 'home',
        path: '/home',
        component: () => import('@/pages/Home'),
        meta: { isAuth: true },
        // 登录作为唯一入口
        // beforeEnter(to, from, next) {
        //     if (from.path === "/login") {
        //         next();
        //     } else {
        //         next(false);
        //     }
        // }
    },
    {
        name: 'graph',
        path: '/graph',
        component: () => import('@/pages/Graph'),
        children: [
            {
                path: "/graph",
                redirect: "/graph/monitor"
            },
            {
                name: 'monitor',
                path: 'monitor',
                component: () => import('@/pages/Monitor')
            },
            {
                name: 'trace',
                path: 'trace',
                component: () => import('@/pages/Trace')
            }
        ]
    },
    {
        name: 'test',
        path: '/test',
        component: () => import('@/pages/Test')
    },
    {
        name: 'status',
        path: '/status',
        component: () => import('@/pages/Status')
    }

]