import { fold } from 'fp-ts/Either';
import { Either } from 'fp-ts/lib/Either';
import { default as UserTypes } from '../models/ADTs/UserType';
import AuthService from '../service/AuthService';
import UserTypeErrors from '../models/ADTs/UserTypeErrors';

const handleUserRole = async () => {

    const result: Either<UserTypeErrors, UserTypes> = await AuthService.getRole();

    const output =
        fold<UserTypeErrors, UserTypes, string>(
            (error) => {
                switch (error) {
                    case UserTypeErrors.UnknownUserType:
                        return "something"
                    default:
                        return "not logged in"
                }
            },
            (userType) => {

                switch (userType) {
                    case UserTypes.Admin:
                        return "something"
                    case UserTypes.Viewer:
                        return "viewer"
                    default:
                        return "not logged in"
                }
            }
        )(result);

    console.log(output);

};

export default handleUserRole;

