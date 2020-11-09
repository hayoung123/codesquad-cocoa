function makePermutations(data, length) {
  let current = new Array(length);
  let used = new Array(length);
  let seen = {};
  let result = [];
  function permute(pos) {
    if (pos == length) {
      // Do we have a complete combination?
      if (!seen[current]) {
        // Check whether we've seen it before.
        seen[current] = true; // If not, save it.
        result.push(current.slice());
      }
      return;
    }
    for (var i = 0; i < data.length; ++i) {
      if (!used[i]) {
        // Have we used this element before?
        used[i] = true; // If not, insert it and recurse.
        current[pos] = data[i];
        permute(pos + 1);
        used[i] = false; // Reset after the recursive call.
      }
    }
  }
  permute(0);
  return result;
}

var permutations = makePermutations(["1", "2", "3", "4"], 3);
for (var i = 0; i < permutations.length; ++i) {
  console.log("[" + permutations[i].join(", ") + "]");
}
