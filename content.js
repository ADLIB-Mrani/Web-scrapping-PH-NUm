// Content script for WhatsApp Web phone number scraper

// Function to extract phone numbers from the current group
function extractPhoneNumbers() {
  const phoneNumbers = new Set();
  
  try {
    // Wait for WhatsApp Web to load
    const groupInfo = document.querySelector('[data-testid="group-info"]');
    if (!groupInfo) {
      return {
        success: false,
        error: "Please open a WhatsApp group first",
        numbers: []
      };
    }

    // Look for participant elements
    // WhatsApp Web uses various selectors, we'll try multiple approaches
    const participants = document.querySelectorAll('[data-testid="cell-frame-container"]');
    
    participants.forEach(participant => {
      // Extract text content
      const textContent = participant.textContent;
      
      // Try to find phone numbers in various formats
      // International format: +1234567890, +33 6 12 34 56 78, etc.
      const internationalPattern = /\+\d{1,3}[\s\-]?\d{1,14}/g;
      const matches = textContent.match(internationalPattern);
      
      if (matches) {
        matches.forEach(match => {
          // Clean up the number
          const cleanNumber = match.replace(/[\s\-]/g, '');
          phoneNumbers.add(cleanNumber);
        });
      }
      
      // Also look for aria-label attributes which might contain phone numbers
      const ariaLabel = participant.getAttribute('aria-label');
      if (ariaLabel) {
        const ariaMatches = ariaLabel.match(internationalPattern);
        if (ariaMatches) {
          ariaMatches.forEach(match => {
            const cleanNumber = match.replace(/[\s\-]/g, '');
            phoneNumbers.add(cleanNumber);
          });
        }
      }
    });

    // Alternative method: Look for contact cards
    const contactElements = document.querySelectorAll('span[dir="auto"]');
    contactElements.forEach(element => {
      const text = element.textContent;
      const matches = text.match(/\+\d{1,3}[\s\-]?\d{1,14}/g);
      if (matches) {
        matches.forEach(match => {
          const cleanNumber = match.replace(/[\s\-]/g, '');
          phoneNumbers.add(cleanNumber);
        });
      }
    });

    return {
      success: true,
      numbers: Array.from(phoneNumbers),
      count: phoneNumbers.size
    };
    
  } catch (error) {
    return {
      success: false,
      error: error.message,
      numbers: []
    };
  }
}

// Function to click on group info to reveal participants
function openGroupInfo() {
  try {
    // Try to find and click the group header to open group info
    const header = document.querySelector('header[data-testid="conversation-header"]');
    if (header) {
      header.click();
      return true;
    }
    return false;
  } catch (error) {
    console.error('Error opening group info:', error);
    return false;
  }
}

// Listen for messages from popup
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'extractNumbers') {
    // First try to open group info if needed
    const groupInfoVisible = document.querySelector('[data-testid="group-info"]');
    
    if (!groupInfoVisible) {
      // Try to open group info
      openGroupInfo();
      
      // Wait a bit for the panel to open
      setTimeout(() => {
        const result = extractPhoneNumbers();
        sendResponse(result);
      }, 1000);
    } else {
      const result = extractPhoneNumbers();
      sendResponse(result);
    }
    
    return true; // Keep the message channel open for async response
  }
  
  if (request.action === 'openGroupInfo') {
    const success = openGroupInfo();
    sendResponse({ success });
    return true;
  }
});

// Also listen for when group info is opened manually
document.addEventListener('click', (e) => {
  // Check if group info panel is now visible
  setTimeout(() => {
    const groupInfoVisible = document.querySelector('[data-testid="group-info"]');
    if (groupInfoVisible) {
      // Store that we're in a group
      chrome.storage.local.set({ inGroup: true });
    }
  }, 100);
});
