import { Form, NavLink } from "react-router-dom"
import logomark from "../assets/Logo.png"
import { TrashIcon } from '@heroicons/react/24/solid'

const Nav = ({ userName }) => {


    return (
      <nav>
        <NavLink
          to="/"
          aria-label="Go to home"
        >
          <img src={logomark} alt="" height={50} />
          <h2>Student Budget App</h2>
        </NavLink>
          <NavLink to="/about">About</NavLink>
        {
          userName && (
            <Form
              method="post"
              action="logout"
              onSubmit={(event) => {
                if (!confirm("Delete user and all data?")) {
                  event.preventDefault()
                }
              }}
            >
 <button type="submit" className="btn btn--warning">
                <span>Log Out</span>
                {/* <TrashIcon width={20} /> */}
              </button>
              
              {/* <button type="button" className="btn btn--warning">
              <span>Logout</span>
              </button> */}
              </div>
            </Form>
          )
        }
      </nav>
    )
  }
  export default Nav
