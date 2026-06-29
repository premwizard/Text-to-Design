import unittest
import sys
import os

# Add backend to path
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

from backend.project_runner import cleanGeneratedCode, validateGeneratedCode

def validate_code_bool(code, filename):
    try:
        return validateGeneratedCode(code, filename)
    except ValueError:
        return False

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
        self.assertFalse(validate_code_bool(dirty_code, "App.jsx"))
        
        # Clean the code
        clean_code = cleanGeneratedCode(dirty_code)
        
        # Validation must pass
        self.assertTrue(validate_code_bool(clean_code, "App.jsx"))
        
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
        self.assertFalse(validate_code_bool(dirty_code, "App.jsx"))
        
        # Clean the code
        clean_code = cleanGeneratedCode(dirty_code)
        
        # Validation must pass
        self.assertTrue(validate_code_bool(clean_code, "App.jsx"))
        
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
        self.assertFalse(validate_code_bool(dirty_code_1, "App.jsx"))
        self.assertFalse(validate_code_bool(dirty_code_2, "App.jsx"))
        self.assertFalse(validate_code_bool(dirty_code_3, "App.jsx"))
        
        # Clean the codes
        clean_code_1 = cleanGeneratedCode(dirty_code_1)
        clean_code_2 = cleanGeneratedCode(dirty_code_2)
        clean_code_3 = cleanGeneratedCode(dirty_code_3)
        
        # Validation must pass
        self.assertTrue(validate_code_bool(clean_code_1, "App.jsx"))
        self.assertTrue(validate_code_bool(clean_code_2, "App.jsx"))
        self.assertTrue(validate_code_bool(clean_code_3, "App.jsx"))
        
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
        self.assertTrue(validate_code_bool(clean_code, "App.jsx"))
        
        # Must start with import
        self.assertTrue(clean_code.startswith("import"))
        self.assertNotIn("Here is the final", clean_code)

    def test_lucide_native_repair(self):
        dirty_code = """
        import { Filter, ChevronDown } from 'lucide-react-native';
        export default function App() {
            return <div><Filter /><ChevronDown /></div>;
        }
        """
        clean_code = cleanGeneratedCode(dirty_code)
        self.assertNotIn("lucide-react-native", clean_code)
        self.assertIn("lucide-react", clean_code)
        self.assertTrue(validate_code_bool(clean_code, "App.jsx"))

    def test_react_router_dom_allowed(self):
        dirty_code = """
        import React from 'react';
        import { Link } from 'react-router-dom';
        export default function App() {
            return <div><Link to="/home">Go Home</Link></div>;
        }
        """
        clean_code = cleanGeneratedCode(dirty_code)
        self.assertIn("react-router-dom", clean_code)
        self.assertNotIn("const Link = ", clean_code)
        self.assertTrue(validate_code_bool(clean_code, "App.jsx"))

    def test_next_link_repair(self):
        dirty_code = """
        import React from 'react';
        import Link from 'next/link';
        export default function App() {
            return <div><Link to="/home">Go Home</Link></div>;
        }
        """
        clean_code = cleanGeneratedCode(dirty_code)
        self.assertNotIn("next/link", clean_code)
        self.assertIn("react-router-dom", clean_code)
        self.assertIn("import { Link } from 'react-router-dom';", clean_code)
        self.assertTrue(validate_code_bool(clean_code, "App.jsx"))

    def test_react_native_repair(self):
        dirty_code = """
        import { View, Text } from 'react-native';
        export default function App() {
            return (
                <View style={{flex: 1}}>
                    <Text>Hello</Text>
                </View>
            );
        }
        """
        clean_code = cleanGeneratedCode(dirty_code)
        self.assertNotIn("react-native", clean_code)
        self.assertIn("<div style={{flex: 1}}>", clean_code)
        self.assertIn("<span>Hello</span>", clean_code)
        self.assertIn("</div>", clean_code)
        self.assertIn("</span>", clean_code)
        self.assertTrue(validate_code_bool(clean_code, "App.jsx"))

    def test_validator_fails_on_forbidden_imports(self):
        code_with_rn = """
        import { View } from 'react-native';
        export default function App() { return <div>Hello</div>; }
        """
        self.assertFalse(validate_code_bool(code_with_rn, "App.jsx"))

if __name__ == '__main__':
    unittest.main()
