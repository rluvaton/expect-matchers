/* eslint-disable @typescript-eslint/no-explicit-any */

interface CustomMatchers<R> extends Record<string, any> {
  /**
   * Use `.toIncludeSameMembers` when checking if two arrays contain equal values, in any order.
   * for better error message use the optional `fnOrKey` argument to specify how to determine two items similarity (e.g. the id property)
   * @param {Array.<*>} members
   * @param fnOrKey
   */
  toIncludeSameMembers<E = unknown>(members: readonly E[], fnOrKey?: string | ((itemA: E, itemB: E) => boolean)): R;
}

declare namespace jest {
  // noinspection JSUnusedGlobalSymbols
  interface Matchers<R> {
    /**
     * Use `.toIncludeSameMembers` when checking if two arrays contain equal values, in any order.
     * for better error message use the optional `fnOrKey` argument to specify how to determine two items similarity (e.g. the id property)
     * @param {Array.<*>} members
     * @param fnOrKey
     */
    toIncludeSameMembers<E = unknown>(
      members: readonly E[],
      fnOrKey?: string | ((itemA: E, itemB: E, equals: (a: unknown, b: unknown) => boolean) => boolean),
    ): R;
  }

  // noinspection JSUnusedGlobalSymbols
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  interface Expect extends CustomMatchers<any> {}

  // noinspection JSUnusedGlobalSymbols
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  interface InverseAsymmetricMatchers extends Expect {}
}

declare module 'expect-matchers' {
  const matchers: CustomMatchers<any>;
  export = matchers;
}
