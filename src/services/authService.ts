export type PortalRole = 'student' | 'admin';

export interface AuthUser {
  id: string;
  role: PortalRole;
  name: string;
  email: string;
  password: string;
}

const STORAGE_KEY = 'learnix-auth-session';

const createDefaultUser = (role: PortalRole): AuthUser => {
  const isStudent = role === 'student';

  return {
    id: `${role}_user`,
    role,
    name: isStudent ? 'Student User' : 'Admin User',
    email: isStudent ? 'student@learnix.com' : 'admin@learnix.com',
    password: isStudent ? 'student123' : 'admin123',
  };
};

const isBrowser = typeof window !== 'undefined';

export const authService = {
  login: (user: Partial<AuthUser> & { role: PortalRole }): AuthUser => {
    const profile: AuthUser = {
      id: user.id || `${user.role}_${Date.now()}`,
      role: user.role,
      name: user.name?.trim() || createDefaultUser(user.role).name,
      email: user.email?.trim() || createDefaultUser(user.role).email,
      password: user.password ?? createDefaultUser(user.role).password,
    };

    if (isBrowser) {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(profile));
    }

    return profile;
  },

  logout: () => {
    if (isBrowser) {
      window.localStorage.removeItem(STORAGE_KEY);
    }
  },

  getCurrentUser: (role?: PortalRole): AuthUser | null => {
    if (!isBrowser) {
      return role ? createDefaultUser(role) : null;
    }

    const rawUser = window.localStorage.getItem(STORAGE_KEY);

    if (!rawUser) {
      return role ? createDefaultUser(role) : null;
    }

    try {
      const parsedUser = JSON.parse(rawUser) as Partial<AuthUser>;

      if (!parsedUser || !parsedUser.role) {
        return role ? createDefaultUser(role) : null;
      }

      const safeUser: AuthUser = {
        id: parsedUser.id || `${parsedUser.role}_user`,
        role: parsedUser.role,
        name: parsedUser.name?.trim() || createDefaultUser(parsedUser.role).name,
        email: parsedUser.email?.trim() || createDefaultUser(parsedUser.role).email,
        password: parsedUser.password ?? createDefaultUser(parsedUser.role).password,
      };

      if (role && safeUser.role !== role) {
        return createDefaultUser(role);
      }

      return safeUser;
    } catch {
      return role ? createDefaultUser(role) : null;
    }
  },
};
