(() => {
  function initAgeGate() {
    const gate = document.getElementById('ageGate');
    const enter = document.getElementById('enterBtn');
    const leave = document.getElementById('leaveBtn');

    if (!gate || !enter || !leave) return;

    const hideGate = () => {
      gate.classList.add('hidden');
      gate.setAttribute('aria-hidden', 'true');
      document.body.classList.remove('age-gate-open');
    };

    // Record the choice when possible, but never let storage errors
    // prevent the Enter button from working.
    try {
      if (window.localStorage.getItem('desire_leaks_age_ok') === '1') {
        hideGate();
      }
    } catch (_) {}

    enter.addEventListener('click', (event) => {
      event.preventDefault();
      try {
        window.localStorage.setItem('desire_leaks_age_ok', '1');
      } catch (_) {}
      hideGate();
    });

    leave.addEventListener('click', (event) => {
      event.preventDefault();
      window.location.href = 'https://www.google.com/';
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initAgeGate);
  } else {
    initAgeGate();
  }
})();
