# Model Quota & Usage Tracker for Antigravity

A UI Sidecar plugin for Google Antigravity that displays live quota percentages, context window usage, and rolling reset countdowns for models like **Claude Opus 5.5**, **Claude Sonnet 5.5**, and **Gemini 3.8 Flash**.

Styled after the Claude Code status bar interface.

---

## Features

- **Prompt Monitor Bar:** Live circular SVG meters for context usage, 5-hour rolling model quota, and flash quota.
- **Model Breakdown Cards:**
  - **Claude Opus 5.5 (High Reasoning):** Tracks usage against the shared high-compute allocation pool.
  - **Gemini 3.8 Flash (Medium):** High-speed model pool tracking.
  - **Claude Sonnet 5.5:** Autonomous pair-programming model allocation.
- **Auto-Countdown Timer:** Real-time countdown timer showing exactly when the 5-hour rolling limit window resets.
- **Auxiliary Pane Integration:** Renders directly in the Antigravity right-side auxiliary panel alongside your chat.
- **Automatic Language Server Sync:** Periodically queries Antigravity's local language server RPCs to fetch real-time quota telemetry.

---

## Installation

### Method 1: One-Click PowerShell Install (Recommended)

1. Clone or download this repository.
2. In PowerShell, navigate to the folder and run:
   ```powershell
   .\install.ps1
   ```
3. Restart Antigravity.

### Method 2: Manual Installation

Copy this entire folder to your Antigravity plugins directory:
```
~/.gemini/config/plugins/model-quota-tracker/
```

On Windows, the path is:
```
C:\Users\<YourUsername>\.gemini\config\plugins\model-quota-tracker\
```

---

## Opening the Sidecar

Once installed and Antigravity is restarted, click this link in any chat session or slash command menu:

```markdown
[Model Quota Tracker](sidecar://model-quota-tracker/quota-panel/)
```

---

## Repository Structure

```text
model-quota-tracker/
├── plugin.json                    # Antigravity plugin manifest
├── install.ps1                    # One-click Windows installer
├── README.md                      # Project documentation
└── sidecars/
    └── quota-panel/
        ├── sidecar.json           # Sidecar UI entrypoint configuration
        ├── server.mjs             # Node.js backend connecting to Antigravity LS
        └── index.html             # Responsive Tailwind UI dashboard
```

---

## License

MIT License. Free for all Antigravity users!
