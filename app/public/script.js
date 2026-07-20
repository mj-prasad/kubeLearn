document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('calc-form');
  const numAInput = document.getElementById('num-a');
  const numBInput = document.getElementById('num-b');
  const resultBox = document.getElementById('result-box');
  const resultVal = document.getElementById('result-val');
  const resultExpr = document.getElementById('result-expr');
  const btnSubmit = document.getElementById('btn-submit');

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const a = numAInput.value.trim();
    const b = numBInput.value.trim();

    if (!a || !b) return;

    // Show loading state
    btnSubmit.disabled = true;
    btnSubmit.querySelector('span').textContent = 'Calculating...';
    
    // Clear styles
    resultBox.className = 'result-container';

    try {
      // Call backend API
      const response = await fetch(`/api/add?a=${encodeURIComponent(a)}&b=${encodeURIComponent(b)}`);
      const data = await response.json();

      // Reset button
      btnSubmit.disabled = false;
      btnSubmit.querySelector('span').textContent = 'Calculate Sum';

      if (!response.ok) {
        throw new Error(data.error || 'Something went wrong');
      }

      // Display success result
      resultVal.textContent = data.result;
      resultExpr.textContent = `${data.a} + ${data.b} = ${data.result}`;
      resultBox.classList.add('success', 'animated-pop');
    } catch (err) {
      // Reset button
      btnSubmit.disabled = false;
      btnSubmit.querySelector('span').textContent = 'Calculate Sum';

      // Display error
      resultVal.textContent = 'Error';
      resultExpr.textContent = err.message;
      resultBox.classList.add('error', 'animated-pop');
    }

    // Remove animation class after it completes to allow re-triggering
    setTimeout(() => {
      resultBox.classList.remove('animated-pop');
    }, 300);
  });
});
