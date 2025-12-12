# SolForge Dashboard

Full-featured Solana token management dashboard built with React and Vite.

## Features

- **Dashboard**: Overview of token metrics and performance charts
- **Token Management**: Create, view, and manage your Solana tokens
- **Airdrop Tool**: Bulk airdrop tokens to multiple addresses
- **Wallet Integration**: Connect with Phantom wallet or use demo mode
- **Modern UI**: Beautiful gradient design with smooth animations

## Tech Stack

- React 18
- Vite 4
- Tailwind CSS
- Solana Web3.js (for wallet integration)

## Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```

## Project Structure

```
solforge-project/
├── src/
│   ├── App.jsx              # Main application component
│   ├── main.jsx             # Entry point
│   ├── index.css            # Global styles
│   ├── components/          # Reusable components
│   │   ├── Header.jsx
│   │   ├── Sidebar.jsx
│   │   ├── PageHeader.jsx
│   │   ├── MetricsGrid.jsx
│   │   ├── Chart.jsx
│   │   ├── TokenList.jsx
│   │   ├── AirdropForm.jsx
│   │   ├── CreateTokenModal.jsx
│   │   └── NotificationToast.jsx
│   └── utils/
│       └── helpers.js       # Utility functions
├── index.html               # HTML template
├── package.json             # Dependencies
├── vite.config.js           # Vite configuration
├── tailwind.config.js       # Tailwind CSS configuration
├── postcss.config.js        # PostCSS configuration
└── README.md                # This file
```

## Configuration

Edit `src/App.jsx` to configure:
- `SOLANA_NETWORK`: Change between 'devnet', 'testnet', or 'mainnet-beta'
- `API_BASE_URL`: Set your backend API endpoint

## Usage

1. Connect your Phantom wallet or use demo mode
2. Create new tokens with custom parameters
3. Manage your token holdings
4. Execute airdrops to multiple addresses

## License

MIT
