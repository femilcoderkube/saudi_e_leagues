import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { fetchGames } from "../../../app/slices/game/gamesSlice";
import { updateTeamMemberGame } from "../../../app/slices/TournamentTeam/TournamentTeamSlice";
import { toast } from "react-toastify";

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
            className="bg-gradient-to-br from-[#5e5e69] via-[#151642] to-[#0f0f2a] manage-popup match_reg--popup h-auto sd_before sd_after text-white rounded-2xl w-full max-w-2xl relative max-h-[85vh] py-8 overflow-x-hidden px-6 overflow-y-auto custom_scroll shadow-2xl shadow-black/50"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            <style jsx="true">{`
              .custom_scroll::-webkit-scrollbar {
                display: none;
              }
            `}</style>
            {/* Modal Header */}
            <div className="flex items-center justify-center mb-6 relative">
              <h2 className="text-2xl font-bold text-center text-white mb-2">
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
              {({ isSubmitting }) => (
                <Form>
                  <div className="mb-6">
                    <label className="block text-base text-white mb-2 !font-bold">
                      {t("roster.game_label")}
                    </label>
                    <Field
                      type="text"
                      name="game"
                      placeholder={t("roster.game_label")}
                      className="w-full bg-[#05042C] h-[56px] border border-[#393B7A] rounded-lg text-white text-sm outline-none px-4"
                    />
                    <ErrorMessage
                      name="game"
                      component="div"
                      className="text-red-500 text-sm mt-1"
                    />
                  </div>

                  <div className="mb-6">
                    <Field
                      as="select"
                      name="gameId"
                      className="w-full bg-[#05042C] h-[56px] border border-[#393B7A] rounded-lg text-white text-sm outline-none px-4"
                    >
                      <option value="" disabled>
                        {t("roster.game_id_placeholder")}
                      </option>
                      {games.length > 0 ? (
                        games.map((game) => (
                          <option key={game._id} value={game._id}>
                            {game.name}
                          </option>
                        ))
                      ) : (
                        <option value="" disabled>
                          {t("roster.no_games_available")}
                        </option>
                      )}
                    </Field>
                    <ErrorMessage
                      name="gameId"
                      component="div"
                      className="text-red-500 text-sm mt-1"
                    />
                  </div>

                  <hr className="border-[#51549B] pb-6" />

                  {/* Action Buttons */}
                  <div className="manage-team-pop wizard_step--btn gap-5 flex justify-between sm:mt-14 mt-8 mb-8 mr-5 flex-wrap">
                    <div className="game_status--tab wizard_btn back_btn">
                      <button
                        type="button"
                        onClick={onClose}
                        className="py-2 px-4 text-[0.938rem] font-semibold transition-all sd_after sd_before relative font_oswald hover:opacity-70 active-tab duration-300 polygon_border"
                        style={{ width: "8rem", height: "4rem" }}
                      >
                        {t("roster.cancel")}
                      </button>
                    </div>
                    <div className="game_status--tab wizard_btn next_btn">
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="py-2 px-4 justify-center flex items-center text-nowrap text-xl font-bold transition-all sd_after sd_before relative font_oswald hover:opacity-70 active-tab duration-300 polygon_border"
                        style={{ width: "8rem", height: "4rem" }}
                      >
                        {t("roster.confirm")}
                      </button>
                    </div>
                  </div>
                </Form>
              )}
            </Formik>
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
