"use strict";

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

/* eslint-disable */
var san = function san(opt) {
  var root = null;
  var once = typeof opt.once === 'boolean' ? opt.once : true;
  var threshold = opt.threshold >= 0.1 && opt.threshold <= 1 ? opt.threshold : 0.5;
  console.log(once);
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
        name && item.classList.add('animated', name);

        if (Number.isFinite(delay) && delay > 0.099) {
          item.setAttribute('style', "animation-delay: ".concat(delay, "s"));
        }

        once && observer.unobserve(item);
      } else {
        item.classList.remove(name);
      }
    });
  };

  var observer = new IntersectionObserver(callback, options);

  var items = _toConsumableArray(document.querySelectorAll('[data-san]'));

  items.length && items.forEach(function (item) {
    return observer.observe(item);
  });
};

san();