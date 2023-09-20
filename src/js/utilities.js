export const ucFirst = (word) => word.charAt(0).toUpperCase() + word.slice(1);

export function encodeHTMLEntities(text) {
  let textArea = document.createElement('textarea');
  textArea.innerText = text;
  let encodedOutput = textArea.innerHTML;
  let arr = encodedOutput.split('<br>');
  encodedOutput = arr.join('\n');
  return encodedOutput;
}
