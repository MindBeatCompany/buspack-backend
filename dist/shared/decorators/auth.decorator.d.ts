import { Role } from 'nest-access-control';
declare const Auth: (...roles: Role[]) => <TFunction extends Function, Y>(target: object | TFunction, propertyKey?: string | symbol, descriptor?: TypedPropertyDescriptor<Y>) => void;
export default Auth;
