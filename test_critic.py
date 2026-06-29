import unittest
import asyncio
import sys
import os

# Add backend to path
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

from backend.services.agents.ui_critic_agent import run_ui_critic

class TestUICriticFrameworkCheck(unittest.TestCase):
    
    def test_run_ui_critic_penalty(self):
        # Create a dummy run where one file has an invalid react-native import
        dummy_files = {
            "App.jsx": "import React from 'react';\nexport default function App() { return <div>Hello</div>; }",
            "CategoryShowcase.jsx": "import { View } from 'react-native';\nexport default function CategoryShowcase() { return <View></View>; }"
        }
        
        # We run the critic (which will fail the LLM step but go to the fallback exception flow)
        loop = asyncio.get_event_loop()
        res = loop.run_until_complete(run_ui_critic(dummy_files))
        
        # Check that the fallback score (8.5) was penalized due to the bad import in CategoryShowcase.jsx
        self.assertIn("issues", res)
        # Should have at least one framework contamination issue
        rn_issues = [iss for iss in res["issues"] if "Framework contamination" in iss]
        self.assertTrue(len(rn_issues) > 0, f"Expected contamination issues, got: {res['issues']}")
        
        # Fallback score is 8.5. With 1 contaminated file, score should be penalized by 2.0 -> 6.5
        self.assertEqual(res["score"], 6.5, f"Expected score to be 6.5, got: {res['score']}")

if __name__ == '__main__':
    unittest.main()
