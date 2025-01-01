chrome.runtime.onInstalled.addListener(() => {
    fetchCoupons();
  });
  
  chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === "getCoupons") {
      fetchCoupons().then(coupons => sendResponse(coupons));
      return true; // Will respond asynchronously.
    }
  });
  
  async function fetchCoupons() {
    try {
      const response = await fetch('https://cwrayne.github.io/couponer/coupons.txt');
      const text = await response.text();
      const coupons = parseCoupons(text);
      chrome.storage.local.set({ coupons });
      return coupons;
    } catch (error) {
      console.error('Failed to fetch coupons:', error);
      return {};
    }
  }
  
  function parseCoupons(text) {
    const lines = text.split('\n');
    const coupons = {};
    let currentDomain = '';
  
    lines.forEach(line => {
      if (line.endsWith(':')) {
        currentDomain = line.slice(0, -1);
      } else if (line.trim()) {
        coupons[currentDomain] = line.trim();
      }
    });
  
    return coupons;
  }
  