import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { fetchGames } from "../../../app/slices/game/gamesSlice";
import {
  getTeamData,
  updateTeamMemberGame,
} from "../../../app/slices/TournamentTeam/TournamentTeamSlice";
import { toast } from "react-toastify";
import Select from "react-select";
import { getServerURL } from "../../../utils/constant";

const ManageRosterModal = ({ isOpen, onClose }) => {
  const { t } = useTranslation();
  const { games } = useSelector((state) => state.games);
  const user = useSelector((state) => state.auth.user);
  const { currentTeam } = useSelector((state) => state.tournamentTeam);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchGames());
  }, [dispatch]);

  const initialValues = {
    game: "",
    gameId: "",
  };

  const validationSchema = Yup.object({
    game: Yup.string().required(t("roster.game_required")),
    gameId: Yup.string().required(t("roster.game_id_required")),
  });

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      const res = await dispatch(
        updateTeamMemberGame({
          teamId: currentTeam?._id,
          userId: user?._id,
          game: values.gameId,
          gameId: values.game,
        })
      ).unwrap();
      resetForm();
      dispatch(getTeamData(user._id));
      toast.success(res?.message);
      onClose();
    } catch (err) {
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <>
      <div className="fixed popup-overlay inset-0 bg-black bg-opacity-60 backdrop-blur-sm z-40"></div>
      <div className="fixed inset-0 flex justify-center items-center z-50 h-full w-full p-4">
        <AnimatePresence>
          <motion.div
            initial={{ scale: 0.5, opacity: 0, y: 50 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.5, opacity: 0, y: 50 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="bg-gradient-to-br from-[#5e5e69] via-[#151642] to-[#0f0f2a] manage-popup match_reg--popup !h-auto sd_before sd_after text-white rounded-2xl w-full max-w-2xl relative max-h-[85vh] py-8 overflow-x-hidden px-6 overflow-y-auto custom_scroll shadow-2xl shadow-black/50"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            <style jsx="true">{`
              .custom_scroll::-webkit-scrollbar {
                display: none;
              }
            `}</style>
            {/* Modal Header */}
            <div className="flex items-center justify-center gap-2 mb-6 relative">
              <h2 className="sm:text-2xl text-lg font-bold text-center text-white">
                {t("roster.manage_roster_title")}
              </h2>
              <button
                aria-label={t("roster.close_button_aria")}
                onClick={onClose}
                type="button"
                className="cursor-pointer hover:opacity-70 duration-300 absolute right-0"
              >
                <svg width="18" height="18" fill="none" stroke="#7B7ED0">
                  <path d="M1 17L17 1M17 17L1 1" strokeWidth="1.5" />
                </svg>
              </button>
            </div>

            {/* Form Section */}
            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
            >
              {({ isSubmitting, values, setFieldValue }) => (
                <Form>
                  <div className="mb-4">
                    <label className="block text-base mb-2 !font-bold">
                      {t("roster.game_label")}
                    </label>
                    <Field
                      type="text"
                      name="game"
                      placeholder={t("roster.game_label")}
                      className="sd_custom-input !w-full px-4 py-2 mt-2 text-lg focus:outline-0 focus:shadow-none leading-none text-[var(--gray-color)] !placeholder-[var(--gray-color)] rounded"
                    />
                    <ErrorMessage
                      name="game"
                      component="div"
                      className="text-red-500 text-sm mt-1"
                    />
                  </div>

                  <div className="mb-6 custom_select2 sd_select--menu">
                    <label className="flex gap-4 items-center h-10 rounded !font-bold mb-2">
                      {t("roster.game_id_label")}
                    </label>

                    <Select
                      name="gameId"
                      value={
                        games
                          .map((g) => ({
                            value: g._id,
                            label: g.name,
                            logo: g.logo,
                          }))
                          .find((g) => g.value === values.gameId) || null
                      }
                      onChange={(option) =>
                        setFieldValue("gameId", option?.value || "")
                      }
                      options={games.map((game) => ({
                        value: game._id,
                        label: game.name,
                        logo: game.logo,
                        color: game.color,
                      }))}
                      className="basic-multi-select cursor-pointer"
                      classNamePrefix="select"
                      placeholder={t("roster.game_id_placeholder")}
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
                          minHeight: "56px",
                          cursor: "pointer",
                        }),
                        singleValue: (base) => ({ ...base, color: "#7B7ED0" }),
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
                      name="gameId"
                      component="div"
                      className="text-red-500 text-sm mt-1"
                    />
                  </div>

                  {/* <hr className="border-[#51549B] pb-6" /> */}

                  {/* Action Buttons */}
                  <div className="manage-team-pop wizard_step--btn gap-5 flex justify-end sm:mt-10 mt-6 mb-8 mr-5 flex-wrap">
                    <div className="game_status--tab wizard_btn back_btn">
                      <button
                        type="button"
                        onClick={onClose}
                        className="py-2 px-4 sm:text-xl text-base font-semibold transition-all sd_after sd_before relative font_oswald hover:opacity-70 active-tab duration-300 polygon_border"
                        style={{ width: "8rem", height: "4rem" }}
                      >
                        {t("roster.cancel")}
                      </button>
                    </div>
                    <div className="game_status--tab wizard_btn next_btn">
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="py-2 px-4 justify-center flex items-center text-nowrap sm:text-xl text-base font-bold transition-all sd_after sd_before relative font_oswald hover:opacity-70 active-tab duration-300 polygon_border"
                        style={{ width: "8rem", height: "4rem" }}
                      >
                        {t("roster.confirm")}
                      </button>
                    </div>
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
          </motion.div>
        </AnimatePresence>

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
    </>
  );
};

export default ManageRosterModal;
