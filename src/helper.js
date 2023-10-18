

export const wait = () => new Promise(res =>
    setTimeout(res, Math.random() * 1000)
    )


const generateRandomColor = () => {
    const existingBudgetsLength = fetchData("budgets")?. length ?? 0;
    return `${existingBudgetsLength * 64} 60% 20%`
}

// Local storage

export const fetchData = (key) => {
  return JSON.parse(localStorage.getItem(key));
};

export const getAllMatchingItems = ({category, key, value}) => {
  const data = fetchData(category) ?? [];
  return data.filter((item) => item[key] === value);
};




// delete item
export const deleteItem = ({ key, id }) => {
  const existingData = fetchData(key);
  if (id) {
    const newData = existingData.filter((item) => item.id !== id);
    return localStorage.setItem(key, JSON.stringify(newData));
  }
  return localStorage.removeItem(key);
};


export const createBudget = ({
  name, amount
}) => {
  const newItem = {
    id: crypto.randomUUID(),
    name: name,
    createdAt: Date.now(),
    amount: +amount,
    color: generateRandomColor()
  }
  const existingBudgets = fetchData("budgets") ?? [];
  return localStorage.setItem("budgets",
    JSON.stringify([...existingBudgets, newItem]))
}

// create expense
export const createExpense = ({
  name, amount, budgetId
}) => {
  const newItem = {
    id: crypto.randomUUID(),
    name: name,
    createdAt: Date.now(),
    amount: +amount,
    budgetId: budgetId
  }
  const existingExpenses = fetchData("expenses") ?? [];
  return localStorage.setItem("expenses",
    JSON.stringify([...existingExpenses, newItem]))
}

export const calculateSpentByBudget = (budgetId) => {
  const expenses = fetchData("expenses") ?? [];
  const budgetSpent = expenses.reduce((acc, expense) => {
    // check if expense.id === budgetId I passed in
    if (expense.budgetId !== budgetId) return acc

    // add the current amount to my total
    return acc += expense.amount
  }, 0)
  return budgetSpent;
}


export const formatPercentage = (amt) => {
  return amt.toLocaleString(undefined, {
    style: "percent",
    minimumFractionDigits: 0,
  })
}
export const getMainCurrency = () => {
  const maincurrency = localStorage.getItem("maincurrency") || 'CAD';
  return maincurrency.trim().toUpperCase();
};

export const getSecondaryCurrency = () => {
  const secondarycurrency = localStorage.getItem("secondarycurrency") || 'INR';
  return secondarycurrency.trim().toUpperCase();
};

export const formatCurrency = (amt) => {
  const currency = getMainCurrency();
  return amt.toLocaleString(undefined, { style: "currency", currency: "CAD" });
};

export const formatCurrencyChange = (amt) => {
  const currency = getSecondaryCurrency();
  return amt.toLocaleString(undefined, { style: "currency", currency: "INR" });
};




export const formatDateToLocaleString = (epoch) => new Date(epoch).toLocaleDateString();

