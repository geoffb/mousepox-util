/** Create a deep copy of an object */
export function copy(src: any): object {
  if (typeof src === "object" && src != null) {
    if (Array.isArray(src)) {
      const a = [];
      for (const item of src) {
        a.push(copy(item));
      }
      return a;
    } else {
      const obj: any = {};
      for (const key in src) {
        if (src.hasOwnProperty(key)) {
          obj[key] = copy(src[key]);
        }
      }
      return obj;
    }
  } else {
    return src;
  }
}
