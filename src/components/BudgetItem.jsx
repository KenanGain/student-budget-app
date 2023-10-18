import { Form, Link } from "react-router-dom";
import React, { useState, useEffect } from 'react';
import { calculateSpentByBudget, formatCurrency, formatCurrencyChange, formatPercentage, getMainCurrency, getSecondaryCurrency } from "../helper";
import { BanknotesIcon, CreditCardIcon, TrashIcon } from "@heroicons/react/24/solid";


const apiKey = 'b506762540ff72e7e46f22dcf5d5ceaa';

const getUpdatedExchangeRate = async () => {
  try {
    const baseCurrency = 'CAD';
    const targetCurrency = 'INR'; 
      const response = await fetch(`https://api.exchangerate-api.com/v4/latest/${baseCurrency}?access_key=${apiKey}`);
      
      if (!response.ok) {
          const errorText = await response.text();
          throw new Error(`API request failed with status ${response.status}. Response: ${errorText}`);
      }

      const data = await response.json();
      return data.rates[targetCurrency];
  } catch (error) {
      console.error("Error fetching exchange rate:", error);
      return null;
  }
};

const BudgetItem = ({ budget, showDelete = false }) => {

  const [exchangeRate, setExchangeRate] = useState(1);
 
    useEffect(() => {
        const fetchExchangeRate = async () => {
            const rate = await getUpdatedExchangeRate();
            if (rate) setExchangeRate(rate);
        };
        
        fetchExchangeRate();
    }, []);
  
    const { id, name, amount, color } = budget;
    const spent = calculateSpentByBudget(id);
    
    // Cashback calculation logic
    let bestCard = "";
    let bestCashback = 0;

    const CibcCreditCard = {
        Groceries: 0.02,
        Dining: 0.01,
        Transportation: 0.005,
        Billpayment: 0.005,
        Gas: 0.005,
        Medicine: 0.005,
        Other: 0.005
    };

    const BmoCreditcard = {
        Groceries: 0.03,
        Dining: 0.005,
        Transportation: 0.005,
        Billpayment: 0.01,
        Gas: 0.05,
        Medicine: 0.05,
        Other: 0.005 
    };

    const SimpliiCreditcard = {
        Groceries: 0.015,
        Dining: 0.05,
        Transportation: 0.05,
        Billpayment: 0.05,
        Gas: 0.05,
        Medicine: 0.05,
        Other: 0.005
    };

    const TangerineCreditcard = {
        Groceries: 0.02,
        Dining: 0.02,
        Transportation: 0.02,
        Billpayment: 0.02,
        Gas: 0.02,
        Medicine: 0.02,
        Other: 0.005
    };

    const CibcCashback = spent * CibcCreditCard[name];
    if (CibcCashback > bestCashback) {
        bestCard = "Cibc Cashback Card";
        bestCashback = CibcCashback;
    }

    const BmoCashback = spent * BmoCreditcard[name];
    if (BmoCashback > bestCashback) {
        bestCard = "Bmo Cashback Card";
        bestCashback = BmoCashback;
    }

    const SimpliiCashback = spent * SimpliiCreditcard[name];
    if (SimpliiCashback > bestCashback) {
        bestCard = "Simplii Cashback Card";
        bestCashback = SimpliiCashback;
    }

    const TangerineCashback = spent * TangerineCreditcard[name];
    if (TangerineCashback > bestCashback) {
        bestCard = "Tangerine Cashback Card";
        bestCashback = TangerineCashback;
    }
    return (
      <div
        className="budget"
        style={{
          "--accent": color,
        }}
      >
        <div className="progress-text">
          <h3>{name}</h3>
          <p>{formatCurrency(amount)} Budgeted</p>
        </div>
        <progress max={amount} value={spent}>
          {formatPercentage(spent / amount)}
        </progress>
        <div className="progress-text">
          <small>{formatCurrency(spent)} spent</small>
          <small>{formatCurrency(amount - spent)} remaining</small>
          
        </div>
        <div className="progress-text-2">
          <small>{formatCurrencyChange(spent * exchangeRate)} spent</small>

          
          </div>

          
          
        {showDelete ? (
          
          <div className="flex-sm">
            <Form
              method="post"
              action="delete"
              onSubmit={(event) => {
                if (
                  !confirm(
                    "Are you sure you want to permanently delete this budget?"
                  )
                ) {
                  event.preventDefault();
                }
              }}
            > 
           
              <button type="submit" className="btn">
                <span>Delete Budget</span>
                <TrashIcon width={20} />
              </button>
              
            
              
            </Form>
            
            {spent ? (
  <div
     className="flex-sm"
     style={{
       "--accent": color,
     }}
  >
    <div className="budget">
      <h2><CreditCardIcon width={40} /> Credit Card Suggestion</h2>
      <p>{formatCurrency(spent)} spent</p>
      <p>{formatCurrency(bestCashback)} Potential Cashback</p>
      <p><strong>" {bestCard} " </strong>is Best Credit Card for Cashback </p>
    </div>
  </div>
) : null}
            
            
            
          </div>
          

          

          

        ) : (
          <div className="flex-sm">
            <Link to={`/budget/${id}`} className="btn">
              <span>View Details</span>
              <BanknotesIcon width={20} />
            </Link>
          </div>
        )}
      </div>
    );
  };
  export default BudgetItem;