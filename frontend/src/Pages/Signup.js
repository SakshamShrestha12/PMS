// import {useState} from 'react'
// import {useSignup} from "../hooks/useSignup"
// import '../index.css';

// const Signup=()=>{
//     const [username,setUsername]= useState('')
//     const [password, setPassword]= useState('')
//     const {signup,error,isloading}=useSignup()

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         await signup(username,password)
//       };
      
//     return(
//         <form className="signup" onSubmit={handleSubmit}>
//             <h3>Sign up</h3>
//             <label>Username: </label>
//             <input
//             type="text"
//             onChange={(e)=> setUsername(e.target.value)}
//             value={username}
//             />
//             <label>Password: </label>
//             <input
//             type="password"
//             onChange={(e)=> setPassword(e.target.value)}
//             value={password}
//             />

//             <button disabled={isloading}>Signup</button>
//             {error && <div className="error">{error}</div>}


//         </form>
//     )
// }

// export default Signup