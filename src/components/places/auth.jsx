import React, { useState, useMemo, useCallback, useEffect } from "react";
import Nav from "../nav";
import Footer from "../footer";
import { useForm } from "react-hook-form";
import VisibilityIcon from "../universal/visibilityIcon";
import { RiLock2Line } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { signin, signup, externalSignin } from "../../store/auth";
import { GoogleLogin } from "@react-oauth/google";
import { notify } from "../../store/utils";
import PuffLoader from "react-spinners/PuffLoader";
import debounce from "../../utils/debounce";
import "./auth.css";

const Auth = (props) => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [redirect, setRedirect] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const dispatch = useDispatch();

  const status = useSelector((state) => state.user.auth.status);
  const { currentUser } = useSelector((state) => state.user.auth);

  useEffect(() => {
    if (currentUser) {
      setRedirect(true);
    }
  }, [currentUser]);

  const {
    register: registerSignUp,
    handleSubmit: handleRegisterSignUp,
    reset: resetSignUp,
    // formState: { errors },
  } = useForm({
    defaultValues: {
      username: null,
      password: null,
      confirmpassword: null,
      email: null,
    },
  });

  const {
    register: registerSignIn,
    handleSubmit: handleRegisterSignIn,
    reset: resetSignIn,
    // formState: { errors },
  } = useForm({
    defaultValues: {
      password: null,
      email: null,
    },
  });

  const handleSignIn = useCallback(
    (data) => {
      dispatch(signin(data));
      resetSignIn();
    },
    [dispatch, resetSignIn]
  );

  const debouncedHandleSignIn = useMemo(
    () => debounce((data) => handleSignIn(data), 400),
    [handleSignIn]
  );

  const handleSignUp = useCallback(
    (data) => {
      if (data.password === data.confirmpassword) {
        dispatch(signup(data));
        resetSignUp();
      } else notify("Password fields must have the same value");
    },
    [dispatch, resetSignUp]
  );

  const debouncedHandleSignUp = useMemo(
    () => debounce((data) => handleSignUp(data), 400),
    [handleSignUp]
  );

  const googleSuccess = async (credentialResponse) => {
    const response = await credentialResponse;

    try {
      dispatch(externalSignin(response));
    } catch (error) {
      console.log(error);
    }
  };

  const googleFailure = (error) => {
    console.log(error);
    notify("Login failed. Try again.");
  };

  return (
    <section className="auth-wrapper flex-auto">
      {redirect && <Redirect to={"/"} />}
      <Nav />
      <div id="auth">
        <section className="auth-container main-background border border-radius padding margin-block-auth-container">
          <div className="padding border">
            <h3>Welcome</h3>
            <article className="auth-activities-container">
              {redirect && <Redirect to={"/"} />}
              <div className="auth-form-container">
                <PuffLoader
                  loading={status === "loading"}
                  size={150}
                  color={"#ffffff"}
                />
                {status !== "loading" && (
                  <>
                    <RiLock2Line size={"2rem"} />
                    <span className="margin-05-0">
                      {isSignUp ? "Sign Up" : "Sign In"}
                    </span>
                    <form
                      className="auth-form"
                      onSubmit={
                        isSignUp
                          ? handleRegisterSignUp(debouncedHandleSignUp)
                          : handleRegisterSignIn(debouncedHandleSignIn)
                      }
                    >
                      {isSignUp ? (
                        <>
                          <input
                            type="text"
                            placeholder={"User Name *"}
                            {...registerSignUp("username", {
                              required: true,
                              minLength: 3,
                              maxLength: 30,
                            })}
                          />
                          <input
                            type={isPasswordVisible ? "text" : "password"}
                            placeholder={"Password *"}
                            {...registerSignUp("password", {
                              required: true,
                              minLength: 8,
                              maxLength: 25,
                            })}
                          />
                          <input
                            type={isPasswordVisible ? "text" : "password"}
                            placeholder={"Confirm password *"}
                            {...registerSignUp("confirmpassword", {
                              required: true,
                              minLength: 8,
                              maxLength: 25,
                            })}
                          />
                          <VisibilityIcon
                            condition={isPasswordVisible}
                            toggler={() =>
                              setIsPasswordVisible(!isPasswordVisible)
                            }
                          />
                          <input
                            type="text"
                            placeholder={"Email address *"}
                            {...registerSignUp("email", {
                              required: true,
                              minLength: 5,
                              maxLength: 40,
                              pattern:
                                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                            })}
                          />
                        </>
                      ) : (
                        <>
                          <input
                            type="text"
                            placeholder={"Email address *"}
                            {...registerSignIn("email", {
                              required: true,
                              minLength: 5,
                              maxLength: 40,
                              pattern:
                                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                            })}
                          />
                          <input
                            type={isPasswordVisible ? "text" : "password"}
                            placeholder={"Password *"}
                            {...registerSignIn("password", {
                              required: true,
                              minLength: 8,
                              maxLength: 25,
                            })}
                          />
                          <VisibilityIcon
                            condition={isPasswordVisible}
                            toggler={() =>
                              setIsPasswordVisible(!isPasswordVisible)
                            }
                          />
                        </>
                      )}
                      <button className="button small" type="submit">
                        {isSignUp ? "Sign Up" : "Sign In"}
                      </button>
                      {/* {!isSignUp && (
                        <button
                          className="button small"
                          type="button"
                          onClick={() => {
                            setIsPasswordReset(true);
                          }}
                        >
                          Forgot password ?
                        </button>
                      )} */}

                      {!isSignUp && (
                        <span id="google-button">
                          <GoogleLogin
                            onSuccess={googleSuccess}
                            onFailure={googleFailure}
                            width={"280px"}
                            shape={"pill"}
                          />
                        </span>
                      )}

                      <span
                        className="cursor-pointer margin-05-0"
                        onClick={() => setIsSignUp(!isSignUp)}
                      >
                        {isSignUp
                          ? "Already have an account? Sign In"
                          : "Don't have an account? Sign Up "}
                      </span>
                    </form>
                  </>
                )}
              </div>
              {/* )} */}
            </article>
          </div>
        </section>
      </div>
      <Footer />
    </section>
  );
};

export default Auth;
