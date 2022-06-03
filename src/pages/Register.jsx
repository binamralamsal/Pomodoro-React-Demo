import { useEffect, useState } from "react";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitButtionDisabled, setSubmitButtonDisabled] = useState(true);

  const { handleRegister } = useContext(AuthContext);

  const handleSubmit = async (event) => {
    event.preventDefault();

    handleRegister(name, email, password);
  };

  useEffect(() => {
    if (name.length > 3 && email.length > 3 && password.length >= 6) {
      return setSubmitButtonDisabled(false);
    }
    setSubmitButtonDisabled(true);
  }, [name, email, password]);

  return (
    <div>
      <h1>Register</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Name</label>
          <input
            type="text"
            value={name}
            onChange={(event) => setName(event.target.value)}
            id={"name"}
            required
          />
        </div>
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
          Register
        </button>
      </form>
    </div>
  );
};

export default Register;
