import {initTRPC, TRPCError} from "@trpc/server";
import {ExpressContext} from "@/server";
import {PayloadRequest} from "payload/types";
import {User} from "@/payload-types";

const t = initTRPC.context<ExpressContext>().create();
const middleware = t.middleware;
const isAuth = middleware(async ({ctx, next}) => {
    const req = ctx.req as PayloadRequest;

    const {user} = req as {user: User};

    if (!user || !user.id) {
        throw new TRPCError({code: 'UNAUTHORIZED'})
    }

    return next({
        ctx: {
            user,
        }
    })
})

export const router = t.router;
export const publicProcedure = t.procedure;
export const privateProcedure = t.procedure.use(isAuth);
