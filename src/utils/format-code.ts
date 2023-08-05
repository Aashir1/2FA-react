export function formatCode(code: string | number) {
  code = typeof code === "string" ? code : code.toString();
  if (code.length % 2 === 0) {
    return `${code.slice(0, code.length / 2)} ${code.slice(code.length / 2)}`;
  }
}
