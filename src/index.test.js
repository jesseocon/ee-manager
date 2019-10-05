import eeManager from '.';

test('output', () => {
  expect(eeManager('🐰')).toBe('🐰');
  expect(eeManager()).toBe('No args passed!');
});
