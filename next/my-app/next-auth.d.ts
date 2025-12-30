import { DefaultSession } from 'next-auth';
import type { JWT } from 'next-auth/jwt';

export type X = JWT;

// biome-ignore lint/complexity/noUselessLoneBlockStatements: <explanation>
declare module 'next-auth' {
  interface Session {
    user: {
      isadmin?: boolean;
    } & DefaultSession['user'];
  }

  interface User {
    passwd?: string;
    isadmin?: boolean;
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    isadmin?: boolean;
  }
}
