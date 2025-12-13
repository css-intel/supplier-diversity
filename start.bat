@echo off
REM Start Supplier Diversity and Inclusion Platform
cd /d "C:\Users\CSS\OneDrive\Desktop\CSS\supplier-diversity"

echo Starting Supplier Diversity and Inclusion Dev Server...
echo.
echo Waiting for server to start (this may take 10-15 seconds)...
echo.

start npm run dev

timeout /t 5 /nobreak

REM Try to open in browser
echo.
echo Opening platform in your browser...
start http://localhost:3001

echo.
echo If the page doesn't open automatically, visit:
echo http://localhost:3001
echo.
echo Press Ctrl+C to stop the server
pause
