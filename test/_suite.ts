import { test, theon } from 'groupby-client-core';
import { Api } from '../src';

export function middleware(rootApi: { sayt: Api } & theon.Request, action: string) {
  afterEach(() => rootApi.getStore().map = {});

  it('should set url from customerId', (done) => {
    rootApi.getStore().map = { customerId: 'myCustomerId' };

    test.expectRootUrl(rootApi.sayt[action], 'https://mycustomerid.groupbycloud.com')
      .then(() => done());
  });
}

export function validation(api: () => theon.Request) {
  test.itShouldFailValidation(api, undefined, 'request validation error: must provide body');

  test.itShouldFailValidation(api, {}, 'body validation error: must provide query');

  test.itShouldPassValidation(api, { query: 'appl'});
}
