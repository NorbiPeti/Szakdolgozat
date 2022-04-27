import { AuthenticateFn, AuthenticationBindings, AuthenticationStrategy } from '@loopback/authentication';
import { AuthChecker, ExpressContext } from '@loopback/graphql';
import { Context, Getter, inject, ValueOrPromise } from '@loopback/core';
import { JWTAuthenticationStrategy } from '@loopback/authentication-jwt';
import { SzakdolgozatBindings } from './bindings';

export class SzakdolgozatAuthChecker {
    constructor() {
        console.log('New auth checker');
    }

    static value(@inject(AuthenticationBindings.AUTH_ACTION) authenticate: AuthenticateFn,
                 @inject.getter(AuthenticationBindings.STRATEGY)
                     getStrategies: Getter<AuthenticationStrategy | AuthenticationStrategy[] | undefined>,
                 @inject.context() context: Context): ValueOrPromise<AuthChecker> {
        return async (resolverData, roles) => {
            const econtext = (<ExpressContext> resolverData.context);
            const res = await authenticate(econtext.req);
            const strat = <JWTAuthenticationStrategy> await getStrategies();
            // Itt már biztosan van érvényes token
            context.bind(SzakdolgozatBindings.AUTH_TOKEN).to(strat.extractCredentials(econtext.req));
            return true;
        };
    }
}
