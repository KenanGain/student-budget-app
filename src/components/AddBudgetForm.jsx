import { CurrencyDollarIcon } from "@heroicons/react/24/solid"
import { Form, useFetcher } from "react-router-dom"
import { useEffect, useRef } from "react";

const AddBudgetForm = () => {
    const fetcher = useFetcher();
    const isSubmitting = fetcher.state === "submitting"

    const formRef = useRef();
    const focusRef = useRef();

    useEffect(() => {
        if(!isSubmitting){
            formRef.current.reset()
            focusRef.current.focus()
        }
    },[isSubmitting])

    return (
        <div className="form-wrapper">
            <h2 className="h3">
                Create Budget
            </h2>
            <fetcher.Form
            method="post"
            className="grid-sm"
            ref={formRef}
            >
                <div className="grid-xs">
                    <label htmlFor="newBudget">Budget Category</label>
                    <select id="newBudget" name="newBudget" required ref={focusRef}>
                        <option value="" selected disabled={isSubmitting}>Select your Budget Category</option>
                        <option value="Groceries">Groceries</option>
                        <option value="Dining">Dining</option>
                        <option value="Transportation">Transportation</option>
                        <option value="Bill Payment">Bill Payment</option>
                        <option value="Gas">Gas</option>
                        <option value="Medicine">Medicine</option>
                        <option value="Other">Other</option>
                        </select>
                </div>
                < div className="grid-xs">
                    <label htmlFor="newBudgetAmount">Amount</label>
                    <input
                    type="number"
                    step="0.01"
                    name="newBudgetAmount"
                    id="newBudgetAmount"
                    placeholder="e.g., $350"
                    required
                    inputMode="decimal" />
                </div>
                <input type="hidden" name="_action" value="createBudget" />
                <button type="submit" className="btn btn--dark" disabled={isSubmitting}>
                    {
                        isSubmitting ?  <span>Submitting</span>
                         : (<>
                         <span> Create Budget</span>
                        <CurrencyDollarIcon width={20}/>
                        </>)
                    }
                </button>
            </fetcher.Form>
        </div>
    )
}
export default AddBudgetForm