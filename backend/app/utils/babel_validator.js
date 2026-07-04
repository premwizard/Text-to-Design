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
    plugins: ['jsx', 'classProperties', 'dynamicImport']
  });
  console.log("VALID");
  process.exit(0);
} catch (e) {
  const line = e.loc ? e.loc.line : 'unknown';
  const column = e.loc ? e.loc.column : 'unknown';
  console.error(`Parser Error: ${e.message}`);
  console.error(`Line: ${line}, Column: ${column}`);
  process.exit(1);
}
