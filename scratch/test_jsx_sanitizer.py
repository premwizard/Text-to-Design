import sys
import os
import asyncio

# Add backend to path
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from backend.utils.jsx_sanitizer import sanitize_regex

def test_sanitize_regex():
    # 1. Test removing font fragments
    dirty_1 = 'className="relative py-24"DM_Sans\'] bg-zinc-900"'
    clean_1 = sanitize_regex(dirty_1, "App.jsx")
    print("Test 1 Result:", clean_1)
    
    # 2. Test merging stray classes
    # Wait, the first one will become: className="relative py-24" bg-zinc-900"
    # Then it should merge it.
    
    dirty_2 = 'className="abc" "def"'
    clean_2 = sanitize_regex(dirty_2, "App.jsx")
    print("Test 2 Result:", clean_2)
    
    dirty_3 = 'className="abc"bg-black"'
    clean_3 = sanitize_regex(dirty_3, "App.jsx")
    print("Test 3 Result:", clean_3)

async def test_validate_ast():
    from backend.utils.jsx_sanitizer import validate_ast
    
    valid_jsx = """
    export default function App() {
        return <div className="test">Hello</div>;
    }
    """
    
    invalid_jsx = """
    export default function App() {
        return <div className="test">Hello<;
    }
    """
    
    print("Testing valid JSX...")
    is_valid_1 = await validate_ast(valid_jsx, "Valid.jsx")
    print("Valid JSX Result:", is_valid_1)
    
    print("Testing invalid JSX...")
    is_valid_2 = await validate_ast(invalid_jsx, "Invalid.jsx")
    print("Invalid JSX Result:", is_valid_2)

if __name__ == "__main__":
    test_sanitize_regex()
    asyncio.run(test_validate_ast())
