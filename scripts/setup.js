#!/usr/bin/env node

/**
 * setup.js
 * 
 * This script helps set up a new project using the guetta-app-kit boilerplate.
 * It performs the following tasks:
 * 1. Updates package.json with project-specific information
 * 2. Initializes git repository
 * 3. Installs dependencies
 * 4. Creates initial .env file from .env.example
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

/**
 * Prompt the user for input
 * @param {string} question 
 * @returns {Promise<string>}
 */
function prompt(question) {
  return new Promise((resolve) => {
    rl.question(question, (answer) => {
      resolve(answer);
    });
  });
}

/**
 * Execute a shell command and print the output
 * @param {string} command 
 */
function execute(command) {
  try {
    console.log(`Executing: ${command}`);
    execSync(command, { stdio: 'inherit' });
  } catch (error) {
    console.error(`Error executing ${command}:`, error);
    process.exit(1);
  }
}

/**
 * Main function to run the setup
 */
async function main() {
  console.log('🚀 Setting up your new project based on guetta-app-kit...\n');
  
  // Collect project information
  const projectName = await prompt('Project name: ');
  const projectDescription = await prompt('Project description: ');
  const authorName = await prompt('Author name: ');
  const authorEmail = await prompt('Author email: ');
  
  console.log('\nUpdating package.json...');
  
  // Read and update package.json
  const packageJsonPath = path.join(process.cwd(), 'package.json');
  const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
  
  packageJson.name = projectName;
  packageJson.description = projectDescription;
  packageJson.author = `${authorName} <${authorEmail}>`;
  packageJson.version = '0.1.0';
  
  fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));
  
  // Initialize git if not already initialized
  if (!fs.existsSync(path.join(process.cwd(), '.git'))) {
    console.log('\nInitializing git repository...');
    execute('git init');
  }
  
  // Install dependencies
  console.log('\nInstalling dependencies...');
  execute('npm install');
  
  // Create .env from .env.example if it doesn't exist
  const envExamplePath = path.join(process.cwd(), '.env.example');
  const envPath = path.join(process.cwd(), '.env');
  
  if (fs.existsSync(envExamplePath) && !fs.existsSync(envPath)) {
    console.log('\nCreating .env file from .env.example...');
    fs.copyFileSync(envExamplePath, envPath);
  }
  
  console.log('\n✅ Setup complete! Your project is ready to go.');
  console.log('\nNext steps:');
  console.log('1. Review the project structure in README.md');
  console.log('2. Check the project-checklist.md for setup tasks');
  console.log('3. Start developing with `npm run dev`');
  
  rl.close();
}

main().catch((error) => {
  console.error('Error during setup:', error);
  process.exit(1);
});
