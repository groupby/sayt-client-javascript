import { expect } from 'chai';
import { theon, Builder } from 'groupby-client-core';

export function itShouldSet<T>(requestBuilder: { new (): Builder<T> }, name: string, value: any, result: T) {
  it(`should set ${name}`, () => {
    let builder = new requestBuilder()[name](value);

    expect(builder.build()).to.eql(result);
  });
}

export function itShouldAcceptBuilder<T>(api: (...args: any[]) => theon.Request, builder: Builder<T>, result: T) {
  it('should accept builder', (done) => {
    api(builder)
      .end((err, res) => {
        expect(res.req.ctx.body).to.eql(result);
        done();
      });
  });
}

export function itShouldFailValidation(api: () => theon.Request, body: any, errorMessage: string) {
  it(`should fail with message ${errorMessage}`, (done) => {
    api()
      .send(body)
      .end((err) => {
        expect(err.message).to.eq(errorMessage);
        done();
      });
  });
}
