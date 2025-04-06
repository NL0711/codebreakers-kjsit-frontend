import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Box,
  Paper,
  Typography,
  Grid,
  Button,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Alert,
  CircularProgress,
  Chip,
} from '@mui/material';
import { FraudulentTransaction, AdminActionPayload } from '../types';
import { getFraudulentTransactionById, updateTransactionStatus } from '../services/api';

const getRiskColor = (score: number) => {
  if (score >= 70) return 'error';
  if (score >= 40) return 'warning';
  return 'success';
};

export default function TransactionDetails() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [transaction, setTransaction] = useState<FraudulentTransaction | null>(null);
  const [loading, setLoading] = useState(true);
  const [action, setAction] = useState<AdminActionPayload['action']>('investigate');
  const [notes, setNotes] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    const fetchTransaction = async () => {
      try {
        if (!id) return;
        const data = await getFraudulentTransactionById(id);
        setTransaction(data);
      } catch (error) {
        setError('Failed to fetch transaction details');
      } finally {
        setLoading(false);
      }
    };

    fetchTransaction();
  }, [id]);

  const handleSubmitAction = async () => {
    try {
      if (!id) return;
      await updateTransactionStatus(id, { action, notes });
      setSuccess('Action taken successfully');
      if (action === 'block') {
        setTimeout(() => navigate('/'), 2000);
      } else {
        // Refresh transaction data
        const updatedTransaction = await getFraudulentTransactionById(id);
        setTransaction(updatedTransaction);
      }
    } catch (error) {
      setError('Failed to update transaction status');
    }
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="80vh">
        <CircularProgress />
      </Box>
    );
  }

  if (!transaction) {
    return (
      <Box p={3}>
        <Alert severity="error">Transaction not found</Alert>
        <Button variant="contained" onClick={() => navigate('/')} sx={{ mt: 2 }}>
          Back to Dashboard
        </Button>
      </Box>
    );
  }

  return (
    <Box p={3}>
      <Button variant="outlined" onClick={() => navigate('/')} sx={{ mb: 3 }}>
        Back to Dashboard
      </Button>

      <Typography variant="h4" gutterBottom>
        Transaction Details
      </Typography>

      <Paper sx={{ p: 3, mb: 3 }}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Typography variant="subtitle2">Transaction ID</Typography>
            <Typography variant="body1">{transaction.transaction_details.transaction_id}</Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography variant="subtitle2">Amount</Typography>
            <Typography variant="body1">${transaction.amount.toLocaleString()}</Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography variant="subtitle2">Risk Score</Typography>
            <Chip
              label={`${transaction.risk_score}%`}
              color={getRiskColor(transaction.risk_score)}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography variant="subtitle2">Confidence</Typography>
            <Typography variant="body1">{(transaction.confidence * 100).toFixed(1)}%</Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography variant="subtitle2">Timestamp</Typography>
            <Typography variant="body1">{new Date(transaction.timestamp).toLocaleString()}</Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography variant="subtitle2">Merchant Code</Typography>
            <Typography variant="body1">{transaction.merchant_code}</Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography variant="subtitle2">Device ID</Typography>
            <Typography variant="body1">{transaction.device_info.device_id}</Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography variant="subtitle2">IP Address</Typography>
            <Typography variant="body1">{transaction.device_info.ip_address}</Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h6" sx={{ mt: 2, mb: 1 }}>Risk Factors</Typography>
            <Grid container spacing={1}>
              {transaction.risk_factors.map((factor, index) => (
                <Grid item key={index}>
                  <Chip
                    label={factor.factor}
                    color={factor.severity === 'high' ? 'error' : factor.severity === 'medium' ? 'warning' : 'default'}
                    sx={{ mr: 1 }}
                  />
                </Grid>
              ))}
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h6" sx={{ mt: 2, mb: 1 }}>Transaction Analysis</Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} md={4}>
                <Typography variant="subtitle2">Amount vs Average</Typography>
                <Typography variant="body1">{transaction.transaction_details.amount_vs_average.toFixed(2)}x</Typography>
              </Grid>
              <Grid item xs={12} md={4}>
                <Typography variant="subtitle2">Has Shipping</Typography>
                <Typography variant="body1">{transaction.transaction_details.has_shipping ? 'Yes' : 'No'}</Typography>
              </Grid>
              <Grid item xs={12} md={4}>
                <Typography variant="subtitle2">Hour of Day</Typography>
                <Typography variant="body1">{transaction.transaction_details.hour_of_day}:00</Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Paper>

      <Paper sx={{ p: 3 }}>
        <Typography variant="h6" gutterBottom>
          Take Action
        </Typography>
        {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
        {success && <Alert severity="success" sx={{ mb: 2 }}>{success}</Alert>}
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <FormControl fullWidth>
              <InputLabel>Action</InputLabel>
              <Select
                value={action}
                label="Action"
                onChange={(e) => setAction(e.target.value as AdminActionPayload['action'])}
              >
                <MenuItem value="investigate">Investigate Further</MenuItem>
                <MenuItem value="block">Block Transaction</MenuItem>
                <MenuItem value="clear">Clear as Safe</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              multiline
              rows={4}
              label="Notes"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Add your notes about this action..."
            />
          </Grid>
          <Grid item xs={12}>
            <Button
              variant="contained"
              onClick={handleSubmitAction}
              disabled={!notes}
              color={action === 'block' ? 'error' : action === 'clear' ? 'success' : 'primary'}
            >
              Submit Action
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
} 