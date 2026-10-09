export const authorize = (...allowedRoles) => {

    return (req, res, next) => {

        if (!allowedRoles.includes(req.user.role)) {
            return res.status(403).json({
                success: false,
                message: 'Unauthorized to access.'
            })
        }

        return next()
    }
}