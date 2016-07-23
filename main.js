var CasingUtil = {
  ready: fn => document.readyState != 'loading' ? fn() : document.addEventListener('DOMContentLoaded', fn),
  convertToArray: str => str.replace(/[A-Z]/g, ' $&').trim().split(/[^A-Za-z]+/),
  arrayToCamel: arr => arr.join(' ').toLowerCase().replace(/ (.)/g, (_, c) => c.toUpperCase()),
  arrayToTitle: arr => arr.map(word => word[0].toUpperCase() + word.slice(1).toLowerCase()).join(''),
  arrayToKebob: arr => arr.join('-').toLowerCase(),
  arrayToSnake: arr => arr.join('_').toLowerCase(),
  arrayToConstant: arr => arr.join('_').toUpperCase(),
  pWithText: text => {var p = document.createElement('p'); p.textContent = text; return p;}
};

CasingUtil.ready(function() {
  var $input    = document.getElementById('input');
  var $generate = document.getElementById('generate');
  var $output   = document.getElementById('output');

  $generate.addEventListener('click', generate);
  $input.addEventListener('keydown', () => $input.value && window.setTimeout(generate, 0));
  $input.focus();

  function generate() {
    var arr = CasingUtil.convertToArray($input.value);
    $output.innerHTML = '';
    $output.appendChild(CasingUtil.pWithText(CasingUtil.arrayToCamel(arr)));
    $output.appendChild(CasingUtil.pWithText(CasingUtil.arrayToTitle(arr)));
    $output.appendChild(CasingUtil.pWithText(CasingUtil.arrayToKebob(arr)));
    $output.appendChild(CasingUtil.pWithText(CasingUtil.arrayToSnake(arr)));
    $output.appendChild(CasingUtil.pWithText(CasingUtil.arrayToConstant(arr)));
  }
});
