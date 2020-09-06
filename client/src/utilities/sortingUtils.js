/**
 * Utility module for handling operations around sorting large datasets
 */

const insertSorted = (element, array, comparator) => {
  const insertIndex = findInsertionPoint(element, array, comparator);
  array.splice(insertIndex, 0, element);
}

/**
 * Takes a sorted array and performs Binary Search to find the index in which the new reading data
 * should be inserted
 */
const findInsertionPoint = (element, array, comparator) => {
  let low = 0;
  let high = array.length;

  while (low < high) {
    let mid = parseInt((low + high) / 2);
    let comparison = comparator(array[mid], element);
    if (comparison === -1) {
      low = mid + 1;
    } else if (comparison === 1) {
      high = mid;
    } else {
      low = mid;
      break;
    }
  }
  return low;
}

export default {
  insertSorted
}
