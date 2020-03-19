/* eslint-disable */
const san = (opt) => {
  const root = null;
  const once = ( typeof opt.once === 'boolean' ) ? opt.once : true;
  const threshold = ( opt.threshold >= 0.1 && opt.threshold <= 1 ) ? opt.threshold : 0.5;
  console.log(once);

  const options = {
    root: root,
    threshold: threshold
  };
  
  const callback = (entries) => {
    entries.forEach(entry => {
      let item = entry.target;
      let name = item.dataset.san || '';
      let delay = parseInt(item.dataset.sanDelay) / 1000;
  
      if ( entry.isIntersecting && !item.classList.contains(name) ) {

        name && item.classList.add('animated', name);

        if ( Number.isFinite(delay) && (delay > 0.099) ) {
          item.setAttribute('style', `animation-delay: ${delay}s`);
        }

        once && observer.unobserve(item);
      } else {
        item.classList.remove(name)
      }
    });
  }
  
  const observer = new IntersectionObserver(callback, options);
  
  const items = [...document.querySelectorAll('[data-san]')];
  items.length && items.forEach(item => observer.observe(item));
}

san();