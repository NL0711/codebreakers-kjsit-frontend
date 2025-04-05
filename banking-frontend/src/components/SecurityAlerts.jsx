import { useState, useEffect } from 'react';
import { Shield, AlertTriangle, Lock } from 'lucide-react';
import { initializeApp } from 'firebase/app';
import { getDatabase, ref, onValue } from 'firebase/database';

// Initialize Firebase with credentials from file
const app = initializeApp({
  databaseURL: 'https://codebreakers-levelup-default-rtdb.asia-southeast1.firebasedatabase.app'
});
const database = getDatabase(app);

export default function SecurityAlerts() {
  const [alerts, setAlerts] = useState([]);
  const [actions, setActions] = useState([]);

  useEffect(() => {
    // Listen to Firebase fraudulent transactions
    const fraudRef = ref(database, 'fraudulent_transactions');
    const actionsRef = ref(database, 'transaction_actions');

    const unsubscribeFraud = onValue(fraudRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const alerts = Object.values(data)
          .map(transaction => ({
            type: 'fraud',
            timestamp: new Date(transaction.timestamp),
            amount: transaction.amount,
            risk_score: transaction.risk_score,
            risk_factors: transaction.risk_factors,
            merchant_code: transaction.merchant_code,
            device_info: transaction.device_info,
            transaction_id: transaction.transaction_id
          }))
          .sort((a, b) => b.timestamp - a.timestamp);
        setAlerts(alerts);
      }
    });

    const unsubscribeActions = onValue(actionsRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const actionsList = Object.values(data)
          .map(action => ({
            type: 'action',
            timestamp: new Date(action.timestamp),
            action: action.action,
            adminId: action.adminId,
            notes: action.notes,
            transaction_id: action.transactionId
          }))
          .sort((a, b) => b.timestamp - a.timestamp);
        setActions(actionsList);
      }
    });

    // Cleanup Firebase listeners
    return () => {
      unsubscribeFraud();
      unsubscribeActions();
    };
  }, []);

  // Combine and sort alerts and actions
  const combinedAlerts = [...alerts, ...actions]
    .sort((a, b) => b.timestamp - a.timestamp)
    .slice(0, 5); // Show only latest 5 items

  return (
    <div className="bg-[#0D191E] bg-opacity-40 p-6 rounded-xl space-y-4">
      {combinedAlerts.length === 0 ? (
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-yellow-500/20 rounded-full flex items-center justify-center">
            <Shield className="w-6 h-6 text-yellow-500" />
          </div>
          <div>
            <h3 className="font-semibold">Monitoring Active</h3>
            <p className="text-gray-400">Watching for suspicious activities</p>
          </div>
        </div>
      ) : (
        combinedAlerts.map((item, index) => (
          <div key={index} className="flex items-center gap-4">
            {item.type === 'fraud' ? (
              <div className="w-12 h-12 bg-red-500/20 rounded-full flex items-center justify-center">
                <AlertTriangle className="w-6 h-6 text-red-500" />
              </div>
            ) : (
              <div className="w-12 h-12 bg-blue-500/20 rounded-full flex items-center justify-center">
                <Lock className="w-6 h-6 text-blue-500" />
              </div>
            )}
            <div>
              {item.type === 'fraud' ? (
                <>
                  <h3 className="font-semibold">High Risk Transaction Detected</h3>
                  <p className="text-gray-400">
                    Amount: ${item.amount.toFixed(2)} - Risk Score: {item.risk_score}
                    {item.merchant_code && ` - Merchant: ${item.merchant_code}`}
                  </p>
                  {item.risk_factors && item.risk_factors.length > 0 && (
                    <p className="text-gray-400 text-sm">
                      Risk Factor: {item.risk_factors[0].factor}
                    </p>
                  )}
                  {item.device_info && (
                    <p className="text-gray-400 text-xs">
                      Device: {item.device_info.device_id}
                    </p>
                  )}
                </>
              ) : (
                <>
                  <h3 className="font-semibold">Admin Action Taken</h3>
                  <p className="text-gray-400">
                    Action: {item.action} by {item.adminId}
                  </p>
                  {item.notes && (
                    <p className="text-gray-400 text-sm">
                      Notes: {item.notes}
                    </p>
                  )}
                </>
              )}
              <p className="text-sm text-gray-500">
                {item.timestamp.toLocaleString()}
              </p>
            </div>
          </div>
        ))
      )}
    </div>
  );
} 