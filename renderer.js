const API_URL = `https://v6.exchangerate-api.com/v6/YOUR-API-KEY`;

// Load available currencies when the window is loaded.
window.addEventListener('DOMContentLoaded', async () => {
    try {
      const response = await fetch(`${API_URL}/codes`);
      const data = await response.json();
      const fromCurrencySelect = document.getElementById('fromCurrency');
      const toCurrencySelect = document.getElementById('toCurrency');

      let countriesArray = data['supported_codes']
      for (let index = 0; index < countriesArray.length; index++) {
        const element = countriesArray[index][0];
        fromCurrencySelect.innerHTML += `<option value="${element}">${element}</option>`;
        toCurrencySelect.innerHTML += `<option value="${element}">${element}</option>`;
      }
    } catch (error) {
      console.error('Error fetching available currencies:', error);
    }
  });

document.getElementById('convert').addEventListener('click', async () => {
  const amount = document.getElementById('amount').value;
  const fromCurrency = document.getElementById('fromCurrency').value;
  const toCurrency = document.getElementById('toCurrency').value;
  console.log(fromCurrency);
  console.log(toCurrency);

  try {
    const response = await fetch(`${API_URL}/latest/${fromCurrency}`);
    console.log(`${API_URL}/latest/${fromCurrency}`);
    const data = await response.json();
    const rate = data['conversion_rates'][toCurrency];
    console.log(rate);
    const convertedAmount = rate * amount;
    document.getElementById('result').innerText = `${convertedAmount.toFixed(2)} ${toCurrency}`;
  } catch (error) {
    console.error('Error fetching exchange rate:', error);
  }
});