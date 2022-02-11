
import { createRouter, createWebHashHistory } from 'vue-router';
import { documents } from 'site-inject';


function parseName(name) {
    if (name.indexOf('_') !== -1) {
        const pairs = name.split('_');
        const component = pairs.shift();

        return {
        component,
        lang: pairs.join('-'),
        }
    }

    return {
        component: name,
        lang: '',
    }
}

function getRoutes() {
    const routes = [];
    const names = Object.keys(documents);

    routes.push({
        name: 'notFound',
        path: '/:path(.*)+',
        redirect: {
            name: 'home',
        },
    });

    function addHomeRoute(Home, lang) {
        routes.push({
            name: lang || 'home',
            path: `/`,
            component: Home,
            meta: { lang },
        });
    }

    names.forEach((name) => {
        const { component, lang } = parseName(name);

        if (component === 'home') {
            addHomeRoute(documents[name], lang);
        }

        routes.push({
            name: `${component}`,
            path: `/${component}`,
            component: documents[name],
            meta: {
                name: component,
            },
        });
    });

    return routes;
}

export const router = createRouter({
	history: createWebHashHistory(),
	routes: getRoutes(),
	scrollBehavior(to) {
		if (to.hash) {
		return { el: to.hash };
		}

		return { top: 0 };
	},
});

// router.afterEach(() => {
//   nextTick(syncPathToChild);
// });

// if (config.site.simulator?.syncPathFromSimulator !== false) {
//   listenToSyncPath(router);
// }