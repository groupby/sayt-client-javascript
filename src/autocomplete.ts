import { constructors, theon, BaseApi, BaseConstructor, Builder, BUILDER } from 'groupby-client-core';

namespace Autocomplete {
  export interface Constructor extends BaseConstructor<Request, Api, RequestBuilder> { }

  export interface Api extends BaseApi, Constructor { }

  export interface Request {
    query?: string;
    collection?: string;
    area?: string;
    language?: string;
    searchItems?: number;
    navigationItems?: number;
    fuzzy?: boolean;
  }

  export class RequestBuilder extends Builder<Request> {
    query(query: string) {
      return this.set('query', query);
    }

    collection(collection: string) {
      return this.set('collection', collection);
    }

    area(area: string) {
      return this.set('area', area);
    }

    language(language: string) {
      return this.set('language', language);
    }

    terms(terms: number) {
      return this.set('searchItems', terms);
    }

    navigations(navigations: number) {
      return this.set('navigationItems', navigations);
    }

    fuzzy() {
      return this.set('fuzzy', true);
    }
  }

  export const api = theon()
    .action('autocomplete')
    .basePath('/search')
    .useConstructor(constructors.queryConstructor((query) => ({ query })));

  api[BUILDER] = RequestBuilder;
}

export default Autocomplete;
