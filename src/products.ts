import { constructors, theon, BaseApi, BaseConstructor, Builder, BUILDER } from 'groupby-client-core';

namespace Products {
  export interface Constructor extends BaseConstructor<Request, Api, RequestBuilder> { }

  export interface Api extends BaseApi, Constructor { }

  export interface Request {
    query?: string;
    collection?: string;
    area?: string;
    refinements?: string;
    productItems?: number;
    productSort?: string;
  }

  export type SortOrder = 'Ascending' | 'Descending';

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

    products(products: number) {
      return this.set('productItems', products);
    }

    refineBy(field: string, valueOrLow: string | number, high?: number) {
      if (!this.has('refinements')) {
        this.set('refinements', '');
      }
      let refinement = field;
      if (typeof high !== 'undefined') {
        refinement += `:${valueOrLow}..${high}`;
      } else {
        refinement += `=${valueOrLow}`;
      }
      return this.set('refinements', `${this.get('refinements')}~${refinement}`);
    }

    sortBy(field: string, order: SortOrder = 'Ascending') {
      if (!this.has('productSort')) {
        this.set('productSort', '');
      }
      return this.set('productSort', `${this.get('productSort')}~${field}:${order === 'Ascending' ? 'A' : 'D'}`);
    }
  }

  export const api = theon()
    .action('products')
    .basePath('/products')
    .useConstructor(constructors.queryConstructor((query) => ({ query })));

  api[BUILDER] = RequestBuilder;
}

export default Products;
