@echo off
title 1Fi SDE1 Assignment - Mutual Fund EMI Platform
echo ========================================================
echo   Starting 1Fi SDE1 Assignment Full-Stack Application
echo ========================================================
echo.

cd /d "%~dp0"

echo [1/3] Installing NPM dependencies...
call npm install

echo.
echo [2/3] Initializing SQLite Database & Seeding Data...
call npx prisma db push
call npx tsx prisma/seed.ts

echo.
echo [3/3] Launching Next.js Web Server on Port 3005...
echo Target URL: http://127.0.0.1:3005/products/iphone-17-pro
echo.

timeout /t 3 /nobreak >nul
start http://127.0.0.1:3005/products/iphone-17-pro

call npm run dev
pause
