// Content script for WhatsApp Web phone number scraper

// Constants for timing delays
const GROUP_INFO_LOAD_DELAY_MS = 1000; // Time to wait for group info panel to load
const DOM_UPDATE_CHECK_DELAY_MS = 100; // Time to wait before checking DOM updates

// Enhanced phone number validation
function isValidPhoneNumber(number) {
  // Remove all non-digit characters except the leading +
  const cleaned = number.replace(/[^\d+]/g, '');
  
  // Phone number should start with + and have 8-15 digits
  if (!cleaned.startsWith('+')) return false;
  
  const digits = cleaned.substring(1);
  return digits.length >= 8 && digits.length <= 15;
}

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
      
      // Enhanced phone number patterns
      // International format with various separators: +33 6 12 34 56 78, +1-234-567-8900, etc.
      const patterns = [
        /\+\d{1,3}[\s\-\.\(\)]*\d{1,4}[\s\-\.\(\)]*\d{1,4}[\s\-\.\(\)]*\d{1,4}[\s\-\.\(\)]*\d{1,4}[\s\-\.\(\)]*\d{0,4}/g,
        /\+\d{8,15}/g  // Simple format without separators
      ];
      
      patterns.forEach(pattern => {
        const matches = textContent.match(pattern);
        if (matches) {
          matches.forEach(match => {
            // Clean up the number (remove spaces, hyphens, dots, parentheses)
            const cleanNumber = match.replace(/[\s\-\.\(\)]/g, '');
            if (isValidPhoneNumber(cleanNumber)) {
              phoneNumbers.add(cleanNumber);
            }
          });
        }
      });
      
      // Also look for aria-label attributes which might contain phone numbers
      const ariaLabel = participant.getAttribute('aria-label');
      if (ariaLabel) {
        patterns.forEach(pattern => {
          const ariaMatches = ariaLabel.match(pattern);
          if (ariaMatches) {
            ariaMatches.forEach(match => {
              const cleanNumber = match.replace(/[\s\-\.\(\)]/g, '');
              if (isValidPhoneNumber(cleanNumber)) {
                phoneNumbers.add(cleanNumber);
              }
            });
          }
        });
      }
    });

    // Alternative method: Look for all text elements with phone numbers
    const allTextElements = document.querySelectorAll('span[dir="auto"], span[title]');
    allTextElements.forEach(element => {
      const text = element.textContent || element.getAttribute('title') || '';
      const patterns = [
        /\+\d{1,3}[\s\-\.\(\)]*\d{1,4}[\s\-\.\(\)]*\d{1,4}[\s\-\.\(\)]*\d{1,4}[\s\-\.\(\)]*\d{1,4}[\s\-\.\(\)]*\d{0,4}/g,
        /\+\d{8,15}/g
      ];
      
      patterns.forEach(pattern => {
        const matches = text.match(pattern);
        if (matches) {
          matches.forEach(match => {
            const cleanNumber = match.replace(/[\s\-\.\(\)]/g, '');
            if (isValidPhoneNumber(cleanNumber)) {
              phoneNumbers.add(cleanNumber);
            }
          });
        }
      });
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
      
      // Wait for the panel to open
      setTimeout(() => {
        const result = extractPhoneNumbers();
        sendResponse(result);
      }, GROUP_INFO_LOAD_DELAY_MS);
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
  // Check if group info panel is now visible after DOM updates
  setTimeout(() => {
    const groupInfoVisible = document.querySelector('[data-testid="group-info"]');
    if (groupInfoVisible) {
      // Store that we're in a group
      chrome.storage.local.set({ inGroup: true });
    }
  }, DOM_UPDATE_CHECK_DELAY_MS);
});
