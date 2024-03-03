// Order information object
var orderInformation = {
  beverage: null,
  condiments: [],
  total: 0
};

// Fetch prices from the backend
async function fetchPrices() {
  const response = await fetch('https://coffee-order-latest-8gm9.onrender.com/orders/prices');
  return response.json();
}

// Function to update condiment display
async function updateCondimentDisplay() {
  for (let i = 1; i <= 4; i++) {
    const condimentSpan = document.getElementById('condiment' + i);
    const condimentValue = orderInformation.condiments[i - 1] || 'None';
    condimentSpan.innerText = condimentValue;
    condimentSpan.parentElement.innerHTML = `Condiment ${i}: <span id="condiment${i}">${condimentValue}</span>` + (condimentValue !== 'None' ? `<button class="remove-condiment" onclick="removeCondiment('${condimentValue}')">X</button>` : '');
  }
}

// New function to remove a clicked condiment
async function removeCondiment(condiment) {
  const prices = await fetchPrices();
  const index = orderInformation.condiments.indexOf(condiment);
  if (index > -1) {
    orderInformation.condiments.splice(index, 1);
    orderInformation.total -= prices[condiment];
    updateCondimentDisplay(); // Update the display after removal
  }
}

// Function to add or remove condiments
async function toggleCondiment(condiment) {
  const prices = await fetchPrices();
  const index = orderInformation.condiments.indexOf(condiment);
  if (index > -1) {
    orderInformation.condiments.splice(index, 1);
    orderInformation.total -= prices[condiment];
  } else {
    if (orderInformation.condiments.length < 4) {
      orderInformation.condiments.push(condiment);
      orderInformation.total += prices[condiment];
    }
  }
  updateCondimentDisplay();
  document.getElementById(condiment).classList.toggle('selected');
}

// Function to select a beverage
async function selectBeverage(beverage) {
  const prices = await fetchPrices();
  orderInformation.beverage = beverage;
  orderInformation.total = prices[beverage];
  document.getElementById('about-order-information').style.display = 'block';
  document.getElementById('beverage-selection').style.display = 'none';
  document.getElementById('selected-beverage').innerText = beverage;
}

// Function to confirm the order and generate a random order ID
async function confirmOrder() {
  try {
    const response = await fetch('https://coffee-order-latest-8gm9.onrender.com/orders', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(orderInformation)
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const receipt = await response.json();

    var orderDetails = document.querySelector('.total-cost');
    orderDetails.innerHTML = `
      <h1>Order Information</h1>
      <p>Order ID: ${receipt.id}</p>
      <p>Beverage: ${receipt.description}</p>
      <p>Condiments: ${(receipt.condiments ?? []).join(', ')}</p>
      <p>Total: $${(receipt.cost ?? 0).toFixed(2)}</p>
    `;
    orderDetails.style.display = 'block';
  } catch (error) {
    console.error('There was a problem with the fetch operation:', error);
  }
}


// Reset order function
async function resetOrder() {
  orderInformation.beverage = null;
  orderInformation.condiments = [];
  orderInformation.total = 0;

  document.getElementById('about-order-information').style.display = 'none';
  document.querySelector('.total-cost').style.display = 'none';
  document.getElementById('beverage-selection').style.display = 'block';
  document.getElementById('selected-beverage').innerText = 'None';
  updateCondimentDisplay();
}

// Add event listeners for beverages and condiments
document.addEventListener('DOMContentLoaded', function() {
  document.querySelectorAll('#beverage-selection h2').forEach(function(h2) {
    h2.addEventListener('click', function() {
      selectBeverage(h2.innerText);
    });
  });

  document.querySelectorAll('#condiment-selection button').forEach(function(button) {
    button.addEventListener('click', function() {
      toggleCondiment(button.id);
    });
  });

  document.querySelector('.start-button').addEventListener('click', confirmOrder);
  document.querySelector('.selected-beverage-button').addEventListener('click', resetOrder);
});
