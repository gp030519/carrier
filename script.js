function calculateDecision() {
  const csg = parseFloat(document.getElementById('csg').value);
  let q = parseFloat(document.getElementById('q').value);
  const cecs = parseFloat(document.getElementById('cecs').value);
  let p = parseFloat(document.getElementById('p').value);

  if (isNaN(csg) || isNaN(q) || isNaN(cecs) || isNaN(p)) {
    alert('Please enter all values.');
    return;
  }

  // Convert q from percentage to fraction
  q = q / 100;
  // Convert p from denominator to fraction
  p = 1 / p;

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
