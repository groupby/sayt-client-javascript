import { expect } from 'chai';
import rootApi from '../src';
import Products from '../src/products';
import { middleware, validation } from './_suite';
import { itShouldAcceptBuilder, itShouldSet } from './utils';

const api = rootApi.sayt.products;

describe('sayt products action', () => {
  it('should accept a query', (done) => {
    api('red rubb')
      .end((err, res) => {
        expect(res.req.ctx.body).to.eql({ query: 'red rubb' });
        done();
      });
  });

  it('should accept a query object', (done) => {
    const query = {
      navigationName: 'color',
      originalQuery: { a: 'b' }
    };
    api(query)
      .end((err, res) => {
        expect(res.req.ctx.body).to.eq(query);
        done();
      });
  });

  it('should have a builder', () => {
    expect(api.Builder).to.be.ok;
    expect(api.Builder).to.eq(Products.RequestBuilder);
  });

  itShouldAcceptBuilder(api, new api.Builder()
    .products(13)
    .sortBy('size'),
    {
      productItems: 13,
      productSort: '~size:A'
    });

  describe('builder', () => {
    describe('query()', () => {
      itShouldSet(api.Builder, 'query', 'rubber ba', { query: 'rubber ba' });
    });

    describe('collection()', () => {
      itShouldSet(api.Builder, 'collection', 'mycollection', { collection: 'mycollection' });
    });

    describe('area()', () => {
      itShouldSet(api.Builder, 'area', 'MyArea', { area: 'MyArea' });
    });

    describe('products()', () => {
      it('should set productItems', () => {
        const builder = new api.Builder().products(10);

        expect(builder.build()).to.eql({ productItems: 10 });
      });
    });

    describe('refineBy()', () => {
      it('should add value refinement', () => {
        const builder = new api.Builder().refineBy('colour', 'blue');

        expect(builder.build()).to.eql({ refinements: '~colour=blue' });
      });

      it('should add range refinement', () => {
        const builder = new api.Builder().refineBy('price', 20, 30);

        expect(builder.build()).to.eql({ refinements: '~price:20..30' });
      });

      it('should concatenate refinements', () => {
        const builder = new api.Builder()
          .refineBy('colour', 'blue')
          .refineBy('price', 20, 30);

        expect(builder.build()).to.eql({ refinements: '~colour=blue~price:20..30' });
      });
    });

    describe('sortBy()', () => {
      it('should add sort', () => {
        const builder = new api.Builder()
          .sortBy('price');

        expect(builder.build()).to.eql({ productSort: '~price:A' });
      });

      it('should add descending sort', () => {
        const builder = new api.Builder()
          .sortBy('price', 'Descending');

        expect(builder.build()).to.eql({ productSort: '~price:D' });
      });

      it('should concatenate sorts', () => {
        const builder = new api.Builder()
          .sortBy('price')
          .sortBy('popularity', 'Descending');

        expect(builder.build()).to.eql({ productSort: '~price:A~popularity:D' });
      });
    });
  });

  describe('middleware', () => {
    middleware(rootApi, 'products');
  });

  describe('validation', () => {
    validation(api);
  });
});
