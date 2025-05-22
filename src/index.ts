/**
 * Main application entry point
 */
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

/**
 * Simple hello world function
 * @param name Name to greet
 * @returns Greeting message
 */
export function hello(name: string): string {
  return `Hello, ${name}!`;
}

/**
 * Main function that runs when the application starts
 */
function main(): void {
  const name = process.env.NAME || 'World';
  console.log(hello(name));
}

// Run the main function if this file is executed directly
if (require.main === module) {
  main();
}
