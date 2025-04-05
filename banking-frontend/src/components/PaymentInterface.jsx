import React from 'react';
import { Link } from 'react-router-dom';

const PaymentInterface = () => {
  const partners = [
    ['FORA', 'RE/MAX', 'ticketmaster'],
    ['VRBO', 'Stratacomm', 'PRIZEPICKS'],
    ['ETHOS', 'veho', 'POSTAL']
  ];

  const invoice = {
    number: '02457',
    company: 'Apex Financials',
    items: [
      { description: 'Service Apr - May', qty: 250, rate: 82.00, amount: 20500.00 },
      { description: 'Service May - June', qty: 150, rate: 82.00, amount: 12300.00 },
      { description: 'Service June - July', qty: 200, rate: 82.00, amount: 16400.00 }
    ],
    subtotal: 49200.00,
    tax: 3284.13,
    total: 52484.13
  };

  const actionItems = [
    { title: 'Bill details', icon: '•', active: true },
    { title: 'PO matched', icon: '•', active: true },
    { title: 'Payment details', icon: '•', active: false },
    { title: 'Payable approvals', icon: '•', active: false },
    { title: 'Schedule payment', icon: '•', active: false }
  ];

  return (
    <div className="min-h-screen bg-[#0D191E] relative overflow-hidden">
      {/* Background gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 to-transparent"></div>

      {/* Navigation */}
      <nav className="relative z-10 px-8 py-4 flex justify-between items-center">
        <div className="text-white text-2xl font-semibold">Routable</div>
        <div className="flex items-center gap-8 text-gray-300 text-sm">
          <a href="#" className="hover:text-white">Product</a>
          <a href="#" className="hover:text-white">Solutions</a>
          <a href="#" className="hover:text-white">Developers</a>
          <a href="#" className="hover:text-white">Customers</a>
          <a href="#" className="hover:text-white">Resources</a>
          <a href="#" className="hover:text-white">Pricing</a>
          <Link to="/login" className="hover:text-white">Log in</Link>
          <Link 
            to="/login" 
            className="bg-white text-gray-900 px-4 py-2 rounded-lg hover:bg-gray-100"
          >
            Request a demo
          </Link>
        </div>
      </nav>

      {/* Main Content */}
      <div className="container mx-auto px-8">
        {/* Hero Section */}
        <div className="mt-20 mb-32">
          <h1 className="text-7xl font-serif text-white leading-tight mb-6">
            International<br />payments, <span className="text-gray-400 font-serif">solved</span>
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mb-8">
            Automate invoice processing and payments, onboard vendors seamlessly, customize approval flows, and more — for 30% less.
          </p>
          <Link 
            to="/login" 
            className="inline-block bg-[#4945FF] text-white px-6 py-3 rounded-lg hover:bg-[#3a3fd9] transition-colors"
          >
            Request a demo
          </Link>

          {/* Partner Logos */}
          <div className="mt-24 grid grid-cols-3 gap-x-32 gap-y-12 max-w-4xl">
            {partners.map((row, rowIndex) => (
              <div key={rowIndex} className="flex justify-between items-center">
                {row.map((partner, index) => (
                  <span key={index} className="text-gray-400 text-sm font-medium tracking-wider uppercase">
                    {partner}
                  </span>
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* Invoice Card */}
        <div className="bg-white rounded-xl shadow-xl overflow-hidden">
          <div className="flex justify-between items-center p-4 border-b border-gray-200">
            <div className="flex items-center gap-2">
              <h2 className="text-gray-900 font-medium">Invoice #{invoice.number}</h2>
              <span className="text-gray-400">•</span>
              <span className="text-[#4945FF]">NetSuite connected</span>
            </div>
            <div className="flex items-center gap-4">
              <button className="text-gray-500 hover:text-gray-700">Delete bill</button>
              <button className="text-gray-500 hover:text-gray-700">Cancel</button>
              <button className="bg-[#4945FF] text-white px-4 py-2 rounded-lg hover:bg-[#3a3fd9]">
                Create AP for Approval
              </button>
            </div>
          </div>

          <div className="grid grid-cols-[2fr,1fr] gap-6 p-6">
            {/* Left side - Invoice Details */}
            <div className="bg-gray-50 rounded-lg p-6">
              <div className="mb-8">
                <h3 className="text-xl font-medium text-gray-900">{invoice.company}</h3>
                <div className="mt-4 grid grid-cols-2 gap-4 text-sm text-gray-600">
                  <div>
                    <p>Bill to:</p>
                    <p>123 Main St.</p>
                    <p>Suite 100</p>
                    <p>San Francisco, CA 94105</p>
                  </div>
                  <div className="text-right">
                    <p>Invoice details</p>
                    <p>PO: 12345</p>
                    <p>Due: Net 30</p>
                    <p>Terms: Net 30</p>
                  </div>
                </div>
              </div>

              <table className="w-full">
                <thead>
                  <tr className="text-left text-gray-600 border-b border-gray-300">
                    <th className="py-2">Item</th>
                    <th className="py-2 text-right">Qty</th>
                    <th className="py-2 text-right">Rate</th>
                    <th className="py-2 text-right">Amount</th>
                  </tr>
                </thead>
                <tbody>
                  {invoice.items.map((item, index) => (
                    <tr key={index} className="border-b border-gray-200">
                      <td className="py-3">{item.description}</td>
                      <td className="py-3 text-right">{item.qty}</td>
                      <td className="py-3 text-right">${item.rate.toFixed(2)}</td>
                      <td className="py-3 text-right">${item.amount.toFixed(2)}</td>
                    </tr>
                  ))}
                </tbody>
                <tfoot className="text-gray-600">
                  <tr>
                    <td colSpan="3" className="pt-4 text-right">Subtotal</td>
                    <td className="pt-4 text-right">${invoice.subtotal.toFixed(2)}</td>
                  </tr>
                  <tr>
                    <td colSpan="3" className="pt-2 text-right">Tax</td>
                    <td className="pt-2 text-right">${invoice.tax.toFixed(2)}</td>
                  </tr>
                  <tr className="font-medium">
                    <td colSpan="3" className="pt-2 text-right">Total</td>
                    <td className="pt-2 text-right">${invoice.total.toFixed(2)}</td>
                  </tr>
                </tfoot>
              </table>
            </div>

            {/* Right side - Action Items */}
            <div className="space-y-3">
              {actionItems.map((item, index) => (
                <div
                  key={index}
                  className={`p-4 rounded-lg flex items-center gap-3 ${
                    item.active ? 'bg-[#4945FF]/5' : 'bg-gray-50'
                  }`}
                >
                  <span className={`text-2xl ${
                    item.active ? 'text-[#4945FF]' : 'text-gray-400'
                  }`}>
                    {item.icon}
                  </span>
                  <span className={item.active ? 'text-[#4945FF]' : 'text-gray-600'}>
                    {item.title}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div className="grid grid-cols-3 gap-8 mt-16 mb-16">
          <div>
            <h3 className="text-white text-lg font-medium mb-2">Faster payments for less</h3>
            <p className="text-gray-400">
              Pay hundreds of thousands of vendors around the world 2X faster and for 30% less than competitors.
            </p>
          </div>
          <div>
            <h3 className="text-white text-lg font-medium mb-2">We work the way you work</h3>
            <p className="text-gray-400">
              You know your business best. Adapt workflows to perfectly mirror your company's unique requirements.
            </p>
          </div>
          <div>
            <h3 className="text-white text-lg font-medium mb-2">Stress-free compliance and controls</h3>
            <p className="text-gray-400">
              Comply with internal controls and industry regulations with simplified processes and audit-ready data.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentInterface; 