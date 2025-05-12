document.addEventListener('DOMContentLoaded', () => {
  const paymentBtn = document.getElementById('complete-payment-btn');

  paymentBtn.addEventListener('click', () => {
    // Show alert
    alert('✅ Payment done successfully! Redirecting to Pharmacy...');

    // Clear local cart
    localStorage.removeItem('cart');

    // Redirect to /pharmacy
    window.location.href = '/pharmacy';
  });
});
