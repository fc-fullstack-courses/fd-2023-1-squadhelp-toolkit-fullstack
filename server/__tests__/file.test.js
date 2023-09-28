
function sum(num1, num2) {
  return Number(num1) + Number(num2);
}

describe('тесты для функции sum', () => {
  test(`сумма 2 + 3 должна равнятся 5`, () => {
    expect(sum(2, 3)).toBe(5);
  });

  test(`сумма '2' + '3' должна равнятся 5`, () => {
    expect(sum('2', '3')).toBe(5);
  });

  test(`сумма 'asdsadsafffda' + '3' должна равнятся 5`, () => {
    expect(sum('asdsadsafffda', '3')).toBe(NaN);
  });

  test(`сумма 0.1 + 0.2 должна равнятся 0.3`, () => {
    expect(sum(0.1, 0.2)).toBeCloseTo(0.3);
  });
});
