export default function RecentTransactions() {
  const transactions = [
    {
      id: "tx1",
      date: "2023-04-15",
      description: "ATM Withdrawal",
      amount: -5000,
      type: "debit",
    },
    {
      id: "tx2",
      date: "2023-04-14",
      description: "Salary Credit",
      amount: 45000,
      type: "credit",
    },
    {
      id: "tx3",
      date: "2023-04-12",
      description: "Electric Bill Payment",
      amount: -2500,
      type: "debit",
    },
    {
      id: "tx4",
      date: "2023-04-10",
      description: "Fund Transfer to Rahul",
      amount: -1500,
      type: "debit",
    },
    {
      id: "tx5",
      date: "2023-04-08",
      description: "Amazon Purchase",
      amount: -3200,
      type: "debit",
    },
  ]

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-bold mb-4">Recent Transactions</h2>

      <div className="overflow-hidden">
        <table className="min-w-full">
          <thead>
            <tr className="border-b">
              <th className="text-left py-2">Date</th>
              <th className="text-left py-2">Description</th>
              <th className="text-right py-2">Amount</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((tx) => (
              <tr key={tx.id} className="border-b">
                <td className="py-2 text-sm">{tx.date}</td>
                <td className="py-2 text-sm">{tx.description}</td>
                <td className={`py-2 text-sm text-right ${tx.type === "credit" ? "text-green-600" : "text-red-600"}`}>
                  {tx.type === "credit" ? "+" : "-"}₹{Math.abs(tx.amount).toLocaleString("en-IN")}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-4 text-center">
        <button className="text-purple-900 hover:underline text-sm">View All Transactions</button>
      </div>
    </div>
  )
}