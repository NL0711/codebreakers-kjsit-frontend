import { ref, get, set, push, child } from 'firebase/database';
import { db } from '../config/firebase';
import { FraudulentTransaction, AdminActionPayload } from '../types';

export const getFraudulentTransactions = async (): Promise<FraudulentTransaction[]> => {
  const transactionsRef = ref(db, 'fraudulent_transactions');
  const snapshot = await get(transactionsRef);
  
  if (!snapshot.exists()) {
    return [];
  }

  const transactions = Object.entries(snapshot.val()).map(([id, data]) => ({
    id,
    ...(data as Omit<FraudulentTransaction, 'id'>),
  }));

  return transactions;
};

export const getFraudulentTransactionById = async (id: string): Promise<FraudulentTransaction> => {
  const transactionRef = ref(db, `fraudulent_transactions/${id}`);
  const snapshot = await get(transactionRef);
  
  if (!snapshot.exists()) {
    throw new Error('Transaction not found');
  }

  return {
    id,
    ...snapshot.val(),
  };
};

export const updateTransactionStatus = async (
  transactionId: string,
  actionPayload: AdminActionPayload
) => {
  const actionsRef = ref(db, 'transaction_actions');
  const newActionRef = push(actionsRef);
  
  await set(newActionRef, {
    transactionId,
    action: actionPayload.action,
    notes: actionPayload.notes,
    timestamp: new Date().toISOString(),
    adminId: 'admin', // Replace with actual admin ID when auth is implemented
  });

  // Update transaction status
  const transactionRef = ref(db, `fraudulent_transactions/${transactionId}`);
  const snapshot = await get(transactionRef);
  
  if (!snapshot.exists()) {
    throw new Error('Transaction not found');
  }

  // If action is 'block', remove the transaction from the database
  if (actionPayload.action === 'block') {
    await set(transactionRef, null);
  }

  return { success: true };
};

export async function analyzeBankStatement(formData: FormData) {
  try {
    const response = await fetch('YOUR_BACKEND_API_URL/analyze-statement', {
      method: 'POST',
      body: formData,
    });
    
    if (!response.ok) {
      throw new Error('Failed to analyze bank statement');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error analyzing bank statement:', error);
    throw error;
  }
} 