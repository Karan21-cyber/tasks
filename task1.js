let array = [-5, -4, -3, -2, 0, 2, 4, 6, 8];
let new_array = [];

function my_function(array, index) {
  var first_val = array[index];

  for (let i = index + 1; i < array.length; i++) {
    var sum = first_val + array[i];
    if (sum === 0) {
      new_array.push(first_val);
      new_array.push(array[i]);
      return new_array;
    }
  }
  return my_function(array, index + 1);
}

const result = my_function(array, 0);

console.log(result);
