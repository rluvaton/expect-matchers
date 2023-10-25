import * as matchers from '../matchers';


function getExpect() {
  if(global.expect !== undefined) {
    return global.expect;
  }
  
  try {
    return require('expect');
  } catch (e) {
    return undefined;
  }
}


const expect = getExpect();

if (expect !== undefined) {
  expect.extend(matchers);
} else {
  throw new Error(
    "Unable to find Jest's/Vitest's global expect (or the expect package at all). " +
      'Please check you have added expect-matchers correctly to your jest/vitest configuration.'
  );
}
