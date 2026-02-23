const analyzeBtn = document.getElementById('analyzeBtn');
const loader = document.getElementById('loader');
const result = document.getElementById('result');

analyzeBtn.addEventListener('click', () => {
  const age = parseInt(document.getElementById('age').value);
  const height = parseFloat(document.getElementById('height').value);
  const weight = parseFloat(document.getElementById('weight').value);

  if (!age || !height || !weight) {
    alert('Please fill all fields properly.');
    return;
  }

  loader.style.display = 'block';
  result.classList.remove('show');

  setTimeout(() => {
      // you can print the bmi using the dom manipulation
    const bmi = weight / ((height / 100) * (height / 100));
    let bodyType = '';
    if (bmi < 18.5) bodyType = 'lean and agile build';
    else if (bmi < 25) bodyType = 'well-balanced physique';
    else if (bmi < 30) bodyType = 'strong and solid frame';
    else bodyType = 'powerful and commanding presence';

    let ageTone = '';
    if (age < 18) ageTone = 'You have vibrant youthful energy';
    else if (age <= 25) ageTone = 'You are in a powerful growth phase of life';
    else if (age <= 40) ageTone = 'You carry confident maturity';
    else ageTone = 'You reflect experience and wisdom';

    let heightTone = '';
    if (height < 160) heightTone = 'with a compact and efficient stature';
    else if (height <= 180) heightTone = 'with a naturally balanced presence';
    else heightTone = 'with an impressive and commanding height';

    const compliment = `${ageTone}, ${heightTone}, and a ${bodyType}. That combination speaks of uniqueness, strength, and individuality.`;

    loader.style.display = 'none';
    result.innerText = compliment;
    result.classList.add('show');
  }, 2000);
});
