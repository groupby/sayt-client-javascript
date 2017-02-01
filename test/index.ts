import 'mocha';
import './autocomplete';
import './products';

import { expect } from 'chai';
import rootApi from '../src';

const api = rootApi.sayt;

describe('sayt api', () => {
  it('should have sayt collection', () => {
    expect(api).to.be.a('function');
  });

  it('should have autocomplete action', () => {
    expect(api.autocomplete).to.be.a('function');
    expect(api.autocomplete).to.be.a('function');
  });

  it('should have products action', () => {
    expect(api.products).to.be.a('function');
  });
});
