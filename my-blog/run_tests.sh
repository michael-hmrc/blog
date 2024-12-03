#!/bin/bash

# Function to display usage instructions
usage() {
    echo "Usage: $0 [test-file]"
    echo "  If no test file is provided, all tests will be run."
}

# Check if npm is installed
if ! command -v npm &> /dev/null
then
    echo "npm is not installed. Please install npm and try again."
    exit 1
fi

# Check if a specific test file was provided
if [ $# -eq 1 ]; then
    TEST_FILE=$1
    if [ ! -f "$TEST_FILE" ]; then
        echo "Test file '$TEST_FILE' does not exist."
        usage
        exit 1
    fi
    echo "Running tests for file: $TEST_FILE"
    npm test -- "$TEST_FILE"
else
    echo "No specific test file provided. Running all tests..."
    npm test
fi

# Capture the exit status of the npm test command
EXIT_STATUS=$?

# Check if the tests passed or failed
if [ $EXIT_STATUS -eq 0 ]; then
    echo "Tests passed successfully! 🎉"
else
    echo "Some tests failed. Please check the output above. ❌"
    exit $EXIT_STATUS
fi
