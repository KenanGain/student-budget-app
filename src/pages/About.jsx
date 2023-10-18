import { ArrowUturnDownIcon, HomeIcon } from "@heroicons/react/24/solid";
import { Link, useNavigate } from "react-router-dom";

const About = () => { 
    const navigate = useNavigate();
    return (
        <div className="dashboard">
            <h1> Hello This is Kenan Gain the person behind this app.</h1>
            <p>Budget app aims to help users organize their finances, allowing them to manage incomes, expenses, and view reports on their financial status.
For International student It will suggest Exchange rate on their own currency.
It has also one unique feature from my pet project which will suggest best student / Cash back credit card according to their expenses.
</p>
<h2> All Links:</h2>
<a href="https://student-budget-app.vercel.app/" target="_blank">App link</a><br/>

<a href="https://miro.com/app/board/uXjVMhb9cgI=/?share_link_id=815456588040" target="_blank">Miro Link for Flow diagram</a><br/>

<a href="https://www.figma.com/file/eOdgZDPuDF2OvBhEaDHzLL/Untitled?type=design&mode=design&t=oMOZ2s3Qs40jdnXR-1" target="_blank">Figma Link for Prototype</a><br/>

<a href="https://exchangeratesapi.io/" target="_blank">ExchangeRates Api</a>



            <div className="flex-md">
                <button className="btn btn--dark" onClick={() => navigate(-1)}>
                    <ArrowUturnDownIcon width={20} />
                    <span>Go Back</span>
                </button>
                <Link to="/" className="btn btn--dark">
                <HomeIcon width={20} />
                <span>Go Home</span>
                </Link>
            </div>
        </div>
    )
}

export default About;
