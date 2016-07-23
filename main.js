var CasingUtil = {
  ready: fn => document.readyState != 'loading' ? fn() : document.addEventListener('DOMContentLoaded', fn),
  convertToArray: str => str.replace(/[A-Z]/g, ' $&').split(/[^A-Za-z]+/).filter(s => s),
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
  var lastInput = '';

  $generate.addEventListener('click', generate);
  $input.addEventListener('keydown', () => window.setTimeout(generate, 0));
  $input.focus();

  function generate() {
    var input = $input.value;
    if (!input || input === lastInput) {
      return;
    }
    lastInput = input;

    var arr = CasingUtil.convertToArray(input);
    var $container = document.createElement('div');
    appendStyles($container, arr, 'Camel', 'Title', 'Kebob', 'Snake', 'Constant');
    $output.innerHTML = '';
    $output.appendChild($container);
  }

  function appendStyles(el, arr, ...styles) {
    styles.forEach(style => el.appendChild(CasingUtil.pWithText(CasingUtil[`arrayTo${style}`](arr))));
  }
});
