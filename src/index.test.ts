import { hello } from './index';

describe('hello function', () => {
  it('should return a greeting with the provided name', () => {
    const result = hello('Test');
    expect(result).toBe('Hello, Test!');
  });
});
