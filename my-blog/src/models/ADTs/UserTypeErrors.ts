class UserTypeErrors {

  private constructor(public readonly name: string) { }

  static readonly UnknownUserType = new UserTypeErrors("UnknownUserType");

  toString() {
    return this.name;
  }
}

type UserType =
  typeof UserTypeErrors.UnknownUserType


export default UserTypeErrors;