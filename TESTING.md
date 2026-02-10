# Testing Guide for WhatsApp Phone Number Scraper

## Pre-Testing Checklist

Before testing, ensure you have:
- [ ] Google Chrome or Microsoft Edge installed
- [ ] Access to WhatsApp Web (https://web.whatsapp.com)
- [ ] At least one WhatsApp group to test with
- [ ] The extension loaded in Chrome extensions

## Installation Test

1. **Load Extension**
   - Open Chrome and navigate to `chrome://extensions/`
   - Enable "Developer mode"
   - Click "Load unpacked"
   - Select the project folder
   - Verify the extension appears in the list
   - Verify the icon appears in the toolbar

   ✅ Expected: Extension loads without errors

## Functional Tests

### Test 1: Basic Phone Number Extraction

1. Open WhatsApp Web (https://web.whatsapp.com)
2. Log in with your phone
3. Click on a group conversation
4. Click on the group name to open group info
5. Ensure participants are visible
6. Click the extension icon
7. Click "Extract Numbers"

✅ Expected: Phone numbers are extracted and displayed

### Test 2: Export to CSV

1. After extracting numbers (Test 1)
2. Click "📄 Export CSV"

✅ Expected: A CSV file is downloaded with phone numbers

### Test 3: Export to JSON

1. After extracting numbers (Test 1)
2. Click "📦 Export JSON"

✅ Expected: A JSON file is downloaded with:
   - `extracted_at` timestamp
   - `count` of numbers
   - `phone_numbers` array

### Test 4: Copy to Clipboard

1. After extracting numbers (Test 1)
2. Click "📋 Copy All"
3. Paste into a text editor

✅ Expected: All phone numbers are copied, button shows "✓ Copied!"

### Test 5: No Group Open

1. Open WhatsApp Web
2. Click on a regular conversation (not a group)
3. Click the extension icon
4. Click "Extract Numbers"

✅ Expected: Error message "Please open a WhatsApp group first"

### Test 6: Not on WhatsApp Web

1. Navigate to any other website
2. Click the extension icon
3. Click "Extract Numbers"

✅ Expected: Error message "Please open WhatsApp Web first!"

### Test 7: Open Group Info Button

1. Open WhatsApp Web
2. Click on a group
3. Don't open group info manually
4. Click extension icon
5. Click "Open Group Info"

✅ Expected: Group info panel opens, status message shown

## Edge Cases

### Test 8: Empty Group

1. Open a group with no participants (or just you)
2. Extract numbers

✅ Expected: "No phone numbers found" or displays only available numbers

### Test 9: Different Phone Number Formats

Test with groups containing numbers in various formats:
- `+1234567890`
- `+33 6 12 34 56 78`
- `+1-234-567-8900`
- `+44 (20) 1234 5678`

✅ Expected: All valid international format numbers are extracted

### Test 10: Duplicate Numbers

1. Test with a group where same number might appear multiple times
2. Extract numbers

✅ Expected: Each unique number appears only once

## Security Tests

### Test 11: URL Validation

1. Try to use extension on `http://evil.web.whatsapp.com.example.com`
2. Try to use on `https://web-whatsapp-com.evil.example.com`

✅ Expected: Extension should NOT work on these URLs

### Test 12: Data Privacy

1. Extract numbers
2. Check browser network tab (F12)

✅ Expected: No external network requests are made

## Performance Tests

### Test 13: Large Group

1. Test with a group containing 100+ participants
2. Extract numbers

✅ Expected: Extraction completes within reasonable time (< 5 seconds)

## Browser Compatibility

### Test 14: Different Browsers

Test in:
- [ ] Google Chrome
- [ ] Microsoft Edge
- [ ] Brave Browser

✅ Expected: Extension works in all Chromium-based browsers

## UI/UX Tests

### Test 15: Responsive Design

1. Open extension popup
2. Check the UI appearance

✅ Expected:
   - UI is properly styled
   - WhatsApp green theme is visible
   - All buttons are accessible
   - Text is readable

### Test 16: Error Handling

1. While extracting, close the WhatsApp tab
2. Try other error scenarios

✅ Expected: User-friendly error messages are displayed

## Cleanup Test

### Test 17: Extension Removal

1. Remove extension from Chrome
2. Check that no data persists

✅ Expected: Clean removal without traces

## Test Results Summary

| Test # | Test Name | Status | Notes |
|--------|-----------|--------|-------|
| 1 | Basic Extraction | ⬜ | |
| 2 | Export CSV | ⬜ | |
| 3 | Export JSON | ⬜ | |
| 4 | Copy Clipboard | ⬜ | |
| 5 | No Group Open | ⬜ | |
| 6 | Not WhatsApp Web | ⬜ | |
| 7 | Open Group Info | ⬜ | |
| 8 | Empty Group | ⬜ | |
| 9 | Different Formats | ⬜ | |
| 10 | Duplicate Numbers | ⬜ | |
| 11 | URL Validation | ⬜ | |
| 12 | Data Privacy | ⬜ | |
| 13 | Large Group | ⬜ | |
| 14 | Browser Compat | ⬜ | |
| 15 | Responsive Design | ⬜ | |
| 16 | Error Handling | ⬜ | |
| 17 | Extension Removal | ⬜ | |

## Known Limitations

1. Only works on WhatsApp Web (not mobile app)
2. Requires participants list to be visible
3. Only extracts numbers in international format (starting with +)
4. Depends on WhatsApp Web's DOM structure (may break if WhatsApp updates)

## Reporting Issues

If you find any issues:
1. Note the exact steps to reproduce
2. Take screenshots if applicable
3. Check browser console for errors (F12)
4. Report on GitHub Issues
