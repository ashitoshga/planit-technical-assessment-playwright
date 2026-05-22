# Automation Tool:
- Playwright
- TypeScript

# Framework structure:
- Page Object Model

├── pages/
│   ├── basePg.ts
│   ├── homePg.ts
│   ├── contactPg.ts
│   └── cartPg.ts
│
├── tests/
│   ├── testcases.spec.ts
│
├── utils/
│   ├── testData.ts
│
├── playwright.config.ts
├── package.json
└── README.md


# To run test
npx playwright test
