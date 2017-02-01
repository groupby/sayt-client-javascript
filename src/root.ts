import { theon, validators } from 'groupby-client-core';

const BASE_PATH = '/api/v1/sayt';

const api = theon()
  .collection('sayt')
  .basePath(BASE_PATH)
  // tslint:disable:max-line-length
  .validator((req, res, next) => next(req.body ? undefined : new Error('request validation error: must provide body')))
  .validator(validators.bodyValidator<string>('query', (query) => !!query, 'must provide valid query'));
// tslint:enable:max-line-length

export default api;
