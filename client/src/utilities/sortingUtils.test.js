import SortingUtils from './sortingUtils';

describe('sortingUtilities', () => {

  describe('insertSorted function', () => {

    it('should insert an elements into a sorted array based on the passed in comparator ', () => {
      const array = [1, 2, 5, 10];
      const comparator = (a, b) => {
        if (a < b) return -1;
        if (a > b) return 1;
        return 0;
      }

      SortingUtils.insertSorted(3, array, comparator);
      expect(array).toEqual([1, 2, 3, 5, 10]);

      SortingUtils.insertSorted(7, array, comparator);
      expect(array).toEqual([1, 2, 3, 5, 7, 10]);
    });
  });
});
