import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { IMAGES } from "../../components/ui/images/images";
import Select from "react-select";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import {
  assignGameToMember,
  fetchGames,
  fetchTeamByIid,
} from "../../app/slices/teamInvitationSlice/teamInvitationSlice";
import { baseURL } from "../../utils/axios";
import { getServerURL } from "../../utils/constant";
import * as Yup from "yup";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";

const InviteLink = ({ Iid }) => {
  const [submitted, setSubmitted] = useState(false);
  const [loadingSubmit, setLoadingSubmit] = useState(false);
  const { user } = useSelector((state) => state.auth);

  const {
    team: teamData,
    games,
    loading,
  } = useSelector((state) => state.teamInvitation);

  const { t } = useTranslation();
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!user) {
      navigate("/prime/lobby");
    } else if (Iid) {
      // Fetch team by Iid
      dispatch(fetchTeamByIid(Iid))
        .unwrap() // unwrap makes it throw if rejected
        .catch(() => {
          // Redirect if fetch failed
          toast.error(t("Invite_model.invite_link_expire"));
          navigate("/prime/lobby");
        });
    }
  }, [user, Iid, dispatch, navigate]);

  useEffect(() => {
    dispatch(fetchGames());
  }, [dispatch]);

  // Validation schema using Yup
  const validationSchema = Yup.object({
    selectedGame: Yup.object()
      .nullable()
      .required(t("Invite_model.select_game_required")),
    gameId: Yup.string()
      .trim()
      .required(t("Invite_model.game_id_required"))
      .min(1, t("Invite_model.game_id_min")),
  });

  // Initial form values
  const initialValues = {
    selectedGame: null,
    gameId: "",
  };

  const handleSubmit = async (values, { setSubmitting }) => {
    if (!teamData?._id || !user?._id) return;

    try {
      // Dispatch the thunk
      setLoadingSubmit(true);
      const resultAction = await dispatch(
        assignGameToMember({
          teamId: teamData._id,
          userId: user._id,
          game: values.selectedGame.value,
          gameId: values.gameId,
        })
      );

      if (resultAction?.meta?.requestStatus == "fulfilled") {
        const params = new URLSearchParams(location.search);
        params.delete("Iid");
        navigate(
          {
            pathname: location.pathname, // keep the same path (/prime/lobby/:id)
            search: params.toString(), // cleaned query string
          },
          { replace: true }
        );
      }
    } catch (error) {
      console.error("Unexpected error:", error);
    } finally {
      setLoadingSubmit(false);
    }
  };

  return (
    <main dir="ltr" className="flex-1 lobby_page--wrapper">
      <>
        {/* Backdrop Blur Overlay */}
        <div className="fixed inset-0 z-40 bg-black/20 backdrop-blur-sm" />

        <div className="fixed inset-0 flex justify-center items-center z-50">
          <div className="flex flex-col gap-6">
            <motion.div
              className="bg-[#121331] match_reg--popup !h-auto sd_before sd_after text-white p-0 rounded-xl w-full max-w-lg relative max-h-[80vh] overflow-y-auto overflow-x-hidden"
              style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
              initial={{ scale: 0.5, opacity: 0, y: 50 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.5, opacity: 0, y: 50 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
            >
              {/* Header */}
              <div className="bg-[#1a1b3a] relative rounded-t-xl px-8 py-5 border-b border-[#353c83] text-center">
                <h2 className="text-2xl font-bold text-white tracking-wide">
                  {t("Invite_model.accept_invitation")}
                </h2>
                <button
                  onClick={() => navigate("/prime/lobby")} // or navigate(-1) if you want back navigation
                  className="absolute top-8 right-4  text-[18px] -translate-y-1/2 text-[#7B7ED0] hover:text-white transition"
                >
                  ✕
                </button>
                <p className="text-[#7B7ED0] text-base mt-1">
                  {t("Invite_model.accept_description")}
                </p>
              </div>

              {loading ? (
                <div className="flex justify-center items-center h-40">
                  <svg
                    className="animate-spin h-12 w-12 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="3"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                    ></path>
                  </svg>
                </div>
              ) : (
                <>
                  {/* Team Details */}
                  <div className="px-8 py-5 border-b border-[#353c83]">
                    <h3 className="text-lg font-semibold text-[#7B7ED0] mb-3">
                      {t("Invite_model.team_details")}
                    </h3>
                    <div className="flex items-center gap-4 mb-3">
                      <div className="rounded-full overflow-hidden w-16 h-16 border-2 border-[#7B7ED0]">
                        <img
                          src={getServerURL(teamData?.logoImage)}
                          alt="Team"
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <p className="font-bold text-white text-xl mb-1">
                          {teamData?.teamName || "N/A"}
                        </p>
                        <div className="flex gap-6 text-sm text-[#7B7ED0]">
                          <span>
                            {t("Invite_model.members")}:
                            <span className="text-[#F4F7FF] font-semibold">
                              {teamData?.members?.length || 0}
                            </span>
                          </span>
                          <span>
                            {t("Invite_model.country")}:
                            <span className="text-[#F4F7FF] font-semibold">
                              {teamData?.region || "N/A"}
                            </span>
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Formik Form */}
                  <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={handleSubmit}
                  >
                    {({
                      setFieldValue,
                      values,
                      errors,
                      touched,
                      isSubmitting,
                    }) => (
                      <Form className="px-8 pt-5">
                        <div className="custom_select2 sd_select--menu ">
                          <label className="flex gap-4 items-center h-10 rounded ">
                            {t("Invite_model.select_game")}
                          </label>
                          <Select
                            name="selectedGame"
                            value={values.selectedGame}
                            onChange={(option) =>
                              setFieldValue("selectedGame", option)
                            }
                            options={games.map((game) => ({
                              value: game._id,
                              label: game.name,
                              logo: game.logo,
                              color: game.color,
                            }))}
                            className="basic-multi-select cursor-pointer"
                            classNamePrefix="select"
                            placeholder={t("Invite_model.select_game")}
                            menuPortalTarget={document.body}
                            formatOptionLabel={(option) => (
                              <div className="flex items-center gap-2">
                                {option.logo && (
                                  <img
                                    src={getServerURL(option.logo)}
                                    alt={option.label}
                                    className="w-6 h-6 rounded-full"
                                  />
                                )}
                                <span style={{ color: "#7B7ED0" }}>
                                  {option.label}
                                </span>
                              </div>
                            )}
                            styles={{
                              menuPortal: (base) => ({ ...base, zIndex: 9999 }),
                              control: (base) => ({
                                ...base,
                                backgroundColor: "#121331",
                                borderColor: "#7B7ED0",
                                color: "#7B7ED0",
                                boxShadow: "none",
                                minHeight: "40px",
                                cursor: "pointer",
                              }),
                              singleValue: (base) => ({
                                ...base,
                                color: "#7B7ED0",
                              }),
                              option: (base, state) => ({
                                ...base,
                                backgroundColor: state.isSelected
                                  ? "#23244d"
                                  : state.isFocused
                                  ? "#1a1b3a"
                                  : "#121331",
                                color: "#7B7ED0",
                              }),
                              menu: (base) => ({
                                ...base,
                                backgroundColor: "#121331",
                                zIndex: 9999,
                              }),
                            }}
                          />
                          <ErrorMessage
                            name="selectedGame"
                            component="div"
                            className="text-red-500 text-sm mt-1"
                          />
                        </div>

                        <div>
                          <label className="flex mt-3 items-center h-10 rounded ">
                            {t("Invite_model.game_id")}
                          </label>
                          <Field
                            name="gameId"
                            type="text"
                            className="sd_custom-input !w-full px-4 py-2 mt-1 text-lg focus:outline-0 focus:shadow-none leading-none text-[#7B7ED0] !placeholder-[#7B7ED0] bg-[#18194a] rounded"
                            placeholder={t("Invite_model.game_id")}
                          />
                          <ErrorMessage
                            name="gameId"
                            component="div"
                            className="text-red-500 text-sm mt-1"
                          />
                        </div>

                        <div className="pt-6 game_status--tab wizard_btn mt-3 flex justify-end next_btn">
                          <button
                            type="submit"
                            disabled={loading}
                            className="py-1 px-2 justify-center text-center flex items-right items-center text-nowrap text-xl font-medium transition-all sd_after sd_before cursor-pointer relative font_oswald hover:opacity-70 active-tab duration-300 polygon_border"
                            style={{ width: "10rem", height: "3.6rem" }}
                          >
                            {loading ? (
                              <svg
                                className="animate-spin h-5 w-5 text-white mr-2"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                              >
                                <circle
                                  className="opacity-25"
                                  cx="12"
                                  cy="12"
                                  r="10"
                                  stroke="currentColor"
                                  strokeWidth="4"
                                ></circle>
                                <path
                                  className="opacity-75"
                                  fill="currentColor"
                                  d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                                ></path>
                              </svg>
                            ) : null}
                            {loading
                              ? t("Invite_model.submit")
                              : t("Invite_model.accept_invitation_button")}
                          </button>
                        </div>
                      </Form>
                    )}
                  </Formik>
                </>
              )}

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
            </motion.div>
          </div>
        </div>
        {/* SVGs for background shapes */}
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

export default InviteLink;
