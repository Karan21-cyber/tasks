var array = [1, 2, 3, 4, 5, 6, 7, 8, 9];
var new_array = [];

function my_function(array, new_array, index) {
  let length = array.length;
  if (length === index) {
    return new_array;
  }
  else {
    if (array[index] % 2 !== 0) {
      new_array.push(array[index]);
    }
    return my_function(array, new_array, index + 1);
  }
}

var result = my_function(array, new_array, 0);

console.log(result);
