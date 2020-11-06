export default combineDuplicates = (array) => {
  if (new Set(array).size !== array.length) {
    for (let i=array.length-1; i>=0; i--){
      if (array[i] == array[i-1]) {
        array[i-1] += ' X 2'
        array.splice(i, 1);
      }
    }
  }
}
