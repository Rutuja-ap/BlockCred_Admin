@echo off
cd /d E:\Projects\Admin_backend_BlockChain
call ganache --database.dbPath E:\Projects\Admin_backend_BlockChain\ganache-data-new --wallet.unlockedAccounts 0x3b8f3761A7654aaE10E90871D5A269953a9bA358 --chain.chainId 1337 --server.port 8545
pause