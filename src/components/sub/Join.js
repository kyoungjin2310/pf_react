import Layout from "../common/Layout";
import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

function Join() {
  const history = useHistory();
  const initVal = {
    userid: "",
    pwd1: "",
    pwd2: "",
    email: "",
    comments: "",
    country: "",
    gender: null,
    interests: null,
  };
  const [Val, setVal] = useState(initVal);
  const [Err, setErr] = useState({});
  const [Success, setSuccess] = useState(false);
  const [Submit, setSubmit] = useState(false);

  const check = (Val) => {
    const errs = {};
    const eng = /[a-zA-Z]/;
    const num = /[0-9]/;
    const spc = /[!@#$%^&*()_+]/;

    //userid인증처리
    if (Val.userid.length < 5) {
      errs.userid = "5 characters minimum.";
    }
    //password인증처리
    if (
      Val.pwd1.length < 5 ||
      !eng.test(Val.pwd1) ||
      !num.test(Val.pwd1) ||
      !spc.test(Val.pwd1)
    ) {
      errs.pwd1 =
        "Password must contain at least one number, special character and 5 characters minimum.";
    }
    if (Val.pwd1 !== Val.pwd2 || !Val.pwd2) {
      errs.pwd2 = "Please enter the same two passwords.";
    }
    if (Val.email.length < 8 || !/@/.test(Val.email)) {
      errs.email =
        "Please enter an email with at least 8 characters including @.";
    }
    if (!Val.gender) {
      errs.gender = "Please select your gender.";
    }
    if (!Val.interests) {
      errs.interests = "Choose one or more interests.";
    }
    if (Val.comments.length < 20) {
      errs.comments = "Please enter at least 20 characters.";
    }
    if (Val.country === "") {
      errs.country = "Please select an country.";
    }
    return errs;
  };

  const handleReset = () => {
    setSubmit(false);
    setErr({});
    setVal(initVal);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setVal({ ...Val, [name]: value });
  };

  const handleRadio = (e) => {
    const { name } = e.target;
    const isCheck = e.target.checked;
    setVal({ ...Val, [name]: isCheck });
  };

  const handleCheck = (e) => {
    let isCheck = false;
    const { name } = e.target;
    const inputs = e.target.parentElement.querySelectorAll("input");

    inputs.forEach((el) => {
      if (el.checked) isCheck = true;
    });

    setVal({ ...Val, [name]: isCheck });
  };

  const handleSelect = (e) => {
    const { name } = e.target;
    const isSelected = e.target.options[e.target.selectedIndex].value;
    setVal({ ...Val, [name]: isSelected });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setErr(check(Val));
  };

  useEffect(() => {
    const len = Object.keys(Err).length;
    if (len === 0 && Submit) {
      setSuccess(true);
      history.push("/");
    } else {
      setSuccess(false);
    }
  }, [Err]);

  return (
    <Layout name={"Join"} title={"Join Us"}>
      <div className="formWrap">
        <form onSubmit={handleSubmit}>
          <fieldset>
            <legend className="h">Join Form</legend>
            <table>
              <caption className="h">Join Form</caption>
              <tbody>
                {/* userid */}
                <tr>
                  <th scope="row">
                    <label htmlFor="userid">User Id</label>
                  </th>
                  <td>
                    <input
                      type="text"
                      id="userid"
                      name="userid"
                      placeholder="Enter your user id."
                      value={Val.userid}
                      onChange={handleChange}
                    />
                    <span className="err">{Err.userid}</span>
                  </td>
                </tr>

                {/* password */}
                <tr>
                  <th scope="row">
                    <label htmlFor="pwd1">Password</label>
                  </th>
                  <td>
                    <input
                      type="password"
                      name="pwd1"
                      id="pwd1"
                      placeholder="Enter your password."
                      value={Val.pwd1}
                      onChange={handleChange}
                    />
                    <span className="err">{Err.pwd1}</span>
                  </td>
                </tr>
                <tr>
                  <th scope="row">
                    <label htmlFor="pwd2">Re-Password</label>
                  </th>
                  <td>
                    <input
                      type="password"
                      name="pwd2"
                      id="pwd2"
                      placeholder="Re-Enter your password."
                      value={Val.pwd2}
                      onChange={handleChange}
                    />
                    <span className="err">{Err.pwd2}</span>
                  </td>
                </tr>

                {/* email */}
                <tr>
                  <th scope="row">
                    <label htmlFor="email">E-mail</label>
                  </th>
                  <td>
                    <input
                      type="text"
                      id="emial"
                      name="email"
                      placeholder="Enter your email."
                      value={Val.email}
                      onChange={handleChange}
                    />
                    <span className="err">{Err.email}</span>
                  </td>
                </tr>

                {/* gender */}
                <tr>
                  <th scope="row">Gender</th>
                  <td>
                    <label htmlFor="male">Male</label>
                    <input
                      type="radio"
                      id="male"
                      name="gender"
                      onChange={handleRadio}
                    />

                    <label htmlFor="female">Female</label>
                    <input
                      type="radio"
                      id="female"
                      name="gender"
                      onChange={handleRadio}
                    />
                    <span className="err">{Err.gender}</span>
                  </td>
                </tr>

                {/* interests */}
                <tr>
                  <th scope="row">Interests</th>
                  <td>
                    <label htmlFor="sports">Sports</label>
                    <input
                      type="checkbox"
                      id="sports"
                      name="interests"
                      onChange={handleCheck}
                    />

                    <label htmlFor="music">Music</label>
                    <input
                      type="checkbox"
                      id="music"
                      name="interests"
                      onChange={handleCheck}
                    />

                    <label htmlFor="game">Game</label>
                    <input
                      type="checkbox"
                      id="game"
                      name="interests"
                      onChange={handleCheck}
                    />
                    <span className="err">{Err.interests}</span>
                  </td>
                </tr>

                {/* country */}
                <tr>
                  <th scope="row">
                    <label htmlFor="country">Country</label>
                  </th>
                  <td>
                    <select name="country" id="country" onChange={handleSelect}>
                      <option value="">Select Country</option>
                      <option value="Antigua and Barbuda">
                        Antigua and Barbuda
                      </option>
                      <option value="Belgium">Belgium</option>
                      <option value="Central African Republic">
                        Central African Republic
                      </option>
                      <option value="Korea">Korea</option>
                    </select>
                    <span className="err">{Err.country}</span>
                  </td>
                </tr>

                {/* comments */}
                <tr>
                  <th scope="row">
                    <label htmlFor="comments">Comments</label>
                  </th>
                  <td>
                    <textarea
                      name="comments"
                      id="comments"
                      cols="30"
                      rows="10"
                      value={Val.comments}
                      onChange={handleChange}
                    ></textarea>
                    <span className="err">{Err.comments}</span>
                  </td>
                </tr>

                {/* btnSet */}
                <tr>
                  <th colSpan="2">
                    <input type="reset" value="CANCEL" onClick={handleReset} />
                    <input
                      type="submit"
                      value="SUBMIT"
                      onClick={() => setSubmit(true)}
                    />
                  </th>
                </tr>
              </tbody>
            </table>
          </fieldset>
        </form>
      </div>
    </Layout>
  );
}

export default Join;
