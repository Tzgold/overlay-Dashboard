// Declare chrome to resolve "Cannot find name 'chrome'" error in TypeScript
declare const chrome: any;

// Handle Extension Icon Click
chrome.action.onClicked.addListener((tab: any) => {
  if (tab.id) {
    chrome.tabs.sendMessage(tab.id, { action: "toggle_nova" });
  }
});

// Handle Keyboard Shortcuts (Alt+A)
chrome.commands.onCommand.addListener((command: string) => {
  if (command === "_execute_action") {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs: any[]) => {
      if (tabs[0]?.id) {
        chrome.tabs.sendMessage(tabs[0].id, { action: "toggle_nova" });
      }
    });
  }
});

console.log("Overlay AI Background Worker Active.");