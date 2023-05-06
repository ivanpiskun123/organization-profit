import React, {lazy} from "react";
import AdminLayout from "./layouts/AdminLayout";
import {Redirect} from "react-router-dom";
import {BASE_URL} from "./config/constant";

export const privateRoutes = [
    {
        path: '*',
        layout: AdminLayout,
        routes: [

            {
                exact: true,
                path: '/app/dashboard/default',
                component: lazy(() => import('./views/dashboard/DashDefault'))
            },
            {
                exact: true,
                path: '/basic/button',
                component: lazy(() => import('./views/ui-elements/basic/BasicButton'))
            },
            {
                exact: true,
                path: '/basic/badges',
                component: lazy(() => import('./views/ui-elements/basic/BasicBadges'))
            },
            {
                exact: true,
                path: '/basic/breadcrumb',
                component: lazy(() => import('./views/ui-elements/basic/BasicBreadcrumb'))
            },
            {
                exact: true,
                path: '/basic/pagination',
                component: lazy(() => import('./views/ui-elements/basic/BasicPagination'))
            },
            {
                exact: true,
                path: '/basic/collapse',
                component: lazy(() => import('./views/ui-elements/basic/BasicCollapse'))
            },
            {
                exact: true,
                path: '/basic/tabs-pills',
                component: lazy(() => import('./views/ui-elements/basic/BasicTabsPills'))
            },
            {
                exact: true,
                path: '/basic/typography',
                component: lazy(() => import('./views/ui-elements/basic/BasicTypography'))
            },
            {
                exact: true,
                path: '/forms/form-basic',
                component: lazy(() => import('./views/forms/FormsElements'))
            },
            {
                exact: true,
                path: '/tables/bootstrap',
                component: lazy(() => import('./views/tables/BootstrapTable'))
            },
            {
                exact: true,
                path: '/charts/execute',
                component: lazy(() => import('./views/charts/nvd3-chart/executeView'))
            },
            {
                exact: true,
                path: '/charts/index',
                component: lazy(() => import('./views/charts/nvd3-chart/indexView'))
            },
            {
                exact: true,
                path: '/charts/season',
                component: lazy(() => import('./views/charts/nvd3-chart/seasonView'))
            },
            {
                exact: true,
                path: '/charts/trade_forms',
                component: lazy(() => import('./views/charts/nvd3-chart/tradeFormsView'))
            },
            {
                exact: true,
                path: '/charts/payment_forms',
                component: lazy(() => import('./views/charts/nvd3-chart/paymentFormsView'))
            },
            {
                exact: true,
                path: '/charts/groups',
                component: lazy(() => import('./views/charts/nvd3-chart/groupsView'))
            },
            {
                exact: true,
                path: '/charts/consumables',
                component: lazy(() => import('./views/charts/nvd3-chart/consumablesView'))
            },
            {
                exact: true,
                path: '/charts/xyz',
                component: lazy(() => import('./views/charts/nvd3-chart/xyzView'))
            },
            {
                exact: true,
                path: '/charts/present',
                component: lazy(() => import('./views/charts/nvd3-chart/presentView'))
            },
            {
                path: '*',
                exact: true,
                component: () => <Redirect to='/charts/present' />
            }
        ]
    }
];

export const publicRoutes = [
    {
        exact: true,
        path: '/auth/signin-1',
        component: lazy(() => import('./views/auth/signin/SignIn1'))
    }
]

