import * as Time from './index';

const defaultDate: Date = new Date('12/12/2020 21:12');

describe('convertTimeStampToDateTime()', () => {
  it('Should convert timestamp to date', () => {
    const date: Date = Time.convertTimeStampToDateTime(123123123);
    expect(date instanceof Date).toBeTruthy();
  });
});

describe('getDay()', () => {
  it('Should convert day from date to string', () => {
    const day: string = Time.getDay(defaultDate);
    expect(typeof day).toBe('string');
  });

  it('Should return valid value', () => {
    expect(Time.getDay(defaultDate)).toBe('12');
  });
});

describe('getMonth()', () => {
  it('Should convert month from date to string', () => {
    const month: string = Time.getMonth(defaultDate);
    expect(typeof month).toBe('string');
  });

  it('Should return valid value', () => {
    expect(Time.getMonth(defaultDate)).toBe('12');
  });
});

describe('getYear()', () => {
  it('Should convert day from date to string', () => {
    const year: string = Time.getYear(defaultDate);
    expect(typeof year).toBe('string');
  });

  it('Should return valid value', () => {
    expect(Time.getYear(defaultDate)).toBe('2020');
  });
});

describe('getHour()', () => {
  it('Should convert hour from date to string', () => {
    const hour: string = Time.getHour(defaultDate);
    expect(typeof hour).toBe('string');
  });

  it('Should return valid value', () => {
    expect(Time.getHour(defaultDate)).toBe('21');
  });
});

describe('getMinutes()', () => {
  it('Should convert minutes from date to string', () => {
    const minutes: string = Time.getHour(defaultDate);
    expect(typeof minutes).toBe('string');
  });

  it('Should return valid value', () => {
    expect(Time.getMinutes(defaultDate)).toBe('12');
  });
});
