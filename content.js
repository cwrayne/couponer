chrome.runtime.sendMessage({ action: "getCoupons" }, (coupons) => {
    const domain = window.location.hostname.replace('www.', '');
    if (coupons[domain]) {
      applyCoupon(coupons[domain]);
    }
  });
  
  function applyCoupon(coupon) {
    // Logic to apply the coupon code, this may vary depending on the website.
    const input = document.querySelector('input[name="coupon"]');
    if (input) {
      input.value = coupon;
      const applyButton = document.querySelector('button[name="apply_coupon"]');
      if (applyButton) {
        applyButton.click();
      }
    }
  }
  