import { NavLink, Outlet } from "react-router"
import { removeSession } from "../Authoration/Seesion"
import { useAuthContext } from "../Authoration/useAuthContext";
import "../Style/Lyout.css"

const Layout = () => {

  const { user } = useAuthContext()

  return (
    <>
      <header>

        <nav style={{ display: "flex", gap: "15px", alignItems: "center" }}>

          <NavLink to="/">Home</NavLink>

          {user ? (
            <NavLink to="/Profile">
              <img
                src={`https://localhost:7082/Images/${user.profileUrl ? user.profileUrl : "default.png"}`}
                alt="Profile"
                style={{ width: "40px", height: "40px", borderRadius: "50%", marginLeft: "15px" }}
              />
            </NavLink>
          ) : null}


   

          {user ? null : <NavLink to="/Login">Login</NavLink>}

          {user ? null : <NavLink to="/Register">Register</NavLink>}

        </nav>

        {user ? (
          <button onClick={() => removeSession()}>
            Logout
          </button>
        ) : null}

      </header>

      <hr />

      <main>
        <Outlet />
      </main>
 
    </>
  )
}

export default Layout

























// import { NavLink, Outlet } from "react-router"
// import { removeSession } from "../Authoration/Seesion"
// import { useAuthContext } from "../Authoration/useAuthContext";
// import "../Style/Lyout.css"

// const Layout = () => {
//    const { user } = useAuthContext()

//   return (
//     <>
//       <header>
//         <nav style={{ display: "flex", gap: "15px" }}>
//           <NavLink to="/">
//           <img
//             src={ user ? `https://localhost:7082/Images/${user.profileUrl}`  : "/Images/default.png"}
//             alt="Profile"
//          style={{ width: "40px", height: "40px", borderRadius: "50%", marginLeft: "15px" }}
//           />
//          </NavLink>
//           <NavLink to="/">Home</NavLink>
//           <NavLink to="/Login">Login</NavLink>
//           <NavLink to="/Register">Register</NavLink>
//         </nav>

//         <button onClick={() => removeSession()}>
//           Logout
//         </button>
//       </header>

//       <hr />

//       <main>
//         <Outlet />
//       </main>
//     </>
//   )
// }

// export default Layout