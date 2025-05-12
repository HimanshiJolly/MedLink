document.getElementById('payment-form').addEventListener('submit', function(event) {
      event.preventDefault();
      fetch('/payment/complete', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({})
      })
      .then(response => {
        if (response.ok) {
          // Clear cart on client side
          localStorage.removeItem('cart');
          window.location.href = '/pharmacy';
        } else if (response.status === 401) {
          alert('Please log in to proceed with the purchase.');
        } else {
          alert('Payment failed. Please try again.');
        }
      })
      .catch(() => {
        alert('Payment failed. Please try again.');
      });
    });