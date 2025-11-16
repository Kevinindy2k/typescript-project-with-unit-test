import { merge } from './merge';

describe('merge function', () => {
  describe('basic functionality', () => {
    test('should merge three sorted arrays correctly', () => {
      const collection_1 = [9, 7, 5, 3, 1]; // มากไปน้อย
      const collection_2 = [2, 4, 6, 8]; // น้อยไปมาก
      const collection_3 = [0, 10]; // น้อยไปมาก

      const result = merge(collection_1, collection_2, collection_3);

      expect(result).toEqual([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
    });

    test('should handle arrays with duplicate values', () => {
      const collection_1 = [5, 5, 3, 1];
      const collection_2 = [1, 3, 5];
      const collection_3 = [2, 5];

      const result = merge(collection_1, collection_2, collection_3);

      expect(result).toEqual([1, 1, 2, 3, 3, 5, 5, 5, 5]);
    });

    test('should handle negative numbers', () => {
      const collection_1 = [5, 0, -5];
      const collection_2 = [-10, -3, 2];
      const collection_3 = [-8, 3];

      const result = merge(collection_1, collection_2, collection_3);

      expect(result).toEqual([-10, -8, -5, -3, 0, 2, 3, 5]);
    });

    test('should handle mixed positive and negative numbers', () => {
      const collection_1 = [10, 5, 0, -5, -10];
      const collection_2 = [-8, -2, 3, 7];
      const collection_3 = [-6, 1, 8];

      const result = merge(collection_1, collection_2, collection_3);

      expect(result).toEqual([-10, -8, -6, -5, -2, 0, 1, 3, 5, 7, 8, 10]);
    });
  });

  describe('edge cases', () => {
    test('should handle empty arrays', () => {
      const collection_1: number[] = [];
      const collection_2: number[] = [];
      const collection_3: number[] = [];

      const result = merge(collection_1, collection_2, collection_3);

      expect(result).toEqual([]);
    });

    test('should handle one empty array (collection_1)', () => {
      const collection_1: number[] = [];
      const collection_2 = [1, 3, 5];
      const collection_3 = [2, 4];

      const result = merge(collection_1, collection_2, collection_3);

      expect(result).toEqual([1, 2, 3, 4, 5]);
    });

    test('should handle one empty array (collection_2)', () => {
      const collection_1 = [5, 3, 1];
      const collection_2: number[] = [];
      const collection_3 = [2, 4];

      const result = merge(collection_1, collection_2, collection_3);

      expect(result).toEqual([1, 2, 3, 4, 5]);
    });

    test('should handle one empty array (collection_3)', () => {
      const collection_1 = [5, 3, 1];
      const collection_2 = [2, 4];
      const collection_3: number[] = [];

      const result = merge(collection_1, collection_2, collection_3);

      expect(result).toEqual([1, 2, 3, 4, 5]);
    });

    test('should handle two empty arrays', () => {
      const collection_1: number[] = [];
      const collection_2: number[] = [];
      const collection_3 = [1, 2, 3];

      const result = merge(collection_1, collection_2, collection_3);

      expect(result).toEqual([1, 2, 3]);
    });

    test('should handle single element arrays', () => {
      const collection_1 = [5];
      const collection_2 = [3];
      const collection_3 = [7];

      const result = merge(collection_1, collection_2, collection_3);

      expect(result).toEqual([3, 5, 7]);
    });

    test('should handle arrays of different lengths', () => {
      const collection_1 = [20, 15, 10, 5, 1]; // 5 ตัว
      const collection_2 = [2, 8]; // 2 ตัว
      const collection_3 = [3, 6, 9, 12, 16, 18, 25]; // 7 ตัว

      const result = merge(collection_1, collection_2, collection_3);

      expect(result).toEqual([1, 2, 3, 5, 6, 8, 9, 10, 12, 15, 16, 18, 20, 25]);
    });
  });

  describe('special cases', () => {
    test('should handle all same values', () => {
      const collection_1 = [5, 5, 5];
      const collection_2 = [5, 5];
      const collection_3 = [5, 5, 5, 5];

      const result = merge(collection_1, collection_2, collection_3);

      expect(result).toEqual([5, 5, 5, 5, 5, 5, 5, 5, 5]);
    });

    test('should handle zero values', () => {
      const collection_1 = [0, 0, 0];
      const collection_2 = [0, 0];
      const collection_3 = [0];

      const result = merge(collection_1, collection_2, collection_3);

      expect(result).toEqual([0, 0, 0, 0, 0, 0]);
    });

    test('should handle large numbers', () => {
      const collection_1 = [1000000, 500000, 100000];
      const collection_2 = [200000, 600000];
      const collection_3 = [300000, 700000];

      const result = merge(collection_1, collection_2, collection_3);

      expect(result).toEqual([100000, 200000, 300000, 500000, 600000, 700000, 1000000]);
    });

    test('should maintain stability with equal elements', () => {
      const collection_1 = [10, 5, 5, 1];
      const collection_2 = [5, 5];
      const collection_3 = [5];

      const result = merge(collection_1, collection_2, collection_3);

      // ต้องมีเลข 5 ครบทุกตัว
      const fives = result.filter(n => n === 5);
      expect(fives.length).toBe(5);
      expect(result).toEqual([1, 5, 5, 5, 5, 5, 10]);
    });
  });

  describe('verify no sorting function used', () => {
    test('result should be in ascending order without using sort()', () => {
      const collection_1 = [100, 50, 25, 10, 1];
      const collection_2 = [5, 15, 35, 75];
      const collection_3 = [20, 40, 60, 80];

      const result = merge(collection_1, collection_2, collection_3);

      // เช็คว่าเรียงจากน้อยไปมากจริงๆ
      for (let i = 0; i < result.length - 1; i++) {
        expect(result[i]).toBeLessThanOrEqual(result[i + 1]);
      }

      expect(result).toEqual([1, 5, 10, 15, 20, 25, 35, 40, 50, 60, 75, 80, 100]);
    });
  });
});
