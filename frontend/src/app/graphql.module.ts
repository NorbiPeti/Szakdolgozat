import { Injector, NgModule } from '@angular/core';
import { APOLLO_OPTIONS } from 'apollo-angular';
import { ApolloClientOptions, ApolloLink, InMemoryCache } from '@apollo/client/core';
import { HttpLink } from 'apollo-angular/http';
import { environment } from '../environments/environment';
import { setContext } from '@apollo/client/link/context';
import { onError } from '@apollo/client/link/error';
import { Router } from '@angular/router';
import { LoginService } from './auth/login.service';

const uri = environment.backendUrl + '/graphql'; // <-- add the URL of the GraphQL server here
export function createApollo(httpLink: HttpLink, routerService: Router, injector: Injector): ApolloClientOptions<any> {
  const auth = setContext((operation, context) => {
    const token = injector.get(LoginService).token;

    if (token === null) {
      return {};
    } else {
      return {
        headers: {
          Authorization: `Bearer ${token}`
        }
      };
    }
  });

  const errorLink = onError(({graphQLErrors, networkError}) => {
    if (graphQLErrors) {
      graphQLErrors.map((graphqlError) => {
        console.log(graphqlError);
        if (graphqlError.message.startsWith('Error verifying token')) {
          injector.get(LoginService).deleteToken();
          routerService.navigateByUrl('/');
        } else {
          alert(graphqlError.message);
        }
      });
    }

    if (networkError) {
      const errorMessage = networkError.message;
      console.log(errorMessage);
      alert(errorMessage);
    }
  });

  return {
    link: ApolloLink.from([auth, errorLink, httpLink.create({uri})]),
    cache: new InMemoryCache(),
  };
}

@NgModule({
  providers: [
    {
      provide: APOLLO_OPTIONS,
      useFactory: createApollo,
      deps: [HttpLink, Router, Injector],
    },
  ],
})
export class GraphQLModule {
}
