import { useState, useEffect } from 'react';
import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Button,
  Chip,
  CircularProgress,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { FraudulentTransaction } from '../types';
import { getFraudulentTransactions } from '../services/api';

const getRiskColor = (score: number) => {
  if (score >= 70) return 'error';
  if (score >= 40) return 'warning';
  return 'success';
};

export default function Dashboard() {
  const [transactions, setTransactions] = useState<FraudulentTransaction[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const data = await getFraudulentTransactions();
        setTransactions(data);
      } catch (error) {
        console.error('Error fetching transactions:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTransactions();
  }, []);

  const handleViewDetails = (id: string) => {
    navigate(`/transaction/${id}`);
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="80vh">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box p={3}>
      <Typography variant="h4" gutterBottom>
        Fraudulent Transactions Dashboard
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Transaction ID</TableCell>
              <TableCell>Amount</TableCell>
              <TableCell>Risk Score</TableCell>
              <TableCell>Merchant</TableCell>
              <TableCell>Timestamp</TableCell>
              <TableCell>High Risk Factors</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {transactions.map((transaction) => (
              <TableRow key={transaction.id}>
                <TableCell>{transaction.transaction_details.transaction_id}</TableCell>
                <TableCell>${transaction.amount.toLocaleString()}</TableCell>
                <TableCell>
                  <Chip
                    label={`${transaction.risk_score}%`}
                    color={getRiskColor(transaction.risk_score)}
                    size="small"
                  />
                </TableCell>
                <TableCell>{transaction.merchant_code}</TableCell>
                <TableCell>
                  {new Date(transaction.timestamp).toLocaleString()}
                </TableCell>
                <TableCell>
                  {transaction.risk_factors
                    .filter(factor => factor.severity === 'high')
                    .map(factor => (
                      <Chip
                        key={factor.factor}
                        label={factor.factor}
                        size="small"
                        color="error"
                        sx={{ mr: 1, mb: 1 }}
                      />
                    ))}
                </TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    size="small"
                    onClick={() => handleViewDetails(transaction.id)}
                  >
                    View Details
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
} 