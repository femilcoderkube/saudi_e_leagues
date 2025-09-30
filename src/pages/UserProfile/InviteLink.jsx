import { useState } from "react";
import { motion } from "framer-motion";
import { IMAGES } from "../../components/ui/images/images";
import Select from "react-select"; // <-- Add this line

const InviteLink = () => {
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const staticCountryOptions = [
    { value: "india", label: "India" },
    { value: "usa", label: "USA" },
    { value: "canada", label: "Canada" },
    { value: "australia", label: "Australia" },
    { value: "germany", label: "Germany" },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <main dir="ltr" className="flex-1 lobby_page--wrapper">
      <>
        <div className="fixed inset-0 bg-[#09092d] z-40" />
        <div className="fixed inset-0 flex justify-center items-center z-50">
          <div className="match-makingwp overflow-hidden">
            <img
              className="left-league absolute -top-60 left-14 opacity-[8%]"
              src={IMAGES.center_league}
              alt=""
              style={{ width: "20rem" }}
            />
            <img
              className="left-bottom-league absolute xl:bottom-25 xl:left-80 md:bottom-15 md:left-60 opacity-[8%]"
              src={IMAGES.center_league}
              alt=""
              style={{ width: "5.5rem" }}
            />
            <img
              className="right-league absolute xl:top-20 xl:right-60 md:top-10 md:right-40 opacity-[8%]"
              src={IMAGES.center_league}
              alt=""
              style={{ width: "9.5rem" }}
            />
            <img
              className="right-bottom-league absolute bottom-[-8.5rem] right-[-6.3rem] opacity-[8%]"
              src={IMAGES.center_league}
              alt=""
              style={{ width: "20rem" }}
            />
          </div>
          <div className="flex flex-col gap-6">
            <motion.div
              className={`bg-[#121331] match_reg--popup !h-auto sd_before sd_after text-white p-6 rounded-xl w-full max-w-lg relative max-h-[80vh] overflow-y-auto overflow-x-hidden`}
              style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
              initial={{ scale: 0.5, opacity: 0, y: 50 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.5, opacity: 0, y: 50 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
            >
              <div className="text-center mb-5">
                <h2 className="text-xl font-bold mb-2">Reset Password</h2>
                {/* <p className="text-sm">
                  This is a static demo screen. Enter any values and click submit.
                </p> */}
              </div>
              {/* background: url(src/assets/images/mob-star-week-shape.webp); */}
              {/* background-size: 100% 100%;
    border-top: 1px solid #353c83;
    border-radius: 22px;
    border-bottom: 3px solid #353c83; */}
              <div className="!bg-[url(src/assets/images/mob-star-week-shape.webp)] !h-auto !w-full rounded-[22px] back px-4 py-3 mb-6 border-t-[#353c83] border-t-[1px] border-b-[3px] border-b-[#353c83] " style={{ backgroundSize: '100% 100%' }}>
                <div className="flex items-center gap-6 pb-3">
                  <div className="rounded-full overflow-hidden w-[5rem] h-[5rem]">
                    <img
                      src="https://randomuser.me/api/portraits/men/32.jpg"
                      alt="img"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <p className="font-bold text-white text-xl mb-1.5 block">
                      Team Name
                    </p>
                    {/* <p className="flex ">Members : <span className="ml-1 block text-md text-[#8598F6] font-medium">15</span></p> */}
                    {/* <p className="text-[#7B7ED0] text-base mb-1">
                    Phone: +1234567890
                  </p> */}
                    {/* Add more user details as needed */}
                  </div>
                </div>
                <hr className="border-[#51549B] pb-3" />
                <div className="grid grid-cols-2 gap-2 justify-between">
                  <p className="flex ">Members :<span className="ml-1 block text-md text-[#8598F6] font-medium">15</span></p>
                  <p className="flex justify-end pr-3">Country :<span className="ml-1 block text-md text-[#8598F6] font-medium">Saudi Arabia</span></p>
                </div>
              </div>
              <div className="!bg-[url(src/assets/images/mob-star-week-shape.webp)] !h-auto !w-full rounded-[22px] back px-4 py-3 mb-6 border-t-[#353c83] border-t-[1px] border-b-[3px] border-b-[#a1c4d1] " style={{ backgroundSize: '100% 100%' }}>
                <div className="flex items-center gap-6 ">
                  <div className="rounded-full overflow-hidden w-[5rem] h-[5rem]">
                    <img
                      src="https://randomuser.me/api/portraits/men/32.jpg"
                      alt="img"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <p className="font-bold text-white text-xl mb-1.5 block">
                      User Name
                    </p>
                    <p className="flex ">Score : <span className="ml-1 block text-md text-[#8598F6] font-medium">135</span></p>
                    {/* <p className="text-[#7B7ED0] text-base mb-1">
                    Phone: +1234567890
                  </p> */}
                    {/* Add more user details as needed */}
                  </div>
                </div>
                {/* <hr className="border-[#51549B] pb-3" />
                <div className="">
                  <p className="flex ">User Name : <span className="ml-1 block text-md text-[#8598F6] font-medium">UsersName123</span></p>
                </div> */}
              </div>
              <div className="text-start w-full pr-4 mb-6">
                <div className="custom_select2 sd_select--menu">
                  <label className="flex gap-4 items-center h-10 rounded cursor-pointer">
                    {("Select Game")}
                  </label>
                  <Select
                    value={selectedCountry}
                    onChange={(option) => setSelectedCountry(option)}
                    options={staticCountryOptions}
                    className="basic-multi-select"
                    classNamePrefix="select"
                    placeholder={("tourteam.select_nationality")}
                    menuPortalTarget={document.body}
                    styles={{
                      menuPortal: (base) => ({ ...base, zIndex: 9999 }),
                      control: (base) => ({
                        ...base,
                        backgroundColor: "#121331",
                        borderColor: "#7B7ED0",
                        color: "#7B7ED0",
                        boxShadow: "none",
                        minHeight: "40px",
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

                  {selectedCountry && (
                    <p className="text-green-600 text-sm mt-2">
                      Selected: {selectedCountry.label}
                    </p>
                  )}
                </div>
              </div>
              <form onSubmit={handleSubmit}>
                <div className="text-start w-full pr-4 mb-4">
                  <div className="relative">
                    <input
                      name="newPassword"
                      type="text"
                      className="sd_custom-input !w-full px-4 ltr:pr-10 rtl:pr-4 text-lg focus:outline-0 focus:shadow-none leading-none text-[#7B7ED0] !placeholder-[#7B7ED0]"
                      placeholder="Enter Game Id"
                    />
                  </div>
                </div>
                {/*              
                <div className="text-start w-full pr-4 mb-4">
                  <div className="relative">
                    <input
                      name="confirmPassword"
                      type={showConfirmPassword ? "text" : "password"}
                      className="sd_custom-input !w-full px-4 ltr:pr-10 rtl:pr-4 text-lg focus:outline-0 focus:shadow-none leading-none text-[#7B7ED0] !placeholder-[#7B7ED0]"
                      placeholder="Confirm new password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
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
                </div> */}
                {submitted && (
                  <div className="text-green-500 text-sm text-center mb-4">
                    Success! This is a static submission. No authentication or
                    validation was performed.
                  </div>
                )}

                <div className="pt-6 game_status--tab wizard_btn next_btn">
                  <button
                    type="submit"
                    className="py-2 px-4 justify-center flex items-center text-nowrap text-xl font-medium transition-all sd_after sd_before relative font_oswald hover:opacity-70 active-tab duration-300 polygon_border"
                    style={{ width: "10rem", height: "4rem" }}
                  >
                    Submit
                  </button>
                </div>
              </form>

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
