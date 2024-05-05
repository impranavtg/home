import { Box, Button, TextField } from "@material-ui/core";
import { useState } from "react";
import { CurrencyState } from "../../CurrContext";
import { auth } from "../../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import toast from 'react-hot-toast';

const Login = ({ handleClose }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { setAlert } = CurrencyState();

  const handleSubmit = async () => {
    if (!email || !password) {
      setAlert({
        open: true,
        message: "Please fill all the Fields",
        type: "error",
      });
      toast.error("Please fill all the Fields");
      return;
    }

    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      setAlert({
        open: true,
        message: `Sign Up Successful. Welcome ${result.user.email}`,
        type: "success",
      });
      toast.success(`Sign Up Successful. Welcome ${result.user.email}`);

      handleClose();
    } catch (error) {
      setAlert({
        open: true,
        message: error.message,
        type: "error",
      });
      toast.error(error.message);
      return;
    }
  };

  return (
    <Box
      p={3}
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "20px",
      }}
    >
      <TextField
        variant="outlined"
        type="email"
        label="Enter Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        fullWidth
      />
      <TextField
        variant="outlined"
        label="Enter Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        fullWidth
      />
      <Button
        variant="contained"
        size="large"
        onClick={handleSubmit}
        style={{ color:"white",
          backgroundColor: "#FF2E63" }}
      >
        Login
      </Button>
    </Box>
  );
};

export default Login;