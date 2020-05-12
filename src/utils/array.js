/* eslint-disable camelcase */
const ArrayUtil = (() => {
  function in_groups_of(arr, n) {
    const ret = [];
    let group = [];
    const len = arr.length;

    for (let i = 0; i < len; ++i) {
      group.push(arr[i]);
      if ((i + 1) % n === 0) {
        ret.push(group);
        group = [];
      }
    }

    if (group.length) ret.push(group);

    return ret;
  }

  return { in_groups_of };
})();

export default ArrayUtil;
