import { Link, json, useLoaderData } from "react-router-dom";
import { createBudget, createExpense, deleteItem, fetchData, wait } from "../helper";
import Intro from "../components/Intro";
import { toast } from "react-toastify";
import AddBudgetForm from "../components/AddBudgetForm";
import AddExpenseForm from "../components/AddExpeseForm";
import BudgetItem from "../components/BudgetItem";
import Table from "../components/Table";
import Login from "../components/login";
import { useState } from "react";
import axios from "axios";




export function dashboardLoader() {
  const userName = fetchData("userName");
  const budgets = fetchData("budgets");
  const expenses = fetchData("expenses");
  return { userName, budgets, expenses };
}

export async function dashboardAction({request}) {
  await wait();

  const data = await request.formData();
  const { _action, ...values } = Object.fromEntries(data);
  let result = null;

  if (_action === "createUser") {
    try {
      localStorage.setItem("userName", JSON.stringify(values.userName));
      localStorage.setItem("password",  JSON.stringify(values.password)); // Storing plaintext password in local storage is not recommended for security reasons
      // localStorage.setItem("maincurrency",  "CAD");
      // localStorage.setItem("secondarycurrency",  "INR");
      toast.success(`Welcome, ${values.userName}`);
    } catch (e) {
      toast.error("Error while registering user.");
    }
  }

  if (_action === "login") {
    const storedUsername = localStorage.getItem("userName",  JSON.stringify(values.userName));
    const storedPassword = localStorage.getItem("password",  JSON.stringify(values.password)); 

    if (storedUsername === values.userName && storedPassword === values.password) {
      toast.success("Login Successful!");
      return { success: true, user: values.userName };
    } else {
      toast.error("Invalid login credentials.");
      return { success: false };
    }
  }
  
    if (_action === "createBudget") {
      try {
        createBudget({
          name: values.newBudget,
          amount: values.newBudgetAmount,
        })
        return toast.success("Budget created!")
      } catch (e) {
        toast.error("There was a problem creating your budget.");

      }
    }
  
    if (_action === "createExpense") {
      try {
        createExpense({
          name: values.newExpense,
          amount: values.newExpenseAmount,
          budgetId: values.newExpenseBudget
        })
        return toast.success(`Expense ${values.newExpense} created!`)
      } catch (e) {
        toast.error("There was a problem creating your expense.");
      }
    }
    if (_action === "deleteExpense") {
      try {
        deleteItem({
          key: "expenses",
          id: values.expenseId,
        });
        return toast.success("Expense deleted!");
      } catch (e) {
        toast.error("There was a problem deleting your expense.");
      }
    }
  
    // Default return if no other conditions are met.
    return result;
  }  
  
  
  const Dashboard = () => {
    const [showLogin, setShowLogin] = useState(false);
    const { userName, budgets, expenses } = useLoaderData();
  
    return (
      <>
        {userName ? (
          <div className="dashboard">
            <h1>Welcome back, <span className="accent">{userName}</span></h1>
            <div className="grid-sm">
              {
                budgets && budgets.length > 0
                  ? (
                    <div className="grid-lg">
                      <div className="flex-lg">
                        <AddBudgetForm />
                        <AddExpenseForm budgets={budgets} />
                      </div>
                      <h2>Existing Budgets</h2>
                      <div className="budgets">
                        {
                          budgets.map((budget) => (
                            <BudgetItem key={budget.id} budget={budget} />
                          ))
                        }
                      </div>
                      {
                        expenses && expenses.length >
                        0 && (
                            <div className="grid-md">
                                <h2>Recent Expenses</h2>
                                <Table expenses={expenses.sort((a, b) => b.createdAt - a.createdAt)
                                .slice(0, 8)
                                }/>
                                {expenses.length > 8 && (
                                    <Link
                                    to="expenses"
                                    className="btn btn--dark">
                                        View all expenses
                                    </Link>
                                )}
                                </div>
                        )
                      }
                    </div>
                  )
                  : (
                    <div className="grid-sm">
                      <p>Personal budgeting is the secret to financial freedom.</p>
                      <p>Create a budget to get started!</p>
                      <AddBudgetForm />
                    </div>
                  )
              }
            </div>
          </div>
        ) : 
        showLogin ? 
        <Login /> :
        <Intro onAlreadyHaveAccount={() => setShowLogin(true)} />
      }
      </>
    );
  }
  export default Dashboard 
