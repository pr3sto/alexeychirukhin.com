export function getImage(src) {
  return {
    url: `${window.location.origin}/local/${src}`,
  };
}
