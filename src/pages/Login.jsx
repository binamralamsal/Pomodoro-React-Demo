import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitButtionDisabled, setSubmitButtonDisabled] = useState(true);

  const { handleLogin } = useContext(AuthContext);

  const handleSubmit = async (event) => {
    event.preventDefault();
    handleLogin(email, password);
  };

  useEffect(() => {
    if (email.length > 3 && password.length >= 6) {
      return setSubmitButtonDisabled(false);
    }
    setSubmitButtonDisabled(true);
  }, [email, password]);

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            id={"email"}
            required
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            id={"password"}
            required
          />
        </div>

        <button type={"submit"} disabled={submitButtionDisabled}>
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
