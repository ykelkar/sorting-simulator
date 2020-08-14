export function quickSort(array, left, right) {
    const animations = [];
    const auxiliaryArray = array.slice();
    
    quickSortHelper(array, left, right, auxiliaryArray, animations);
    console.log(array);
    return array;
}

function quickSortHelper(array, left, right, auxiliaryArray, animations) {
    if (left < right) {
        let pivot = partition(array, left, right, auxiliaryArray, animations);
        quickSortHelper(array, left, pivot - 1, auxiliaryArray, animations);
        quickSortHelper(array, pivot + 1, right, auxiliaryArray, animations);
    }
}

function partition(array, start, end, auxiliaryArray, animations) {
    let pivot = array[start];
    let pivotIdx = start;
    for (let index = start; index <= end; index++) {
        animations.push([index, pivotIdx]);
        animations.push([index, pivotIdx]);
        if (pivot > array[index]) {
            animations.push([index, auxiliaryArray[pivotIdx++]]);
            swap(array, pivotIdx, index);
        }
    }
    swap(array, start, pivotIdx);
    return pivotIdx;
}

function swap (arr, i, j) {
    let temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
}