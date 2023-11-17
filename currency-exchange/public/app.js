const getCurrenciesButton = document.getElementById('getCurrenciesButton');
const currenciesContainer = document.getElementById('currenciesContainer');
const convertCurrencyButton = document.getElementById('convertCurrencyButton');
const fromCurrencyInput = document.getElementById('fromCurrency');
const toCurrencyInput = document.getElementById('toCurrency');
const amountInput = document.getElementById('amount');
const conversionResult = document.getElementById('conversionResult');

const getCurrencies = async () => {
  try {
    const response = await fetch('/api/getCurrencies');
    const data = await response.json();
    console.log('Currencies:', data);
    displayCurrencies(data);
  } catch (error) {
    console.error('Error fetching currencies:', error);
  }
};

const convertCurrency = async () => {
  const fromCurrency = fromCurrencyInput.value.toUpperCase();
  const toCurrency = toCurrencyInput.value.toUpperCase();
  const amount = parseFloat(amountInput.value);

  try {
    const response = await fetch('/api/convertCurrency', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ from: fromCurrency, to: toCurrency, amount }),
    });
    const result = await response.json();
    console.log('Conversion Result:', result);
    displayConversionResult(result);
  } catch (error) {
    console.error('Error converting currency:', error);
  }
};

const displayCurrencies = (data) => {
  const currencies = data?.quotes || {};
  currenciesContainer.innerHTML = '<h3>Available Currencies</h3>';

  if (Object.keys(currencies).length === 0) {
    currenciesContainer.innerHTML += '<p>No currencies available.</p>';
    return;
  }

  const ul = document.createElement('ul');
  Object.entries(currencies).forEach(([currencyCode, currencyName]) => {
    const li = document.createElement('li');
    li.textContent = `${currencyCode}: ${currencyName}`;
    ul.appendChild(li);
  });

  currenciesContainer.appendChild(ul);
};

const displayConversionResult = (result) => {
  const convertedAmount = result?.amount || 0;
  conversionResult.innerHTML = `<h3>Conversion Result</h3><p>${convertedAmount}</p>`;
};

getCurrenciesButton.addEventListener('click', async () => {
  console.log('Fetching Currencies...');
  await getCurrencies();
});

convertCurrencyButton.addEventListener('click', () => {
  console.log('Converting Currency...');
  convertCurrency();
});

document.addEventListener('DOMContentLoaded', async () => {
  console.log('Page fully loaded. Fetching Currencies...');
  await getCurrencies();
});
