import unittest
import sys
import os

# Add backend to path
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

from backend.project_runner import cleanGeneratedCode, validateGeneratedCode

class TestSanitizationAndValidation(unittest.TestCase):
    
    def test_html_comments(self):
        dirty_code = """
        <!-- App.jsx -->
        import React from 'react';
        export default function App() {
            return <div>Hello World</div>;
        }
        <!-- End of App.jsx -->
        """
        # Ensure validation fails on dirty code
        self.assertFalse(validateGeneratedCode(dirty_code, "App.jsx"))
        
        # Clean the code
        clean_code = cleanGeneratedCode(dirty_code)
        
        # Validation must pass
        self.assertTrue(validateGeneratedCode(clean_code, "App.jsx"))
        
        # Resulting file must start with import or export
        self.assertTrue(clean_code.startswith("import") or clean_code.startswith("export"))
        self.assertNotIn("<!--", clean_code)
        self.assertNotIn("-->", clean_code)

    def test_markdown_fence(self):
        dirty_code = """
        ```jsx
        import React from 'react';
        export default function App() {
            return <div>Hello World</div>;
        }
        ```
        """
        # Ensure validation fails on dirty code
        self.assertFalse(validateGeneratedCode(dirty_code, "App.jsx"))
        
        # Clean the code
        clean_code = cleanGeneratedCode(dirty_code)
        
        # Validation must pass
        self.assertTrue(validateGeneratedCode(clean_code, "App.jsx"))
        
        # Resulting file must start with import or export
        self.assertTrue(clean_code.startswith("import") or clean_code.startswith("export"))
        self.assertNotIn("```", clean_code)

    def test_filename_headers(self):
        dirty_code_1 = """
        File: App.jsx
        import React from 'react';
        export default function App() {
            return <div>Hello World</div>;
        }
        """
        dirty_code_2 = """
        ### App.jsx
        import React from 'react';
        export default function App() {
            return <div>Hello World</div>;
        }
        """
        dirty_code_3 = """
        Filename: App.jsx
        import React from 'react';
        export default function App() {
            return <div>Hello World</div>;
        }
        """
        # Ensure validation fails on dirty codes
        self.assertFalse(validateGeneratedCode(dirty_code_1, "App.jsx"))
        self.assertFalse(validateGeneratedCode(dirty_code_2, "App.jsx"))
        self.assertFalse(validateGeneratedCode(dirty_code_3, "App.jsx"))
        
        # Clean the codes
        clean_code_1 = cleanGeneratedCode(dirty_code_1)
        clean_code_2 = cleanGeneratedCode(dirty_code_2)
        clean_code_3 = cleanGeneratedCode(dirty_code_3)
        
        # Validation must pass
        self.assertTrue(validateGeneratedCode(clean_code_1, "App.jsx"))
        self.assertTrue(validateGeneratedCode(clean_code_2, "App.jsx"))
        self.assertTrue(validateGeneratedCode(clean_code_3, "App.jsx"))
        
        # Check imports start
        self.assertTrue(clean_code_1.startswith("import") or clean_code_1.startswith("export"))
        self.assertTrue(clean_code_2.startswith("import") or clean_code_2.startswith("export"))
        self.assertTrue(clean_code_3.startswith("import") or clean_code_3.startswith("export"))

        self.assertNotIn("File:", clean_code_1)
        self.assertNotIn("###", clean_code_2)
        self.assertNotIn("Filename:", clean_code_3)

    def test_leading_explanation(self):
        dirty_code = """
        Here is the final React component to render the modern SaaS landing page. It has hero, navbar and footer.
        import React from 'react';
        export default function App() {
            return <div>Hello World</div>;
        }
        """
        # Clean the code
        clean_code = cleanGeneratedCode(dirty_code)
        
        # Validation must pass
        self.assertTrue(validateGeneratedCode(clean_code, "App.jsx"))
        
        # Must start with import
        self.assertTrue(clean_code.startswith("import"))
        self.assertNotIn("Here is the final", clean_code)

if __name__ == '__main__':
    unittest.main()
