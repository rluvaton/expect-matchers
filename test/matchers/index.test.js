import * as fs from 'fs';
import * as path from 'path';
import * as matchers from 'src/matchers/index';

expect.extend(matchers);

// This does not test all matchers, just couple random ones to check
// if imports work correctly.

describe('positive matcher', () => {
  test('.toIncludeSameMembers', () => {
    expect([3, 1, 2]).toIncludeSameMembers([1, 2, 3]);
  });
});

describe('negative matcher', () => {
  test('.not.toIncludeSameMembers', () => {
    expect([3, 1, 2, 4]).not.toIncludeSameMembers([1, 2, 3]);
  });
});

describe('asymmetric matchers', () => {
  describe('positive matchers', () => {
    test('.toIncludeSameMembers', () => {
      expect([3, 1, 2]).toEqual(expect.toIncludeSameMembers([1, 2, 3]));
    });
  });

  describe('negative matchers', () => {
    test('not.toIncludeSameMembers', () => {
      expect([3, 1, 2, 4]).not.toEqual(expect.toIncludeSameMembers([1, 2, 3]));
      expect([3, 1, 2, 4]).toEqual(expect.not.toIncludeSameMembers([1, 2, 3]));
    });
  });
});

describe('all matchers', () => {
  test('must be exported', () => {
    const directories = fs.readdirSync(path.join(__dirname, '../../src/matchers')).filter(n => n !== 'index.js');
    const namedMatchers = Object.keys(matchers);

    try {
      expect(namedMatchers).toHaveLength(directories.length);
    } catch (error) {
      const missing = new Set(directories.filter(dir => !namedMatchers.includes(dir)));
      console.error('Missing', missing);
      throw error;
    }
  });

  describe('must be functions', () => {
    test.each(Object.entries(matchers))('%s', (_, matcher) => {
      expect(typeof matcher).toBe('function');
    });
  });
});
