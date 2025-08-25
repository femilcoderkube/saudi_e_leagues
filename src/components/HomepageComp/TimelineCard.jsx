import React from "react";
import splitBGOne from '../../assets/images/splitBG_1.png';
import splitBGTwo from '../../assets/images/spilit-purple-bg.png';
import splitBGThree from '../../assets/images/spilit-orange-bg.png';
import splitBGFour from '../../assets/images/spilit-pink-bg.png';
import { SparkIcon } from '../ui/svg'
import spilit_1 from "../../assets/images/spilit1.png";
import spilit_2 from "../../assets/images/spilit2.png";
import spilit_3 from "../../assets/images/spilit3.png";
import spilit_4 from "../../assets/images/spilit4.png";
import { useTranslation } from "react-i18next";

const TimelineCard = () => {
    const { t } = useTranslation();
    return (
        <div className="flex flex-wrap gap-x-8 gap-y-10">
            <div className="split_card--wrap relative sd_before sd_after polygon_border inline-block">
                <div className="spilit-card-polygon absolute h-full"></div>
                <div className="split_card--body relative">
                    <div className="absolute split_card--bg w-full h-full z-9" style={{ background: `url(${splitBGOne})`, backgroundSize: "auto", backgroundPosition: "left", opacity: "0.5" }}></div>
                    <img className="spilit-img absolute -right-14 -top-3 -z-1 h-[22rem] z-10" src={spilit_1} alt="" />
                    <div className="split_card--con relative z-20 w-[26.25rem] h-full flex flex-col justify-between pb-5">
                        <div className="relative -z-1 split_card-num pt-7">
                            <svg className="absolute" width="0" height="0" viewBox="0 0 360 128" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid meet">
                                <defs>
                                    <clipPath id="customClip">
                                        <path d="M0 128V24L24 0H360V20L352 28V52L360 60V88L336 112H16L0 128Z" />
                                    </clipPath>
                                </defs>
                                <rect width="100%" height="100%" fill="#88C6F3" clip-path="url(#customClip)" />
                            </svg>
                            <p className="flex items-center gap-5 pl-10">
                                <span className="text-[7.35rem] purple_grad-col grad_text-clip font-black">01</span>
                                <span className="uppercase text-[#B0D0F1] text-[2.501rem] -mt-4 font-black">Split</span>
                            </p>
                        </div>
                        <div className="spilit_head-wp pb-3">
                            <div className="split_head-con flex justify-between pl-10 border-b border-[#ffffff1f] pb-3">
                                <p className="flex gap-3 text-xl items-center">
                                    <SparkIcon gradientColor="#D8DAFF" /><span className="text-[#C0DEFF] font-semibold">{t("homepage.division_5")}</span>
                                </p>
                                <p className="flex gap-3 text-xl items-center">
                                    <SparkIcon gradientColor="#D8DAFF" /><span className="text-[#C0DEFF] font-semibold">Championship 5</span>
                                </p>
                            </div>
                            <div className="split_date-wrap flex justify-between pl-10">
                                <div className="split_date relative flex items-center">
                                    <p className="flex gap-2 text-xl p-2 items-center !font-bold">
                                        <span className="!font-black text-2xl">6</span> Apr
                                    </p>
                                    <span className="w-3 h-[0.188rem] bg-[#C0DEFF]"></span>
                                    <p className="flex gap-2 text-xl p-2 items-center !font-bold">
                                        <span className="!font-black text-2xl">4</span> Jun
                                    </p>
                                </div>
                                <div className="split_date relative flex items-center">
                                    <p className="flex gap-2 text-xl p-2 items-center !font-bold">
                                        <span className="!font-black text-2xl">11</span> May
                                    </p>
                                    <span className="w-3 h-[0.188rem] bg-[#C0DEFF]"></span>
                                    <p className="flex gap-2 text-xl p-2 items-center !font-bold">
                                        <span className="!font-black text-2xl">19</span> Jun
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <svg width="100%" height="100%" viewBox="0 0 660 320" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid meet" style={{ position: 'absolute' }}>
                    <defs>
                        <clipPath id="splitcardclip" clipPathUnits="objectBoundingBox">
                            <path transform="scale(0.001515, 0.003125)" d="M660 308V244L648 232V192L660 180V12L648 0H24L0 24V160L8 168V232L0 240V300L8 308H228L240 320H648L660 308Z" />
                        </clipPath>
                    </defs>
                </svg>
            </div>
            <div className="split_card--wrap-purple split_card--wrap relative sd_before sd_after polygon_border inline-block">
                <div className="spilit-card-polygon absolute h-full"></div>
                <div className="split_card--body relative">
                    <div className="absolute split_card--bg w-full h-full z-9" style={{ background: `url(${splitBGTwo})`, backgroundSize: "auto", backgroundPosition: "left", opacity: "0.5" }}></div>
                    <img className="spilit-img absolute -right-14 -top-3 -z-1 h-[22rem] z-10" src={spilit_2} alt="" />
                    <div className="split_card--con relative z-20 w-[26.25rem] h-full flex flex-col justify-between pb-5">
                        <div className="relative -z-1 split_card-num pt-7">
                            <svg className="absolute" width="0" height="0" viewBox="0 0 360 128" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid meet">
                                <defs>
                                    <clipPath id="customClip">
                                        <path d="M0 128V24L24 0H360V20L352 28V52L360 60V88L336 112H16L0 128Z" />
                                    </clipPath>
                                </defs>
                                <rect width="100%" height="100%" fill="#88C6F3" clip-path="url(#customClip)" />
                            </svg>
                            <p className="flex items-center gap-5 pl-10">
                                <span className="text-[7.35rem] purple_grad-col grad_text-clip font-black">01</span>
                                <span className="uppercase text-[#C5B9F4] text-[2.501rem] -mt-4 font-black">Split</span>
                            </p>
                        </div>
                        <div className="spilit_head-wp pb-3">
                            <div className="split_head-con flex justify-between pl-10 border-b border-[#ffffff1f] pb-3">
                                <p className="flex gap-3 text-xl items-center">
                                    <SparkIcon gradientColor="#D8DAFF" /><span className="text-[#C0DEFF] font-semibold">{t("homepage.division_5")}</span>
                                </p>
                                <p className="flex gap-3 text-xl items-center">
                                    <SparkIcon gradientColor="#D8DAFF" /><span className="text-[#C0DEFF] font-semibold">Championship 5</span>
                                </p>
                            </div>
                            <div className="split_date-wrap flex justify-between pl-10">
                                <div className="split_date relative flex items-center">
                                    <p className="flex gap-2 text-xl p-2 items-center !font-bold">
                                        <span className="!font-black text-2xl">6</span> Apr
                                    </p>
                                    <span className="w-3 h-[0.188rem] bg-[#C0DEFF]"></span>
                                    <p className="flex gap-2 text-xl p-2 items-center !font-bold">
                                        <span className="!font-black text-2xl">4</span> Jun
                                    </p>
                                </div>
                                <div className="split_date relative flex items-center">
                                    <p className="flex gap-2 text-xl p-2 items-center !font-bold">
                                        <span className="!font-black text-2xl">11</span> May
                                    </p>
                                    <span className="w-3 h-[0.188rem] bg-[#C0DEFF]"></span>
                                    <p className="flex gap-2 text-xl p-2 items-center !font-bold">
                                        <span className="!font-black text-2xl">19</span> Jun
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* --- card svg clip path here --- */}
                <svg width="100%" height="100%" viewBox="0 0 660 320" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid meet" style={{ position: 'absolute' }}>
                    <defs>
                        <clipPath id="splitcardclip" clipPathUnits="objectBoundingBox">
                            <path transform="scale(0.001515, 0.003125)" d="M660 308V244L648 232V192L660 180V12L648 0H24L0 24V160L8 168V232L0 240V300L8 308H228L240 320H648L660 308Z" />
                        </clipPath>
                    </defs>
                </svg>
            </div>
            <div className="split_card--wrap-orange split_card--wrap relative sd_before sd_after polygon_border inline-block">
                <div className="spilit-card-polygon absolute h-full"></div>
                <div className="split_card--body relative">
                    <div className="absolute split_card--bg w-full h-full z-9" style={{ background: `url(${splitBGThree})`, backgroundSize: "auto", backgroundPosition: "left", opacity: "0.5" }}></div>
                    <img className="spilit-img absolute -right-14 -top-3 -z-1 h-[22rem] z-10" src={spilit_3} alt="" />
                    <div className="split_card--con relative z-20 w-[26.25rem] h-full flex flex-col justify-between pb-5">
                        <div className="relative -z-1 split_card-num pt-7">
                            <svg className="absolute" width="0" height="0" viewBox="0 0 360 128" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid meet">
                                <defs>
                                    <clipPath id="customClip">
                                        <path d="M0 128V24L24 0H360V20L352 28V52L360 60V88L336 112H16L0 128Z" />
                                    </clipPath>
                                </defs>
                                <rect width="100%" height="100%" fill="#88C6F3" clip-path="url(#customClip)" />
                            </svg>
                            <p className="flex items-center gap-5 pl-10">
                                <span className="text-[7.35rem] purple_grad-col grad_text-clip font-black">01</span>
                                <span className="uppercase text-[#F1D3B0] text-[2.501rem] -mt-4 font-black">Split</span>
                            </p>
                        </div>
                        <div className="spilit_head-wp pb-3">
                            <div className="split_head-con flex justify-between pl-10 border-b border-[#ffffff1f] pb-3">
                                <p className="flex gap-3 text-xl items-center">
                                    <SparkIcon gradientColor="#D8DAFF" /><span className="text-[#C0DEFF] font-semibold">{t("homepage.division_5")}</span>
                                </p>
                                <p className="flex gap-3 text-xl items-center">
                                    <SparkIcon gradientColor="#D8DAFF" /><span className="text-[#C0DEFF] font-semibold">Championship 5</span>
                                </p>
                            </div>
                            <div className="split_date-wrap flex justify-between pl-10">
                                <div className="split_date relative flex items-center">
                                    <p className="flex gap-2 text-xl p-2 items-center !font-bold">
                                        <span className="!font-black text-2xl">6</span> Apr
                                    </p>
                                    <span className="w-3 h-[0.188rem] bg-[#C0DEFF]"></span>
                                    <p className="flex gap-2 text-xl p-2 items-center !font-bold">
                                        <span className="!font-black text-2xl">4</span> Jun
                                    </p>
                                </div>
                                <div className="split_date relative flex items-center">
                                    <p className="flex gap-2 text-xl p-2 items-center !font-bold">
                                        <span className="!font-black text-2xl">11</span> May
                                    </p>
                                    <span className="w-3 h-[0.188rem] bg-[#C0DEFF]"></span>
                                    <p className="flex gap-2 text-xl p-2 items-center !font-bold">
                                        <span className="!font-black text-2xl">19</span> Jun
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* --- card svg clip path here --- */}
                <svg width="100%" height="100%" viewBox="0 0 660 320" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid meet" style={{ position: 'absolute' }}>
                    <defs>
                        <clipPath id="splitcardclip" clipPathUnits="objectBoundingBox">
                            <path transform="scale(0.001515, 0.003125)" d="M660 308V244L648 232V192L660 180V12L648 0H24L0 24V160L8 168V232L0 240V300L8 308H228L240 320H648L660 308Z" />
                        </clipPath>
                    </defs>
                </svg>
            </div>
            <div className="split_card--wrap-pink split_card--wrap relative sd_before sd_after polygon_border inline-block">
                <div className="spilit-card-polygon absolute h-full"></div>
                <div className="split_card--body relative">
                    <div className="absolute split_card--bg w-full h-full z-9" style={{ background: `url(${splitBGFour})`, backgroundSize: "auto", backgroundPosition: "left", opacity: "0.5" }}></div>
                    <img className="spilit-img absolute -right-14 -top-3 -z-1 h-[22rem] z-10" src={spilit_4} alt="" />
                    <div className="split_card--con relative z-20 w-[26.25rem] h-full flex flex-col justify-between pb-5">
                        <div className="relative -z-1 split_card-num pt-7">
                            <svg className="absolute" width="0" height="0" viewBox="0 0 360 128" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid meet">
                                <defs>
                                    <clipPath id="customClip">
                                        <path d="M0 128V24L24 0H360V20L352 28V52L360 60V88L336 112H16L0 128Z" />
                                    </clipPath>
                                </defs>
                                <rect width="100%" height="100%" fill="#88C6F3" clip-path="url(#customClip)" />
                            </svg>
                            <p className="flex items-center gap-5 pl-10">
                                <span className="text-[7.35rem] purple_grad-col grad_text-clip font-black">01</span>
                                <span className="uppercase text-[#F1B0BB] text-[2.501rem] -mt-4 font-black">Split</span>
                            </p>
                        </div>
                        <div className="spilit_head-wp pb-3">
                            <div className="split_head-con flex justify-between pl-10 border-b border-[#ffffff1f] pb-3">
                                <p className="flex gap-3 text-xl items-center">
                                    <SparkIcon gradientColor="#D8DAFF" /><span className="text-[#C0DEFF] font-semibold">{t("homepage.division_5")}</span>
                                </p>
                                <p className="flex gap-3 text-xl items-center">
                                    <SparkIcon gradientColor="#D8DAFF" /><span className="text-[#C0DEFF] font-semibold">Championship 5</span>
                                </p>
                            </div>
                            <div className="split_date-wrap flex justify-between pl-10">
                                <div className="split_date relative flex items-center">
                                    <p className="flex gap-2 text-xl p-2 items-center !font-bold">
                                        <span className="!font-black text-2xl">6</span> Apr
                                    </p>
                                    <span className="w-3 h-[0.188rem] bg-[#C0DEFF]"></span>
                                    <p className="flex gap-2 text-xl p-2 items-center !font-bold">
                                        <span className="!font-black text-2xl">4</span> Jun
                                    </p>
                                </div>
                                <div className="split_date relative flex items-center">
                                    <p className="flex gap-2 text-xl p-2 items-center !font-bold">
                                        <span className="!font-black text-2xl">11</span> May
                                    </p>
                                    <span className="w-3 h-[0.188rem] bg-[#C0DEFF]"></span>
                                    <p className="flex gap-2 text-xl p-2 items-center !font-bold">
                                        <span className="!font-black text-2xl">19</span> Jun
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* --- card svg clip path here --- */}
                <svg width="100%" height="100%" viewBox="0 0 660 320" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid meet" style={{ position: 'absolute' }}>
                    <defs>
                        <clipPath id="splitcardclip" clipPathUnits="objectBoundingBox">
                            <path transform="scale(0.001515, 0.003125)" d="M660 308V244L648 232V192L660 180V12L648 0H24L0 24V160L8 168V232L0 240V300L8 308H228L240 320H648L660 308Z" />
                        </clipPath>
                    </defs>
                </svg>
            </div>
        </div>
    );
};

export default TimelineCard;