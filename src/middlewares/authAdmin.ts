import { ForbiddenError } from '../customError'

export default (req: any, res: any, next: any) => {
    if (req.user && req.user.role.name === 'admin') next()
    else next(new ForbiddenError('You don\'t have enough permissions to this!'))
}
