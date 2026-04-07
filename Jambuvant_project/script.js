const counters = document.querySelectorAll('.counter');

const startCounting = (counter) => {
  const updateCount = () => {
    const target = +counter.getAttribute('data-target');
    const count = +counter.innerText.replace(/\D/g, '');

    const increment = target / 100;

    if (count < target) {
      counter.innerText = Math.ceil(count + increment) + (counter.innerText.includes('%') ? '%' : '+');
      setTimeout(updateCount, 20);
    } else {
      counter.innerText = target + (counter.innerText.includes('%') ? '%' : '+');
    }
  };

  updateCount();
};

const observer = new IntersectionObserver((entries, obs) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      startCounting(entry.target);
      obs.unobserve(entry.target); // ek hi baar chale
    }
  });
}, {
  threshold: 0.5 // 50% visible hone pe trigger
});

counters.forEach(counter => {
  observer.observe(counter);
});
