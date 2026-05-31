// sandboxHtml.js — Pure string builder. Zero template literals, zero backtick issues.
/* eslint-disable */

function buildSandboxHtml() {
  var BT  = String.fromCharCode(96);  // `
  var BT3 = BT + BT + BT;            // ```

  var head = [
    '<!DOCTYPE html>',
    '<html lang="en">',
    '<head>',
    '  <meta charset="UTF-8">',
    '  <meta name="viewport" content="width=device-width, initial-scale=1.0">',
    '  <title>Babel Sandbox</title>',
    '  <script src="https://unpkg.com/react@18/umd/react.production.min.js" crossorigin><\/script>',
    '  <script src="https://unpkg.com/react-dom@18/umd/react-dom.production.min.js" crossorigin><\/script>',
    '  <script src="https://unpkg.com/@babel/standalone@7/babel.min.js" crossorigin><\/script>',
    '  <script src="https://cdn.tailwindcss.com"><\/script>',
    '  <script src="https://unpkg.com/lucide-react@0.344.0/dist/umd/lucide-react.min.js"><\/script>',
    '  <style>',
    '    *, *::before, *::after { box-sizing: border-box; }',
    '    html, body { margin:0; padding:0; height:100%; }',
    '    body { min-height:100vh; }',
    '    #root { min-height:100vh; }',
    '    #error-overlay {',
    '      display:none; position:fixed; inset:0; z-index:9999; overflow:auto;',
    '      background:rgba(9,9,11,0.97); color:#f43f5e;',
    '      font-family:ui-monospace,SFMono-Regular,Menlo,Monaco,Consolas,monospace;',
    '      padding:32px;',
    '    }',
    '    #error-overlay h3 { margin:0 0 12px; font-size:15px; font-weight:800; color:#ef4444; }',
    '    #error-msg {',
    '      white-space:pre-wrap; font-size:11.5px; line-height:1.7; color:#fecdd3;',
    '      background:#1c0a0a; padding:16px; border-radius:8px;',
    '      border:1px solid rgba(239,68,68,0.2);',
    '    }',
    '  <\/style>',
    '<\/head>',
  ].join('\n');

  var body = [
    '<body>',
    '  <div id="root"><\/div>',
    '  <div id="error-overlay">',
    '    <div style="max-width:820px;margin:0 auto">',
    '      <h3>&#x26A0; Compilation &amp; Runtime Error<\/h3>',
    '      <pre id="error-msg"><\/pre>',
    '    <\/div>',
    '  <\/div>',
  ].join('\n');

  // ── The sandbox runtime script ────────────────────────────────────────────
  // Written as one multi-line plain string — no template literals.
  var script =
    '<script>\n' +

    // Message bridge
    'window.addEventListener("message", function(ev) {\n' +
    '  var d = ev.data || {};\n' +
    '  if (d.type === "RENDER") renderCode(d.code, !!d.loading);\n' +
    '});\n\n' +

    // Error helpers
    'function showError(err) {\n' +
    '  document.getElementById("error-overlay").style.display = "block";\n' +
    '  document.getElementById("error-msg").textContent =\n' +
    '    String(err) + (err && err.stack ? "\\n\\n" + err.stack : "");\n' +
    '}\n' +
    'function hideError() {\n' +
    '  document.getElementById("error-overlay").style.display = "none";\n' +
    '}\n\n' +

    // Fence stripper — BT3 is the literal ``` injected here at build time
    'function stripFences(raw) {\n' +
    '  var s = raw.trim();\n' +
    '  var startRe = new RegExp("^' + BT3 + '(?:jsx|javascript|js|react|tsx|ts)?[^\\\\n]*\\\\n?", "i");\n' +
    '  var endRe   = new RegExp("\\\\n?' + BT3 + '\\\\s*$");\n' +
    '  return s.replace(startRe, "").replace(endRe, "").trim();\n' +
    '}\n\n' +

    // Import stripper
    'function stripImports(code) {\n' +
    '  return code\n' +
    '    .replace(/^import\\s[\\s\\S]*?from\\s[\'"][^\'"]+[\'"]\\s*;?\\s*$/gm, "")\n' +
    '    .replace(/^import\\s*[\'"][^\'"]+[\'"]\\s*;?\\s*$/gm, "")\n' +
    '    .trim();\n' +
    '}\n\n' +

    // Main renderer
    'function renderCode(rawCode, loading) {\n' +
    '  try {\n' +
    '    if (!rawCode || !rawCode.trim()) return;\n' +
    '    var cleaned = stripImports(stripFences(rawCode));\n\n' +

    // Babel transform
    '    var babelResult = Babel.transform(cleaned, {\n' +
    '      presets: ["react", "env"],\n' +
    '      filename: "generated.js"\n' +
    '    });\n' +
    '    var transformed = babelResult.code;\n\n' +

    // Build the execution wrapper — note: transformed is concatenated directly
    '    var preamble = [\n' +
    '      "var {useState,useEffect,useRef,useMemo,useCallback,createContext,useContext,forwardRef} = React;",\n' +
    '      "var LucideReact = window.LucideReact || {};",\n' +
    '      "var exports = {};",\n' +
    '      "var module = {exports: exports};",\n' +
    '      "var require = function(m) {",\n' +
    '      "  if (m===\'react\') return React;",\n' +
    '      "  if (m===\'lucide-react\'||m.startsWith(\'lucide-react\')) return window.LucideReact||{};",\n' +
    '      "  return {};",\n' +
    '      "};"\n' +
    '    ].join("\\n");\n\n' +

    '    var epilogue = [\n' +
    '      "var _exp = exports.default||module.exports.default||module.exports;",\n' +
    '      "var _c = typeof _exp===\'function\' ? _exp : null;",\n' +
    '      "if(!_c && typeof GeneratedPage!==\'undefined\') _c = GeneratedPage;",\n' +
    '      "if(!_c) throw new Error(\'GeneratedPage export not found\');",\n' +
    '      "return _c;"\n' +
    '    ].join("\\n");\n\n' +

    '    var fullCode = preamble + "\\n" + transformed + "\\n" + epilogue;\n\n' +

    '    var Comp = new Function("React", "ReactDOM", fullCode)(React, ReactDOM);\n\n' +

    '    var container = document.getElementById("root");\n' +
    '    if (!window._sbRoot) {\n' +
    '      window._sbRoot = ReactDOM.createRoot(container);\n' +
    '    }\n' +
    '    window._sbRoot.render(React.createElement(Comp));\n' +
    '    hideError();\n' +

    '  } catch(err) {\n' +
    '    console.error("[sandbox]", err);\n' +
    '    if (!loading) showError(err);\n' +
    '  }\n' +
    '}\n' +
    '<\/script>\n';

  return head + '\n' + body + '\n' + script + '\n</body>\n</html>';
}

const SANDBOX_HTML = buildSandboxHtml();
export default SANDBOX_HTML;
