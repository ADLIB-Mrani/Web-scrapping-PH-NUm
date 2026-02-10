// Popup script for WhatsApp Phone Number Scraper

document.addEventListener('DOMContentLoaded', () => {
  const extractBtn = document.getElementById('extractBtn');
  const openGroupBtn = document.getElementById('openGroupBtn');
  const copyBtn = document.getElementById('copyBtn');
  const exportCsvBtn = document.getElementById('exportCsvBtn');
  const exportJsonBtn = document.getElementById('exportJsonBtn');
  const statusDiv = document.getElementById('status');
  const resultsDiv = document.getElementById('results');
  const numbersDisplay = document.getElementById('numbersDisplay');
  const countSpan = document.getElementById('count');

  let extractedNumbers = [];

  // Show status message
  function showStatus(message, type = 'info') {
    statusDiv.textContent = message;
    statusDiv.className = `status ${type}`;
  }

  // Validate if URL is WhatsApp Web
  function isWhatsAppWeb(url) {
    try {
      const urlObj = new URL(url);
      return urlObj.hostname === 'web.whatsapp.com' && urlObj.protocol === 'https:';
    } catch {
      return false;
    }
  }

  // Extract numbers button handler
  extractBtn.addEventListener('click', async () => {
    showStatus('Extracting phone numbers...', 'info');
    extractBtn.classList.add('loading');
    resultsDiv.classList.add('hidden');

    try {
      const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
      
      // Check if we're on WhatsApp Web
      if (!isWhatsAppWeb(tab.url)) {
        showStatus('Please open WhatsApp Web first!', 'error');
        extractBtn.classList.remove('loading');
        return;
      }

      // Send message to content script
      chrome.tabs.sendMessage(tab.id, { action: 'extractNumbers' }, (response) => {
        extractBtn.classList.remove('loading');
        
        if (chrome.runtime.lastError) {
          showStatus('Error: Could not connect to WhatsApp Web. Try refreshing the page.', 'error');
          return;
        }

        if (response.success) {
          extractedNumbers = response.numbers;
          
          if (extractedNumbers.length === 0) {
            showStatus('No phone numbers found. Make sure you have the group participants visible.', 'error');
          } else {
            showStatus(`Successfully extracted ${extractedNumbers.length} phone number(s)!`, 'success');
            displayNumbers(extractedNumbers);
          }
        } else {
          showStatus(`Error: ${response.error}`, 'error');
        }
      });
    } catch (error) {
      extractBtn.classList.remove('loading');
      showStatus(`Error: ${error.message}`, 'error');
    }
  });

  // Open group info button handler
  openGroupBtn.addEventListener('click', async () => {
    try {
      const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
      
      if (!isWhatsAppWeb(tab.url)) {
        showStatus('Please open WhatsApp Web first!', 'error');
        return;
      }

      chrome.tabs.sendMessage(tab.id, { action: 'openGroupInfo' }, (response) => {
        if (chrome.runtime.lastError) {
          showStatus('Error: Could not connect to WhatsApp Web.', 'error');
          return;
        }

        if (response.success) {
          showStatus('Group info panel opened. Wait a moment, then click Extract Numbers.', 'success');
        } else {
          showStatus('Could not open group info. Try clicking the group name manually.', 'error');
        }
      });
    } catch (error) {
      showStatus(`Error: ${error.message}`, 'error');
    }
  });

  // Display extracted numbers
  function displayNumbers(numbers) {
    numbersDisplay.value = numbers.join('\n');
    countSpan.textContent = numbers.length;
    resultsDiv.classList.remove('hidden');
  }

  // Copy to clipboard
  copyBtn.addEventListener('click', async () => {
    try {
      // Use modern Clipboard API
      await navigator.clipboard.writeText(numbersDisplay.value);
      
      const originalText = copyBtn.textContent;
      copyBtn.textContent = '✓ Copied!';
      setTimeout(() => {
        copyBtn.textContent = originalText;
      }, 2000);
    } catch (err) {
      // Fallback for older browsers
      numbersDisplay.select();
      document.execCommand('copy');
      
      const originalText = copyBtn.textContent;
      copyBtn.textContent = '✓ Copied!';
      setTimeout(() => {
        copyBtn.textContent = originalText;
      }, 2000);
    }
  });

  // Export as CSV
  exportCsvBtn.addEventListener('click', () => {
    if (extractedNumbers.length === 0) {
      showStatus('No numbers to export!', 'error');
      return;
    }

    const csv = 'Phone Number\n' + extractedNumbers.join('\n');
    downloadFile(csv, 'whatsapp_numbers.csv', 'text/csv');
    showStatus('CSV file downloaded!', 'success');
  });

  // Export as JSON
  exportJsonBtn.addEventListener('click', () => {
    if (extractedNumbers.length === 0) {
      showStatus('No numbers to export!', 'error');
      return;
    }

    const json = JSON.stringify({
      extracted_at: new Date().toISOString(),
      count: extractedNumbers.length,
      phone_numbers: extractedNumbers
    }, null, 2);
    
    downloadFile(json, 'whatsapp_numbers.json', 'application/json');
    showStatus('JSON file downloaded!', 'success');
  });

  // Helper function to download files
  function downloadFile(content, filename, mimeType) {
    const blob = new Blob([content], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }
});
