import { useMemo } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import match_reg from "../../assets/images/match_reg.png";
import { Link, useParams } from "react-router-dom";
import { Popup_btn } from "../../components/ui/svg/index.jsx";
import { joinLeagueSocket, socket } from "../../app/socket/socket.js";
import { SOCKET } from "../../utils/constant.js";
import {
  setIsAgreedToJoin,
  setRegistrationModal,
} from "../../app/slices/leagueDetail/leagueDetailSlice.js";
import { useDispatch, useSelector } from "react-redux";
import { baseURL } from "../../utils/axios.js";

const RegistrationModel = () => {
  const { isAgreedToJoin, leagueData } = useSelector((state) => state.leagues);
  const dispatch = useDispatch();
  const isSocketConnected = useSelector((state) => state.socket.isConnected);
  const user = useSelector((state) => state.auth.user);

  // Get custom fields from leagueData, fallback to empty array
  const customFields = Array.isArray(leagueData?.customRegistrationFields)
    ? leagueData.customRegistrationFields
    : [];

  // Build initialValues and validationSchema dynamically
  const { initialValues, validationSchema, fieldList } = useMemo(() => {
    let vals = {};
    let shape = {};
    let fields = [];

    if (customFields.length > 0) {
      for (const field of customFields) {
        vals[field.fieldName] = "";
        let validator = null;
        switch (field.fieldType) {
          case "text":
          default:
            validator = Yup.string();
            break;
        }
        if (field.required) {
          validator = validator.required(
            `${field.fieldName.replace(/^\w/, (c) =>
              c.toUpperCase()
            )} is required`
          );
        }
        shape[field.fieldName] = validator;
        fields.push(field);
      }
    }
    return {
      initialValues: vals,
      validationSchema: Yup.object(shape),
      fieldList: fields,
    };
  }, [customFields]);
  const allRequiredChecked = fieldList
    ?.filter((field) => field.required)
    ?.every((field) => isAgreedToJoin[field._id]);
  // Handle form submit
  const handleSubmit = (values) => {
    // If there are custom fields, send all of them
    let payload = {
      Lid: leagueData._id,
      userId: user._id,
    };
    payload["otherFields"] = [];
    try{if (fieldList.length > 0) {
      // Attach all custom fields to payload
      for (const field of fieldList) {
        if (
          field.fieldName.trim().toLowerCase() === "game id" ||
          field.fieldName.trim().toLowerCase() === "gameid"
        ) {
          payload["gameId"] = values[field.fieldName];
        } else {
          payload["otherFields"].push({
            key: field.fieldName,
            value: values[field.fieldName],
          });
        }
      }
    }}catch(e){
      console.log("asdasda");
    }
    joinLeagueSocket({ isSocketConnected, payload });
  };

  return (
    <>
      <div
        className="relative z-1000"
        aria-labelledby="modal-title"
        role="dialog"
        aria-modal="true"
      >
        <div
          className="fixed inset-0 popup-overlay transition-opacity"
          aria-hidden="true"
        ></div>

        <div className="fixed  inset-0 overflow-y-auto flex justify-center items-center">
          <div className="popup-wrap inline-flex items-center h-auto relative sd_before before:bg-[#010221] before:w-full before:h-full before:blur-2xl before:opacity-60">
            <div className="match_reg--popup relative sd_before sd_after">
              <div className="popup_header px-8 pt-8 pb-5 flex items-start justify-between mt-3 text-center sm:mt-0 sm:text-left">
                <img src={match_reg} alt="" style={{ width: "10rem" }} />
                <button
                  type="button"
                  onClick={() => dispatch(setRegistrationModal(false))}
                  className="pt-2 cursor-pointer"
                >
                  <svg
                    width="1.125rem"
                    height="1.125rem"
                    viewBox="0 0 18 18"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M1 17L17 1M17 17L1 1"
                      stroke="#7B7ED0"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
              </div>
              <div className="popup_body px-4 py-3">
                <Formik
                  initialValues={initialValues}
                  validationSchema={validationSchema}
                  onSubmit={handleSubmit}
                  enableReinitialize
                >
                  {({ isValid }) => (
                    <Form>
                      {fieldList.length > 0 && (
                        <div className="text-center w-full">
                          {fieldList.map((field) => (
                            <div
                              key={field._id}
                              className="mb-4 flex items-center"
                            >
                              {/* Image displayed next to the field */}
                              {field?.image && (
                                <img
                                  src={`${baseURL}/api/v1/${field?.image}`}
                                  alt={`${field.fieldName} image`}
                                  className="w-8 h-8 mr-2 object-cover"
                                />
                              )}
                              <div className="flex-1">
                                <Field
                                  type={field.fieldType}
                                  id={field.fieldName}
                                  name={field.fieldName}
                                  className="sd_custom-input px-4 text-xl focus:outline-0 focus:shadow-none leading-none text-[#7B7ED0]"
                                  placeholder={field.fieldName.replace(
                                    /^\w/,
                                    (c) => c.toUpperCase()
                                  )}
                                />
                                <div className="text-start px-7">
                                  <ErrorMessage
                                    name={field.fieldName}
                                    component="div"
                                    className="text-red-500 text-sm mt-1"
                                  />
                                </div>
                              </div>
                            </div>
                          ))}
                          <svg
                            width="0"
                            height="0"
                            viewBox="0 0 400 72"
                            xmlns="http://www.w3.org/2000/svg"
                            style={{ position: "absolute" }}
                          >
                            <defs>
                              <clipPath
                                id="inputclip"
                                clipPathUnits="objectBoundingBox"
                              >
                                <path
                                  transform="scale(0.0025, 0.0138889)"
                                  d="M240 0L248 8H384L400 24V56L384 72H0V16L16 0H240Z"
                                />
                              </clipPath>
                            </defs>
                          </svg>
                        </div>
                      )}

                      {/* Terms and Conditions Checkbox */}
                      <div className="px-4 pt-6">
                        {customFields.map((field) => (
                          <div key={field._id} className="mb-4">
                            <input
                              className="hidden"
                              type="checkbox"
                              id={`check-${field._id}`} // Unique ID for each checkbox
                              onChange={() =>
                                dispatch(
                                  setIsAgreedToJoin({
                                    id: field._id,
                                    value: !isAgreedToJoin[field._id],
                                  })
                                )
                              }
                            />
                            <label
                              className="flex gap-4 items-center h-10 px-2 rounded cursor-pointer"
                              htmlFor={`check-${field._id}`}
                            >
                              <span className="checkbox-inner flex items-center justify-center w-[2rem] h-[2rem] text-transparent rounded-sm bg-[#09092d]"></span>
                              <div className="text-base flex-[1]">
                                <span
                                  className="purple_light"
                                  dangerouslySetInnerHTML={{
                                    __html: field.checkboxText,
                                  }}
                                />
                              </div>
                            </label>
                          </div>
                        ))}

                        {/* <input
                          className="hidden"
                          type="checkbox"
                          id="check-round01"
                          checked={isAgreedToJoin}
                          onChange={() =>
                            dispatch(setIsAgreedToJoin(!isAgreedToJoin))
                          }
                        />
                        <label
                          className="flex gap-4 items-center h-10 px-2 rounded cursor-pointer"
                          htmlFor="check-round01"
                        >
                          <span className="checkbox-inner flex items-center justify-center w-[2rem] h-[2rem] text-transparent rounded-sm bg-[#09092d]"></span>
                          <div className="text-base flex-[1]">
                            <span className="purple_light">
                              By Registering a Match I agree
                              <br />
                              to{" "}
                            </span>
                            <Link to={"#"} className="underline text-[#46ABF8]">
                              Terms and Conditions
                            </Link>
                            <span className="purple_light"> and </span>
                            <Link to={"#"} className="underline text-[#46ABF8]">
                              Privacy Policy
                            </Link>
                          </div>
                        </label>
                        {!isAgreedToJoin && (
                          <div className="text-red-500 text-sm mt-1 px-2">
                            You must agree to the Terms and Conditions to
                            register.
                          </div>
                        )} */}
                      </div>

                      <div className="popup_footer px-6 mt-5 pt-6">
                        <button
                          type="submit"
                          disabled={
                            !allRequiredChecked ||
                            (fieldList.length > 0 && !isValid)
                          }
                          className={`popup_submit-btn text-xl uppercase purple_col font-medium font_oswald hover:opacity-70 duration-400 ${
                            !allRequiredChecked ||
                            (fieldList.length > 0 && !isValid)
                              ? "opacity-50 cursor-not-allowed"
                              : ""
                          }`}
                        >
                          {fieldList.length > 0 ? "Submit" : "Register"}
                        </button>
                        <Popup_btn />
                      </div>
                    </Form>
                  )}
                </Formik>
              </div>

              {/* === SVG Clip Path === */}
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
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default RegistrationModel;
