import { BindingKey } from '@loopback/core';

export namespace SzakdolgozatBindings {
    export const AUTH_TOKEN = BindingKey.create<string>('szakdolgozat.auth_token');
}
