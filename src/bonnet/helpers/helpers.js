module.exports.register = function (Handlebars, options) {
  'use strict';

  Handlebars.registerHelper('replaceStr', function (haystack, needle, replacement) {
    if (haystack && needle) {
      return haystack.replace(needle, replacement);
    } else {
      return '';
    }
  });

  Handlebars.registerHelper('raw', function(options) {
      return options.fn();
  });

  Handlebars.registerHelper('ifCond', function (v1, operator, v2, options) {
    switch (operator) {
        case '==':
            return (v1 == v2) ? options.fn(this) : options.inverse(this);
        case '===':
            return (v1 === v2) ? options.fn(this) : options.inverse(this);
        case '<':
            return (v1 < v2) ? options.fn(this) : options.inverse(this);
        case '<=':
            return (v1 <= v2) ? options.fn(this) : options.inverse(this);
        case '>':
            return (v1 > v2) ? options.fn(this) : options.inverse(this);
        case '>=':
            return (v1 >= v2) ? options.fn(this) : options.inverse(this);
        case '&&':
            return (v1 && v2) ? options.fn(this) : options.inverse(this);
        case '||':
            return (v1 || v2) ? options.fn(this) : options.inverse(this);
        default:
            return options.inverse(this);
    }
  });

  Handlebars.registerHelper("debug", function(optionalValue) {
    if (optionalValue) {
      console.log("Value");
      console.log("====================");
      console.log(optionalValue);
      console.log(optionalValue[0].pages[0]);
      console.log(optionalValue[0].pages[1]);
      console.log(optionalValue[0].pages[2]);
      console.log(optionalValue[0].pages[3]);
      return;
    }
    console.log("Current Context");
    console.log("====================");
    console.log(this);

  });

};
