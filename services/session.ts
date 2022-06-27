import { getSession } from "next-auth/react";
import { NextPageContext } from 'next';


export function withServerSession(cb?: () => Promise<any>) {
    return async (ctx: NextPageContext) => withSession(ctx, cb ? cb() : { props: {} })
}

export const withSession = async (ctx: NextPageContext, props: any = {}) => {
    const session = await getSession(ctx);
    if (session) return props
    else return ({
        redirect: {
            destination: '/api/auth/signin',
            permanent: false,
        },
    })
}
