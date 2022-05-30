import { useSession } from 'next-auth/react';
import { ReactNode } from 'react';


export const withSession = (WrappedComponent: ReactNode, session: any) => {
    return session ? WrappedComponent : null;
}