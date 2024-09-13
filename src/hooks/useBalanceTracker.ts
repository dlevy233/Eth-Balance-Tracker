// src/hooks/useBalanceTracker.ts
import { useEffect } from 'react';
import { createPublicClient, http, Address } from 'viem';
import { base } from 'viem/chains'; // Base network configuration

const client = createPublicClient({
  chain: base,
  transport: http('https://developer.base.org/rpc'), // Replace with your Base RPC URL
});

export function useBalanceTracker(address: Address, interval: number) {
  useEffect(() => {
    if (!address) return;

    const fetchBalance = async () => {
      try {
        const balance = await client.getBalance({ address });
        const entry = {
          timestamp: Date.now(),
          balance: balance.toString(),
        };
        const data = JSON.parse(localStorage.getItem('balanceData') || '[]');
        data.push(entry);
        localStorage.setItem('balanceData', JSON.stringify(data));
      } catch (error) {
        console.error('Error fetching balance:', error);
      }
    };

    fetchBalance(); // Fetch immediately on start
    const timer = setInterval(fetchBalance, interval);

    return () => clearInterval(timer);
  }, [address, interval]);
}
