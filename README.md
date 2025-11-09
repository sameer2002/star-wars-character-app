## Tech Stack

- **Frontend**: React 18 with JavaScript
- **Styling**: Tailwind CSS, material ui
- **Build Tool**: Vite
- **HTTP Client**: Axios
- **Testing**: Vitest + React Testing Library
- **API**: Star Wars API (SWAPI)

## 📋 Installation

1. Clone the repository:
   \`\`\`bash
   git clone https://github.com/AbhayGseven/star-wars-character-app.git
   cd star-wars-character-app
   \`\`\`

2. Install dependencies:
   \`\`\`bash
   npm install
   \`\`\`

3. Start the development server:
   \`\`\`bash
   npm run dev
   \`\`\`

The application will be available at \`http://localhost:3000\`

## 🔐 Demo Credentials

- **Username**: admin
- **Password**: password

## 🧪 Running Tests

\`\`\`bash
npm run test
\`\`\`

For UI test runner:
\`\`\`bash
npm run test:ui
\`\`\`

## 📁 Project Structure

\`\`\`
src/
├── components/ # React components (.jsx files)
├── hooks/ # Custom React hooks (.js files)
├── services/ # API and authentication services
├── types/ # JSDoc type definitions
├── utils/ # Utility functions
├── **tests**/ # Test files
├── App.jsx # Main app component
├── main.jsx # Entry point
└── index.css # Global styles
\`\`\`

## 🚢 Building for Production

\`\`\`bash
npm run build
\`\`\`

## 🔄 Future Enhancements

- Add more filtering options (films, homeworld)
- Implement favorites/bookmarking
- Add character comparison feature
- Implement infinite scroll
- Add dark mode
