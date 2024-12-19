import { useState, useEffect } from "react";
import { TbLogin, TbMail, TbLock } from "react-icons/tb";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Spin, notification, Form, Input } from "antd";
import { setCredentials } from "../slices/authSlice";
import { useLoginMutation } from "../slices/usersApiSlice";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPasword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [login, { isLoading, error }] = useLoginMutation();

  const { infoUser } = useSelector((state) => state.auth);

  const [api, contextHolder] = notification.useNotification();
  const openNotificationWithIcon = (type) => {
    api[type]({
      description: <span>{error?.data?.message}</span>,
    });
  };

  const { seacrh } = useLocation();
  const sp = new URLSearchParams(seacrh);
  const redirect = sp.get("redirect") || "/";

  useEffect(() => {
    if (infoUser) {
      navigate(redirect);
    }
  }, [infoUser, redirect, navigate]);
  const submitHandler = async () => {
    try {
      const res = await login({ email, password }).unwrap();
      dispatch(setCredentials({ ...res }));
      navigate(redirect);
    } catch (error) {
      console.log(error?.data?.message);
    }
  };
  useEffect(() => {
    if (error) {
      openNotificationWithIcon("error");
    }
  }, [error]);
  return (
    <>
      {contextHolder}
      <div className="w-full h-[100vh] flex items-center justify-center p-6 bg-slate-200">
        <div className="w-full md:w-2/3 h-fit lg:h-[70%] 2xl:h-5/6 py-8 lg:py-0 flex  rounded-xl overflow-hidden shadow-xl bg-white">
          {/* left section */}
          <div className="w-ful lg:w-1/2 h-full p-10 2xl:px-20 flex flex-col justify-center">
            <div className="w-ful flex gap-2 items-center justify-center mb-6">
              <div className="p-2 bg-cyan-600 text-white rounded">
                <TbLogin />
              </div>
              <span className="text-2xl text-blue-600">Se Connecter</span>
            </div>
            <Spin spinning={isLoading}>
              <Form
                autoComplete="off"
                className="py-8 flex flex-col gap-5"
                onFinish={submitHandler}
              >
                <label htmlFor="" className="flex items-center">
                  <TbMail style={{ fontSize: "20px" }} />
                  <span className="text-sm">Votre adresse email:</span>
                </label>
                <Form.Item
                  name="email"
                  rules={[
                    {
                      required: true,
                      message: "Veuillez saisir votre adresse email",
                    },
                    {
                      type: "email",
                      message: "Veuillez saisir une adrresse email valide",
                    },
                  ]}
                  hasFeedback
                >
                  <Input
                    className=" border focus:outline-none px-2 py-1 rounded"
                    // style={{ border: "1px solid #333" }}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="user@gmail.com"
                  />
                </Form.Item>
                <label htmlFor="" className="flex items-center">
                  <TbLock style={{ fontSize: "20px" }} />
                  <span className="text-sm">Votre mot de passe:</span>
                </label>
                <Form.Item
                  name="password"
                  rules={[
                    {
                      required: true,
                      message: "Veuillez saisir votre mot de passe",
                    },
                  ]}
                  hasFeedback
                >
                  <Input
                    type="password"
                    className=" border focus:outline-none px-2 py-1 rounded"
                    // style={{ border: "1px solid #333" }}
                    value={password}
                    onChange={(e) => setPasword(e.target.value)}
                    placeholder="Mot de passe utilisateur"
                  />
                </Form.Item>
                <button
                  type="submit"
                  className="w-full bg-cyan-600 p-2 rounded text-white"
                  disabled={isLoading}
                >
                  {isLoading ? "En cours ..." : "Connexion"}
                </button>
              </Form>
            </Spin>
          </div>
          <div className="w-1/2 h-full lg:flex flex-col items-center justify-center right-div">
            <div className="relative w-full flex items-center justify-center"></div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
