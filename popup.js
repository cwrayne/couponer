document.getElementById('refresh').addEventListener('click', () => {
    chrome.runtime.sendMessage({ action: "getCoupons" }, (coupons) => {
      document.getElementById('status').textContent = 'Coupons refreshed!';
    });
  });
  