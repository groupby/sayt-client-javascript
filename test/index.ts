import 'mocha';
import './autocomplete';
import './products';
import './root';

import rootApi from '../src';

rootApi.interceptor((req, res, next) => next('intercept'));
