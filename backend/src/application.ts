import { BootMixin } from '@loopback/boot';
import { Application, ApplicationConfig } from '@loopback/core';
import { RepositoryMixin } from '@loopback/repository';
import { ServiceMixin } from '@loopback/service-proxy';
import { AuthenticationBindings, AuthenticationComponent } from '@loopback/authentication';
import {
    JWTAuthenticationComponent,
    JWTAuthenticationStrategy,
    TokenServiceBindings,
    UserServiceBindings
} from '@loopback/authentication-jwt';
import { SzakdolgozatUserService } from './services';
import { GraphQLBindings, GraphQLServer, GraphQLServerOptions } from '@loopback/graphql';
import { UserResolver } from './graphql-resolvers/user.resolver';
import { SzakdolgozatAuthChecker } from './szakdolgozat-auth-checker';
import { CourseResolver } from './graphql-resolvers/course.resolver';
import { SubjectResolver } from './graphql-resolvers/subject.resolver';
import { FulfillmentModeResolver } from './graphql-resolvers/fulfillment-mode.resolver';
import { RequirementResolver } from './graphql-resolvers/requirement.resolver';

export { ApplicationConfig };

export class SzakdolgozatBackendApplication extends BootMixin(
    ServiceMixin(RepositoryMixin(Application)),
) {
    gqlServer: GraphQLServer;

    constructor(options: ApplicationConfig = {}) {
        super(options);

        const server = this.server(GraphQLServer);
        this.configure(server.key).to(<GraphQLServerOptions> {
            host: process.env.HOST ?? '0.0.0.0',
            port: process.env.PORT ?? 3000
        });
        this.getServer(GraphQLServer).then(s => {
            this.gqlServer = s;
            s.resolver(UserResolver);
            s.resolver(CourseResolver);
            s.resolver(SubjectResolver);
            s.resolver(FulfillmentModeResolver);
            s.resolver(RequirementResolver);
        });

        // Authentication
        this.component(AuthenticationComponent);
        this.component(JWTAuthenticationComponent);
        this.get(TokenServiceBindings.TOKEN_SERVICE).then(tokenService => {
            this.bind(AuthenticationBindings.STRATEGY).to(new JWTAuthenticationStrategy(tokenService));
        });
        this.bind(GraphQLBindings.GRAPHQL_AUTH_CHECKER).toDynamicValue(SzakdolgozatAuthChecker);

        this.service(SzakdolgozatUserService, UserServiceBindings.USER_SERVICE);

        this.projectRoot = __dirname;
        this.bootOptions = {
            graphqlResolvers: {
                dirs: ['graphql-resolvers'],
                extensions: ['js'],
                nested: true
            }
        };
    }
}
