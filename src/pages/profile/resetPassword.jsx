import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import center_league from "../../assets/images/center_league.png";

const ResetPasswordPage = () => {
  // Define validation schema using Yup
  const validationSchema = Yup.object({
    field: Yup.string()
      .required("Password is required")
      .min(6, "Password must be at least 6 characters"),
  });

  // Handle form submission
  const handleSubmit = (values, { setSubmitting }) => {
    console.log("Form values:", values);
    // Add your reset password logic here (e.g., API call)
    setSubmitting(false);
  };

  return (
    <main dir="ltr" className="flex-1 lobby_page--wrapper">
      <>
        <div className="fixed inset-0 bg-[#09092d] z-40" />
        <div className="fixed inset-0 flex justify-center items-center z-50">
          <div className="match-makingwp overflow-hidden">
            <img
              className="left-league absolute -top-60 left-14 opacity-[8%]"
              src={center_league}
              alt=""
              style={{ width: "20rem" }}
            />
            <img
              className="left-bottom-league absolute xl:bottom-25 xl:left-80 md:bottom-15 md:left-60 opacity-[8%]"
              src={center_league}
              alt=""
              style={{ width: "5.5rem" }}
            />
            <img
              className="right-league absolute xl:top-20 xl:right-60 md:top-10 md:right-40 opacity-[8%]"
              src={center_league}
              alt=""
              style={{ width: "9.5rem" }}
            />
            <img
              className="right-bottom-league absolute bottom-[-8.5rem] right-[-6.3rem] opacity-[8%]"
              src={center_league}
              alt=""
              style={{ width: "20rem" }}
            />
          </div>
          <div
            className={`bg-[#121331] match_reg--popup !h-auto sd_before sd_after text-white p-6 rounded-xl w-full max-w-lg relative max-h-[80vh] overflow-y-auto overflow-x-hidden`}
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            <div className=" text-center mb-5">
              <h2 className="text-xl font-bold mb-2">Reset Password</h2>
              <p className="text-sm">
                Please enter your new password below. Make sure it's strong and
                secure — you'll use it the next time you log in.
              </p>
            </div>

            <Formik
              initialValues={{ field: "" }}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
            >
              {({ isSubmitting, setFieldValue, values }) => (
                <Form>
                  <div key="field" className="text-start w-full pr-4 mb-4">
                    <div className="relative">
                      <Field
                        name="field"
                        type="password"
                        className="sd_custom-input !w-full px-4 ltr:pr-10 rtl:pr-4 text-lg focus:outline-0 focus:shadow-none leading-none text-[#7B7ED0] !placeholder-[#7B7ED0]"
                        placeholder="Enter new password"
                      />
                      <button
                        type="button"
                        // Example: Toggle password visibility
                        onClick={() =>
                          setFieldValue(
                            "field",
                            values.field,
                            (document.querySelector(
                              `input[name="field"]`
                            ).type =
                              document.querySelector(`input[name="field"]`)
                                .type === "password"
                                ? "text"
                                : "password")
                          )
                        }
                        className="absolute right-6  top-1/2 transform -translate-y-1/2 text-[#7B7ED0] hover:opacity-70"
                      >
                        <svg
                          width="20"
                          height="20"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M12 5C5.636 5 2 12 2 12s3.636 7 10 7 10-7 10-7-3.636-7-10-7z"
                            stroke="#7B7ED0"
                            strokeWidth="2"
                          />
                          <circle cx="12" cy="12" r="3" fill="#7B7ED0" />
                        </svg>
                      </button>
                    </div>
                    <ErrorMessage
                      name="field"
                      component="div"
                      className="text-red-500 text-sm"
                    />
                  </div>
                  <div key="field" className="text-start w-full pr-4">
                    <div className="relative">
                      <Field
                        name="field"
                        type="password"
                        className="sd_custom-input !w-full px-4 ltr:pr-10 rtl:pr-4 text-lg focus:outline-0 focus:shadow-none leading-none text-[#7B7ED0] !placeholder-[#7B7ED0]"
                        placeholder="Enter Confirm password"
                      />
                      <button
                        type="button"
                        // Example: Toggle password visibility
                        onClick={() =>
                          setFieldValue(
                            "field",
                            values.field,
                            (document.querySelector(
                              `input[name="field"]`
                            ).type =
                              document.querySelector(`input[name="field"]`)
                                .type === "password"
                                ? "text"
                                : "password")
                          )
                        }
                        className="absolute right-6 top-1/2 transform -translate-y-1/2 text-[#7B7ED0] hover:opacity-70"
                      >
                        <svg
                          width="20"
                          height="20"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M12 5C5.636 5 2 12 2 12s3.636 7 10 7 10-7 10-7-3.636-7-10-7z"
                            stroke="#7B7ED0"
                            strokeWidth="2"
                          />
                          <circle cx="12" cy="12" r="3" fill="#7B7ED0" />
                        </svg>
                      </button>
                    </div>
                    <ErrorMessage
                      name="field"
                      component="div"
                      className="text-red-500 text-sm"
                    />
                  </div>
                  <div className="pt-6 game_status--tab wizard_btn next_btn">
                    <button
                      type="submit"
                      className="py-2 px-4 justify-center flex items-center text-nowrap text-xl font-medium transition-all sd_after sd_before relative font_oswald hover:opacity-70 active-tab duration-300 polygon_border"
                      style={{ width: "10rem", height: "4rem" }}
                    >
                      Submit                                        
                    </button>
                  </div>
                </Form>
              )}
            </Formik>

            <svg
              width="0"
              height="0"
              viewBox="0 0 400 72"
              xmlns="http://www.w3.org/2000/svg"
              style={{ position: "absolute" }}
            >
              <defs>
                <clipPath id="inputclip" clipPathUnits="objectBoundingBox">
                  <path
                    transform="scale(0.0025, 0.0138889)"
                    d="M240 0L248 8H384L400 24V56L384 72H0V16L16 0H240Z"
                  />
                </clipPath>
              </defs>
            </svg>
          </div>
        </div>
        <svg
          width="0"
          height="0"
          viewBox="0 0 480 416"
          xmlns="http://www.w3.org/2000/svg"
          style={{ position: "absolute" }}
        >
          <defs>
            <clipPath id="myClipPath" clipPathUnits="objectBoundingBox">
              <path
                transform="scale(0.00208333, 0.00240385)"
                d="M480 100L464 116V188L480 204V368L440 408H228L220 416H40L8 384V304L0 296V24L24 0H480V100Z"
              />
            </clipPath>
          </defs>
        </svg>
      </>
    </main>
  );
};

export default ResetPasswordPage;
