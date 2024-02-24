// Hardcoded prices for the beverages and condiments
var prices = {
    'Dark Roast': 2.5,
    'Espresso': 2.0,
    'House Blend': 2.0,
    'Decaf': 1.5,
    'Milk': 0.5,
    'Mocha': 0.5,
    'Soy': 0.5,
    'Whip': 0.5
  };
  
  // Order information object
  var orderInformation = {
    beverage: null,
    condiments: [],
    total: 0
  };
  
  // Function to update condiment display
  function updateCondimentDisplay() {
    for (let i = 1; i <= 4; i++) {
      document.getElementById('condiment' + i).innerText = orderInformation.condiments[i - 1] || 'None';
    }
  }
  
  // Function to add or remove condiments
  function toggleCondiment(condiment) {
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
  function selectBeverage(beverage) {
    orderInformation.beverage = beverage;
    orderInformation.total = prices[beverage];
    document.getElementById('about-order-information').style.display = 'block';
    document.getElementById('beverage-selection').style.display = 'none';
    document.getElementById('selected-beverage').innerText = beverage;
  }
  
  // Function to confirm the order and generate a random order ID
  function confirmOrder() {
    var orderId = Math.floor(Math.random() * 1000000);
    
    var orderDetails = document.querySelector('.total-cost');
    orderDetails.innerHTML = `
      <h1>Order Information</h1>
      <p>Order ID: ${orderId}</p>
      <p>Beverage: ${orderInformation.beverage || 'None'}</p>
      <p>Condiments: ${orderInformation.condiments.join(', ') || 'None'}</p>
      <p>Total: $${orderInformation.total.toFixed(2)}</p>
    `;
    orderDetails.style.display = 'block';
  }
  
  // beverage selections
  document.querySelectorAll('#beverage-selection h2').forEach(function(h2) {
    h2.addEventListener('click', function() {
      selectBeverage(h2.innerText);
    });
  });
  
  // Attach event listeners to the condiment buttons
  document.querySelectorAll('#condiment-selection button').forEach(function(button) {
    button.addEventListener('click', function() {
      toggleCondiment(button.id); 
    });
  });
  
  // confirm order button
  document.querySelector('.start-button').addEventListener('click', confirmOrder);
  
  // Initial setup
  document.getElementById('about-order-information').style.display = 'none'; 
  document.querySelector('.total-cost').style.display = 'none'; 
  