import SortingUtils from './sortingUtils';

describe('sortingUtilities', () => {

  describe('insertSorted function', () => {

    const comparator = (a, b) => {
      if (a < b) return -1;
      if (a > b) return 1;
      return 0;
    }

    it('should insert an element into a sorted array based on the passed in comparator ', () => {
      const array = [1, 2, 5, 10];

      SortingUtils.insertSorted(3, array, comparator);
      expect(array).toEqual([1, 2, 3, 5, 10]);

      SortingUtils.insertSorted(7, array, comparator);
      expect(array).toEqual([1, 2, 3, 5, 7, 10]);
    });

    it('should insert an element into an empty array', () => {
      const array = [];

      SortingUtils.insertSorted(3, array, comparator);
      expect(array).toEqual([3]);
    });

    it('should insert an element into an empty array if there is another element with the same value already', () => {
      const array = [0, 1, 2, 3, 4];

      SortingUtils.insertSorted(2, array, comparator);
      expect(array).toEqual([0, 1, 2, 2, 3, 4]);
    });
  });
});
