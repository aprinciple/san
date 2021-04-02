"use strict";

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

/* eslint-disable */
var san = function san(opt) {
  var root = null;
  var once = typeof opt.once === 'boolean' ? opt.once : true;
  var threshold = opt.threshold >= 0.1 && opt.threshold <= 1 ? opt.threshold : 1.0;
  var options = {
    root: root,
    threshold: threshold
  };

  var callback = function callback(entries) {
    entries.forEach(function (entry) {
      var item = entry.target;
      var name = item.dataset.san || '';
      var delay = parseInt(item.dataset.sanDelay) / 1000;

      if (entry.isIntersecting && !item.classList.contains(name)) {
        if (name) {
          item.classList.add('san-animated', name);
          item.classList.remove('san-hide');
        }

        if (Number.isFinite(delay) && delay > 0.099) {
          item.setAttribute('style', "animation-delay: ".concat(delay, "s"));
        }

        once && observer.unobserve(item);
      } else {
        item.classList.add('san-hide');
        !once && item.classList.remove(name);
      }
    });
  };

  var observer = new IntersectionObserver(callback, options);

  var items = _toConsumableArray(document.querySelectorAll('[data-san]'));

  items.length && items.forEach(function (item) {
    return observer.observe(item);
  });
};

san({
  once: true,
  threshold: ''
});