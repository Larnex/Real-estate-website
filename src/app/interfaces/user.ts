export interface Roles {
  admin?: boolean;
  registered: boolean;
}

export interface User {
  uid: string;
  email: string;
  roles: Roles;
  password?: string;
  photoURL?: string;
  emailVerified: boolean;
}
