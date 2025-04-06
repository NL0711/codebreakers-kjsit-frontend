export interface RiskFactor {
  factor: string;
  severity: 'high' | 'medium' | 'low';
  weight: number;
}

export interface TransactionDetails {
  amount_vs_average: number;
  has_shipping: boolean;
  hour_of_day: number;
  login_time_diff: number;
  payment_age: number;
  recent_transactions: number;
  transaction_id: string;
}

export interface DeviceInfo {
  device_id: string;
  ip_address: string;
}

export interface FraudulentTransaction {
  id: string;
  amount: number;
  confidence: number;
  device_info: DeviceInfo;
  merchant_code: string;
  risk_factors: RiskFactor[];
  risk_score: number;
  timestamp: string;
  transaction_details: TransactionDetails;
}

export interface AdminAction {
  id: string;
  transactionId: string;
  action: 'block' | 'investigate' | 'clear';
  timestamp: string;
  notes: string;
  adminId: string;
}

export interface AdminActionPayload {
  action: AdminAction['action'];
  notes: string;
} 