import { AuthenticateFn, AuthenticationBindings, AuthenticationStrategy } from '@loopback/authentication';
import { AuthChecker, ExpressContext, ResolverData } from '@loopback/graphql';
import { Context, Getter, inject, Provider, ValueOrPromise } from '@loopback/core';
import { JWTAuthenticationStrategy } from '@loopback/authentication-jwt';
import { SzakdolgozatBindings } from './bindings';
import { AuthService } from './services';

export class SzakdolgozatAuthChecker implements Provider<AuthChecker> {
    constructor(@inject(AuthenticationBindings.AUTH_ACTION) private authenticate: AuthenticateFn,
                @inject.getter(AuthenticationBindings.STRATEGY)
                readonly getStrategies: Getter<AuthenticationStrategy | AuthenticationStrategy[] | undefined>,
                @inject(SzakdolgozatBindings.AUTH_SERVICE) private authService: AuthService,
                @inject.context() private context: Context) {
        console.log('new auth checker');
    }

    value(): ValueOrPromise<AuthChecker> {
        return this.authUser.bind(this);
    }

    async authUser(resolverData: ResolverData, roles: string[]) {
        const context = (<ExpressContext> resolverData.context);
        const res = await this.authenticate(context.req);
        const strat = <JWTAuthenticationStrategy> await this.getStrategies();
        // Itt már biztosan van érvényes token
        console.log('Context: ', this.context.name);
        this.context.bind(SzakdolgozatBindings.AUTH_TOKEN).to(strat.extractCredentials(context.req));
        console.log('This: ', this.authService);
        console.log('Res: ', (<any> res).id);
        return true;
    }
}
