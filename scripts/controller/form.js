import {Complex} from "../model/complex.js";

export function setInputFields(aRe, aIm, bRe, bIm) {
  document.getElementById('aRe').value = aRe.toFixed(2);
  document.getElementById('aIm').value = aIm.toFixed(2);
  document.getElementById('bRe').value = bRe.toFixed(2);
  document.getElementById('bIm').value = bIm.toFixed(2);
}


export function getStateVectorFromInput() {
  let aRe = parseFloat(document.getElementById('aRe').value);
  let aIm = parseFloat(document.getElementById('aIm').value);
  let bRe = parseFloat(document.getElementById('bRe').value);
  let bIm = parseFloat(document.getElementById('bIm').value);

  return [new Complex(aRe, aIm), new Complex(bRe, bIm)];
}