import React, { useState } from "react";
import "./style.css";
import Input from "../Input";
import Button from "../buttons";
import { toast } from "react-toastify";
//import { signInWithEmailAndPassword } from "firebase/auth";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth, provider } from "../../firebase";
import { FunctionCallingMode } from "firebase/vertexai-preview";
import { useNavigate } from "react-router-dom";
import { getDoc, setDoc } from "firebase/firestore";
import { db, doc } from "../../firebase";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
//import { GoogleAuthProvider, signInWithPopup } from "firebase/auth/web-extension";

function SignupSignin() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [loginForm, setloginForm] = useState(false);
  const navigate = useNavigate();

  function SignupwithEmail() {
    setLoading(true);
    console.log("Name", name);
    console.log("Email", email);
    console.log("Password", password);
    console.log("confirmPassword", confirmPassword);
    if (
      name !== "" &&
      email !== "" &&
      password !== "" &&
      confirmPassword !== ""
    ) {
      if (password === confirmPassword) {
        createUserWithEmailAndPassword(auth, email, password)
          .then((userCredential) => {
            // Signed in
            const user = userCredential.user;
            console.log("User<<<<<", user);
            toast.success("User Created!");
            setLoading(false);
            setName("");
            setConfirmPassword("");
            setEmail("");
            setPassword("");
            createDoc(user);
            navigate("/dashboard");
            // ...
          })
          .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            toast.error(errorMessage);
            setLoading(false);
          });
      } else {
        setLoading(false);
        toast.error("Password doesn't matches with Confirm Password!!");
      }
    } else {
      setLoading(false);
      toast.error("All fields are mandatory!!");
    }
  }

  function LoginwithEmail() {
    setLoading(true);
    console.log("Email:", email);
    console.log("Password", password);
    if (email !== "" && password !== "") {
      signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          console.log("User<<<<", user);
          toast.success("User Logedin successfully!");
          setLoading(false);
          setEmail("");
          setPassword("");
          navigate("/dashboard");
          createDoc(user);
          // ...
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          toast.error(errorMessage);
          setLoading(false);
        });
    } else {
      setLoading(false);
      toast.error("All fields are mandatory!!");
    }
  }

  async function createDoc(user) {
    // Make sure that the doc with the uid doesn't exist
    // Create a doc
    setLoading(true);
    if (!user) return;

    const userRef = doc(db, "users", user.uid);
    const userData = await getDoc(userRef);
    if (!userData.exists()) {
      try {
        await setDoc(doc(db, "users", user.uid), {
          name: user.displayName ? user.displayName : name,
          email: user.email,
          photoURL: user.photoURL ? user.photoURL : "",
          createdAt: new Date(),
        });
        toast.success("Doc Created!");
        setLoading(false);
      } catch (error) {
        toast.error(error.message);
        setLoading(false);
      }
    } else {
      toast.error("Doc already exists!");
      setLoading(false);
    }
  }

  function googleAuth() {
    setLoading(true);
    try {
      signInWithPopup(auth, provider)
        .then((result) => {
          // This gives you a Google Access Token. You can use it to access the Google API.
          const credential = GoogleAuthProvider.credentialFromResult(result);
          const token = credential.accessToken;
          // The signed-in user info.
          const user = result.user;
          console.log("User>>>>",user);
          toast.success("User Authenticated");
          createDoc(user);
          navigate("/dashboard");
          setLoading(false);
        })
        .catch((error) => {
          // Handle Errors here.
          const errorCode = error.code;
          const errorMessage = error.message;
          toast.error(errorMessage);
          setLoading(false);
          // ...
        });
    } catch (error) {
      toast.error(error.message);
      setLoading(false);
    }
  }

  return (
    <>
      {loginForm ? (
        <div className="signup-wrapper">
          <h3 className="title">
            Login on <span style={{ color: "var(--theme)" }}>Financely.</span>
          </h3>
          <form>
            <Input
              type={"email"}
              label={"email"}
              state={email}
              setState={setEmail}
              placeholder={"JohnDoe@gmail.com"}
            />
            <Input
              type={"password"}
              label={"password"}
              state={password}
              setState={setPassword}
              placeholder={"Example@123"}
            />
            <Button
              disabled={loading}
              text={loading ? "Loading...." : "Login using Email and Password"}
              onClick={LoginwithEmail}
            />
            <p style={{ textAlign: "center", margin: 0 }}>or</p>
            <Button
              onClick={googleAuth}
              disabled={loading}
              text={loading ? "Loading...." : "Login using Google"}
              blue={true}
            />
            <p className="login-css" onClick={() => setloginForm(!loginForm)}>
              Or Don't Have An Account Already? Click Here.
            </p>
          </form>
        </div>
      ) : (
        <div className="signup-wrapper">
          <h3 className="title">
            Sign Up on <span style={{ color: "var(--theme)" }}>Financely.</span>
          </h3>
          <form>
            <Input
              type={"text"}
              label={"full name"}
              state={name}
              setState={setName}
              placeholder={"John Doe"}
            />
            <Input
              type={"email"}
              label={"email"}
              state={email}
              setState={setEmail}
              placeholder={"JohnDoe@gmail.com"}
            />
            <Input
              type={"password"}
              label={"password"}
              state={password}
              setState={setPassword}
              placeholder={"Example@123"}
            />
            <Input
              type={"password"}
              label={"Confirm password"}
              state={confirmPassword}
              setState={setConfirmPassword}
              placeholder={"Example@123"}
            />
            <Button
              disabled={loading}
              text={loading ? "Loading...." : "Signup using Email and Password"}
              onClick={SignupwithEmail}
            />
            <p style={{ textAlign: "center", margin: 0 }}>or</p>
            <Button
              onClick={googleAuth}
              disabled={loading}
              text={loading ? "Loading...." : "Signup using Google"}
              blue={true}
            />
            <p className="login-css" onClick={() => setloginForm(!loginForm)}>
              Or Have An Account? Click Here.
            </p>
          </form>
        </div>
      )}
    </>
  );
}

export default SignupSignin;
