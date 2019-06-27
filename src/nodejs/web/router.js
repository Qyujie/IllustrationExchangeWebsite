function route(handle, pathname, app) {
    if (typeof handle[pathname] === 'function') {
        return handle[pathname](app);
    } else {
        return pathname + ' is not defined';
    }
}

exports.route = route;