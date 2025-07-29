function calculateDecision() {
  const csg = parseFloat(document.getElementById('csg').value);
  let q = parseFloat(document.getElementById('q').value);
  const cecs = parseFloat(document.getElementById('cecs').value);
  let p = parseFloat(document.getElementById('p').value);
  let prev = parseFloat(document.getElementById('prev').value);

  // Validate required fields
  if (isNaN(csg) || isNaN(q) || isNaN(cecs) || (isNaN(p) && isNaN(prev))) {
    alert('Please enter all required values, including either carrier frequency or disease prevalence.');
    return;
  }

  // Convert q from percentage to fraction
  q = q / 100;

  // Determine carrier frequency
  if (!isNaN(prev)) {
    // Use disease prevalence to calculate carrier frequency
    // Prevalence = q^2 = 1/prev, so q = sqrt(1/prev), carrier freq = 2q
    let q_allele = Math.sqrt(1 / prev);
    p = 2 * q_allele;
  } else if (!isNaN(p)) {
    // Use entered carrier frequency
    p = 1 / p;
  }

  if (cecs === csg) {
    alert('C(ECS) and C(SG) cannot be equal (division by zero).');
    return;
  }

  // Always use c = 2C(SG)Rq / (C(ECS) - C(SG)), R=1
  const c = (2 * csg * q) / (cecs - csg);

  let message = '';
  if (p > c) {
    message = 'do single gene test!';
  } else if (p < c) {
    message = 'do expanded carrier screening!';
  } else {
    message = 'either option is equally cost-effective';
  }

  alert(message);
  document.getElementById('result').textContent = `Decision: ${message}`;
}
