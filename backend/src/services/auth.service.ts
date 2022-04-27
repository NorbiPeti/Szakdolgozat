import { AuthenticateFn, AuthenticationBindings, AuthenticationStrategy } from '@loopback/authentication';
import { ExpressContext, ResolverData } from '@loopback/graphql';
import { Getter, inject } from '@loopback/core';
import { JWTAuthenticationStrategy } from '@loopback/authentication-jwt';

export class AuthService {
    receivedToken: string;

    constructor(@inject(AuthenticationBindings.AUTH_ACTION) private authenticate: AuthenticateFn,
                @inject.getter(AuthenticationBindings.STRATEGY)
                readonly getStrategies: Getter<AuthenticationStrategy | AuthenticationStrategy[] | undefined>) {
        console.log('Created auth service', new Error().stack);
    }

    async authUser(resolverData: ResolverData, roles: string[]) {
        const context = (<ExpressContext> resolverData.context);
        const res = await this.authenticate(context.req);
        const strat = <JWTAuthenticationStrategy> await this.getStrategies();
        // Itt már biztosan van érvényes token
        console.log('This: ', this);
        this.receivedToken = strat.extractCredentials(context.req);
        console.log('This: ', this);
        console.log('Strat: ', strat);
        console.log('Creds: ', strat.extractCredentials(context.req));
        console.log('Res: ', (<any> res).id);
        return true;
    }
}
