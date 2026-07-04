const parser = require('@babel/parser');
const fs = require('fs');

if (process.argv.length < 3) {
  console.error("Usage: node babel_validator.js <filename>");
  process.exit(1);
}

const filename = process.argv[2];
const code = fs.readFileSync(filename, 'utf-8');

try {
  parser.parse(code, {
    sourceType: 'module',
    plugins: ['jsx', 'typescript', 'dynamicImport', 'classProperties']
  });
  console.log("VALID");
  process.exit(0);
} catch (e) {
  console.error("=".repeat(80));
  console.error("[DEBUG] FULL AST ERROR");
  console.error(`File: ${filename}`);
  console.error(`Error type: ${e.name || typeof e}`);
  console.error(`Error message: ${e.message}`);
  
  if (e.loc) {
    console.error(`Line: ${e.loc.line}`);
    console.error(`Column: ${e.loc.column}`);
    const lines = code.split('\n');
    const errorLine = lines[e.loc.line - 1] || "";
    console.error(`Code at line: ${errorLine}`);
    console.error(`              ${' '.repeat(Math.max(0, e.loc.column))}^`);
  }
  
  if (e.stack) console.error(e.stack);
  console.error("=".repeat(80));
  process.exit(1);
}
