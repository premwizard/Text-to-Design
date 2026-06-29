import asyncio
from backend.validators.jsx_validator import validate_generated_code

async def main():
    print("Testing pure Python JSX validation engine...\n")
    
    mock_files = [
        {
            "filename": "Hero.jsx",
            "content": """
import React from 'react';
import { Camera } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Hero() {
    return (
        <div>
            <h1>Hello
            <img src="test.jpg" />
        </div>
    );
}
"""
        },
        {
            "filename": "Valid.jsx",
            "content": """
import React from 'react';
import { Camera } from 'lucide-react';

export const Valid = () => {
    return (
        <div>
            <h1>Valid</h1>
            <input type="text" />
            <br />
        </div>
    );
};
"""
        },
        {
            "filename": "NoExport.jsx",
            "content": """
import React from 'react';
function Missing() { return <div></div>; }
"""
        }
    ]
    
    result = validate_generated_code(mock_files)
    
    print(f"Validation Score: {result.get('score')}")
    print(f"Is Valid: {result.get('valid')}")
    print("\nErrors Found:")
    for err in result.get('errors', []):
        print(f"- [{err['file']}] {err['type']}: {err['message']}")
        
if __name__ == "__main__":
    asyncio.run(main())
