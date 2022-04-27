import { BindingKey } from '@loopback/core';
import { AuthService } from './services';

export namespace SzakdolgozatBindings {
    export const AUTH_SERVICE = BindingKey.create<AuthService>('szakdolgozat.auth');
    //export const AUTH_TOKEN = BindingKey.create<string>('szakdolgozat.auth.token');
}
