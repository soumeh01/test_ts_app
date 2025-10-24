import { greet } from '../index';

describe('greet function', () => {
  it('should return default greeting when no options provided', () => {
    const result = greet();
    expect(result).toBe('Hello, World!');
  });

  it('should use provided name', () => {
    const result = greet({ name: 'Alice' });
    expect(result).toBe('Hello, Alice!');
  });

  it('should handle excited: false', () => {
    const result = greet({ name: 'Bob', excited: false });
    expect(result).toBe('Hello, Bob.');
  });

  it('should handle excited: true', () => {
    const result = greet({ name: 'Charlie', excited: true });
    expect(result).toBe('Hello, Charlie!');
  });

  it('should handle empty string name', () => {
    const result = greet({ name: '' });
    expect(result).toBe('Hello, !');
  });
});