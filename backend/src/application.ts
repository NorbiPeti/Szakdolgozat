import { BootMixin } from '@loopback/boot';
import { Application, ApplicationConfig } from '@loopback/core';
import { RepositoryMixin } from '@loopback/repository';
import { ServiceMixin } from '@loopback/service-proxy';
import { AuthenticationComponent } from '@loopback/authentication';
import { JWTAuthenticationComponent, UserServiceBindings } from '@loopback/authentication-jwt';
import { SzakdolgozatUserService } from './services';
import { GraphQLServer } from '@loopback/graphql';

export { ApplicationConfig };

export class SzakdolgozatBackendApplication extends BootMixin(
    ServiceMixin(RepositoryMixin(Application)),
) {
    gqlServer: GraphQLServer;

    constructor(options: ApplicationConfig = {}) {
        super(options);

        const server = this.server(GraphQLServer);
        this.configure(server.key).to({host: process.env.HOST, port: process.env.PORT});
        this.getServer(GraphQLServer).then(s => this.gqlServer = s);

        // Authentication
        this.component(AuthenticationComponent);
        this.component(JWTAuthenticationComponent);
        this.service(SzakdolgozatUserService, UserServiceBindings.USER_SERVICE);

        this.projectRoot = __dirname;
    }
}
