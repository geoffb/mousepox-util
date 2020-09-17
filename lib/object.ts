/** Create a deep copy of an object */
// eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/explicit-module-boundary-types, @typescript-eslint/ban-types
export function copy(src: any): object {
  if (typeof src === "object" && src != null) {
    if (Array.isArray(src)) {
      const a = [];
      for (const item of src) {
        a.push(copy(item));
      }
      return a;
    } else {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const obj: any = {};
      for (const key in src) {
        obj[key] = copy(src[key]);
      }
      return obj;
    }
  } else {
    return src;
  }
}
