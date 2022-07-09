const debug = require("../debugLogger");

function polyfill(namespace, implementation) {
  const path = namespace.split(".");

  // start of _.get
  let pointer = global;

  // go almost as down as possible
  while (path.length > 1) {
    pointer = pointer[path.shift()];
  }

  // then we have proper reference even to simple object
  const end = path.pop();
  const test = pointer[end];

  if (typeof test === "undefined") {
    debug(`❤️  ${namespace}`);

    const result = implementation();

    if (typeof result !== "undefined") {
      pointer[end] = result;
    }
  }
}

module.exports = polyfill;
