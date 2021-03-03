import * as Search from './index';

describe('Search utils', () => {
  const results: number = 123;
  const perPage: number = 20;
  const maxResults: number = 1000;

  it('Should count pages', () => {
    expect(Search.countPages(results, perPage)).toBe(7);
  });

  it('Should count results', () => {
    expect(Search.countResults(results + 1000, maxResults)).toBe(1000);
  });
});
