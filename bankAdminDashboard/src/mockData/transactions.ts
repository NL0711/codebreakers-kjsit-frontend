import { FraudulentTransaction } from '../types';

export const mockTransactions: FraudulentTransaction[] = [
  {
    id: '1',
    transactionId: 'TRX123456',
    amount: 5000,
    date: new Date().toISOString(),
    accountNumber: '1234567890',
    customerName: 'John Doe',
    transactionType: 'Wire Transfer',
    fraudType: 'Unusual Location',
    status: 'pending',
    description: 'Large transfer from unusual location',
    ipAddress: '192.168.1.1',
    location: 'Unknown Location',
    deviceInfo: 'Unknown Device',
  },
  {
    id: '2',
    transactionId: 'TRX789012',
    amount: 10000,
    date: new Date(Date.now() - 86400000).toISOString(), // Yesterday
    accountNumber: '0987654321',
    customerName: 'Jane Smith',
    transactionType: 'ATM Withdrawal',
    fraudType: 'Multiple Attempts',
    status: 'investigating',
    description: 'Multiple failed ATM withdrawal attempts',
    ipAddress: '192.168.1.2',
    location: 'New York, USA',
    deviceInfo: 'ATM Terminal XYZ',
  },
  {
    id: '3',
    transactionId: 'TRX345678',
    amount: 25000,
    date: new Date(Date.now() - 172800000).toISOString(), // 2 days ago
    accountNumber: '5678901234',
    customerName: 'Robert Johnson',
    transactionType: 'Online Purchase',
    fraudType: 'Suspicious Pattern',
    status: 'resolved',
    description: 'Multiple high-value transactions in short time',
    ipAddress: '192.168.1.3',
    location: 'London, UK',
    deviceInfo: 'Chrome on Windows',
  },
]; 