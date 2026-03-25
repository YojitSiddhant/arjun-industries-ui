export function withAssetVersion(src: string | undefined, version: string) {
  if (!src) {
    return "";
  }

  const separator = src.includes("?") ? "&" : "?";
  return `${src}${separator}v=${encodeURIComponent(version)}`;
}
