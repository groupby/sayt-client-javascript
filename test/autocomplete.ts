import { expect } from 'chai';
import rootApi from '../src';
import Autocomplete from '../src/autocomplete';
import { middleware, validation } from './_suite';
import { itShouldAcceptBuilder, itShouldSet } from './utils';

const api = rootApi.sayt.autocomplete;

describe('sayt autocomplete action', () => {
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
    expect(api.Builder).to.eq(Autocomplete.RequestBuilder);
  });

  itShouldAcceptBuilder(api, new api.Builder()
    .area('MyArea')
    .terms(3),
    {
      area: 'MyArea',
      searchItems: 3
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

    describe('language()', () => {
      itShouldSet(api.Builder, 'language', 'lang_en', { language: 'lang_en' });
    });

    describe('terms()', () => {
      itShouldSet(api.Builder, 'terms', 7, { searchItems: 7 });
    });

    describe('navigations()', () => {
      itShouldSet(api.Builder, 'navigations', 9, { navigationItems: 9 });
    });

    describe('fuzzy()', () => {
      itShouldSet(api.Builder, 'fuzzy', undefined, { fuzzy: true });
    });
  });

  describe('middleware', () => {
    middleware(rootApi, 'autocomplete');
  });

  describe('validation', () => {
    validation(api);
  });
});
