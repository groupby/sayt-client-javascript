import { renderAll, theon, BaseApi } from 'groupby-client-core';
import Autocomplete from './autocomplete';
import Products from './products';
import client from './root';

client.action(Autocomplete.api);
client.action(Products.api);

export default renderAll<{ sayt: Api }>(client);

export { client };

export interface Constructor {
  (): Api & theon.Request;
}

export interface Api extends BaseApi, Constructor {
  autocomplete: Autocomplete.Api;
  products: Products.Api;
}
