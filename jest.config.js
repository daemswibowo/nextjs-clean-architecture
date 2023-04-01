const nextJest = require('next/jest');

const createJestConfig = nextJest({
    dir: './',
});

const config = {
    moduleNameMapper: {
        "@/(.*)": "<rootDir>/src/$1"
    },
    setupFilesAfterEnv: [
        "./jest.setup.js"
    ],
    verbose: true,
    testMatch: ["**/__tests__/**/?(*.)+(spec|test).[jt]s?(x)", "**/?(*.)+(spec|test).[jt]s?(x)"]
}

module.exports = createJestConfig(config);
