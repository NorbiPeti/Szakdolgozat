import { AuthenticateFn, AuthenticationBindings, AuthenticationStrategy } from '@loopback/authentication';
import { AuthChecker, ExpressContext } from '@loopback/graphql';
import { Context, Getter, inject, ValueOrPromise } from '@loopback/core';
import { JWTAuthenticationStrategy } from '@loopback/authentication-jwt';
import { SzakdolgozatBindings } from './bindings';
import { repository } from '@loopback/repository';
import { RevTokenRepository } from './repositories';

export class SzakdolgozatAuthChecker {
    constructor() {
        console.log('New auth checker');
    }

    static value(@inject(AuthenticationBindings.AUTH_ACTION) authenticate: AuthenticateFn,
                 @inject.getter(AuthenticationBindings.STRATEGY)
                     getStrategies: Getter<AuthenticationStrategy | AuthenticationStrategy[] | undefined>,
                 @inject.context() context: Context,
                 @repository('RevTokenRepository') revTokenRepo: RevTokenRepository): ValueOrPromise<AuthChecker> {
        return async (resolverData, roles) => {
            const econtext = (<ExpressContext> resolverData.context);
            const res = await authenticate(econtext.req);
            const strat = <JWTAuthenticationStrategy> await getStrategies();
            // Itt már biztosan van érvényes token
            const token = strat.extractCredentials(econtext.req);
            const date = new Date();
            date.setMonth(date.getMonth() - 1);
            await revTokenRepo.deleteAll({created: {lt: date}});
            if ((await revTokenRepo.count({token})).count) {
                throw new Error('Session expired. Please sign in again.');
            }
            context.bind(SzakdolgozatBindings.AUTH_TOKEN).to(token);
            return true;
        };
    }
}
