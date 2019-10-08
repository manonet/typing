export default function arrayContainsAnotherArray(
  needle: string[],
  haystack: string[]
) {
  for (let i = 0; i < needle.length; i++) {
    if (haystack.indexOf(needle[i]) === -1) {
      return false;
    }
  }
  return true;
}
