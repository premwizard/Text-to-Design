# Use Python base image
FROM python:3.11-slim

# Install Node.js and NPM (needed for dynamic esbuild compilation)
RUN apt-get update && apt-get install -y \
    curl \
    gnupg \
    && curl -fsSL https://deb.nodesource.com/setup_20.x | bash - \
    && apt-get install -y nodejs \
    && rm -rf /var/lib/apt/lists/*

# Set working directory
WORKDIR /app

# Copy backend requirements and install them
COPY backend/requirements.txt ./backend/requirements.txt
RUN pip install --no-cache-dir -r ./backend/requirements.txt

# Copy the entire workspace code
COPY . .

# Pre-install sandbox Node modules so esbuild is locally available and fast
WORKDIR /app/sandbox
RUN npm install

# Return to application directory
WORKDIR /app

# Expose port 8000
EXPOSE 8000

# Start the FastAPI server using uvicorn
CMD ["uvicorn", "backend.main:app", "--host", "0.0.0.0", "--port", "8000"]
