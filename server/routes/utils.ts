export const asyncMiddleware = fn => {
    return (req, res, next) => {
        Promise.resolve(fn(req, res, next)).catch(next);
    };
};


export const userIsAdminMiddleware = (req, res, next) => {
    if (!req.user || !req.user.admin) {
        return next(new Error('Not authorized!'));
    }

    return next();
};
