import React from "react";
import { IMAGES } from "../../components/ui/images/images.js";
export default function TournamentsTeam() {
  return (
    <div className="team-page-wp flex md:gap-[3.813rem] gap-[2rem] w-full">
      <div className="relative team-content-left-wp">
      <div className="team_content-left max-w-[27.5rem] w-full h-[32.313rem] bg-[radial-gradient(100%_71.25%_at_50%_-14.46%,rgba(45,46,109,0.4416)_0%,rgba(34,35,86,0.384)_100%),radial-gradient(100%_110.56%_at_50%_-14.46%,rgba(67,109,238,0)_47.51%,rgba(67,109,238,0.12)_100%)] shadow-[inset_0px_2px_2px_0px_#5E5FB81F] backdrop-blur-[48px] shrink-0">
        <div className="relative polygon_border sd_before sd_after">
        <div className="team-user-wp w-full h-[10.25rem] bg-[linear-gradient(180deg,rgba(94,95,184,0.2)_0%,rgba(34,35,86,0.2)_125%)] shadow-[inset_0px_2px_2px_0px_#5E5FB81F] backdrop-blur-[48px] flex items-center gap-[1.125rem] p-[2.188rem]">
          <img
            className="rounded-full md:w-[5.688rem] md:h-[5.688rem] w-[3rem] h-[3rem]"
            src={IMAGES.defaultImg}
            alt=""
          />
          <div className="space-y-3 w-full">
            <h3 className="md:text-2xl text-lg font-bold text-[#F4F7FF]">Team Falcons</h3>
            <span className="flex justify-between">
              <h3 className="md:text-2xl text-lg font-bold text-[#F4F7FF]">FLCN</h3>
              <span className="self-end md:text-lg text-base font-semibold">
                04 Jan 2023
              </span>
            </span>
          </div>
        </div>
        </div>
        <div className="team-mange-wp px-10 flex items-center gap-4 mt-[2rem]">
            <div className="team-mange w-[10.75rem] h-auto md:px-5 md:py-4 p-4">
              <span className="text-[#7B7ED0] font-semibold text-base">
                Members
              </span>
              <div className="flex items-center gap-3 mt-2.5">
                <span className="font-semibold md:text-lg text-base">15</span>
              </div>
            </div>         
            <div className="team-mange w-[10.75rem] h-auto md:px-5 md:py-4 p-4">
              <span className="text-[#7B7ED0] font-semibold text-base">
                Country
              </span>
              <div className="flex items-center gap-3 mt-2.5">
                <img className="" src={IMAGES.country_us} alt="" />
                <span className="font-semibold md:text-lg text-base">
                  Saudi Arabia
                </span>
              </div>
            </div>
        </div>
        <ul className="team-social flex items-center justify-between gap-4 px-9 pt-8.5">
          <li>
            <a href="" className="p-2 inline-block">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M14.2882 10.1624L22.8505 0H20.8215L13.3869 8.82384L7.44888 0H0.600098L9.57953 13.3432L0.600098 24H2.6292L10.4803 14.6817L16.7513 24H23.6001L14.2877 10.1624H14.2882ZM11.5091 13.4608L10.5993 12.1321L3.36031 1.55962H6.47688L12.3188 10.0919L13.2286 11.4206L20.8225 22.5113H17.7059L11.5091 13.4613V13.4608Z"
                  fill="#F4F7FF"
                />
              </svg>
            </a>
          </li>
          <li>
            <a href="" className="p-2 inline-block">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M16.852 2.25271C20.1011 2.38267 21.6173 3.94224 21.7906 7.19134C21.8339 8.44766 21.8773 8.83755 21.8773 12.0433C21.8773 15.2491 21.8773 15.639 21.7906 16.8953C21.6606 20.1444 20.1444 21.6607 16.852 21.8339C15.5957 21.8773 15.2058 21.9206 12 21.9206C8.79422 21.9206 8.40433 21.9206 7.14802 21.8339C3.89892 21.704 2.38266 20.1444 2.20938 16.8953C2.16605 15.639 2.12274 15.2491 2.12274 12.0433C2.12274 8.83755 2.12273 8.44766 2.20938 7.19134C2.33934 3.94224 3.8556 2.42599 7.14802 2.25271C8.40433 2.20939 8.79422 2.16607 12 2.16607C15.2058 2.16607 15.5957 2.16606 16.852 2.25271ZM12 0C8.7509 0 8.31769 -1.32335e-06 7.06137 0.0866413C2.68592 0.303248 0.25992 2.68592 0.0866347 7.06137C0.0433134 8.36101 0 8.7509 0 12C0 15.2491 -7.93366e-06 15.6823 0.0866347 16.9386C0.303241 21.3141 2.68592 23.7401 7.06137 23.9134C8.36101 23.9567 8.7509 24 12 24C15.2491 24 15.6823 24 16.9386 23.9134C21.3141 23.6968 23.7401 21.3141 23.9134 16.9386C23.9567 15.639 24 15.2491 24 12C24 8.7509 24 8.31769 23.9134 7.06137C23.6967 2.68592 21.3141 0.259927 16.9386 0.0866413C15.6823 -1.32335e-06 15.2491 0 12 0ZM12 5.84838C8.57761 5.84838 5.84838 8.62094 5.84838 12C5.84838 15.4224 8.62093 18.1516 12 18.1516C15.4224 18.1516 18.1516 15.3791 18.1516 12C18.1516 8.62094 15.3791 5.84838 12 5.84838ZM12 16.0289C9.79061 16.0289 8.01444 14.2527 8.01444 12.0433C8.01444 9.83394 9.79061 8.05777 12 8.05777C14.2094 8.05777 15.9856 9.83394 15.9856 12.0433C15.9856 14.2094 14.2094 16.0289 12 16.0289ZM18.4116 4.15885C17.6318 4.15885 16.9819 4.80866 16.9819 5.58845C16.9819 6.36823 17.6318 7.01805 18.4116 7.01805C19.1913 7.01805 19.8412 6.36823 19.8412 5.58845C19.8412 4.80866 19.1913 4.15885 18.4116 4.15885Z"
                  fill="#F4F7FF"
                />
              </svg>
            </a>
          </li>
          <li>
            <a href="" className="p-2 inline-block">
              <svg
                width="22"
                height="24"
                viewBox="0 0 22 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M4.5837 0L0 4.28606V19.7139H5.4993V24L10.083 19.7139H13.7496L22 11.9993V0H4.5837ZM20.166 11.1419L16.4993 14.5704H12.8326L9.62445 17.5703V14.5704H5.4993V1.71362H20.166V11.1419Z"
                  fill="#F4F7FF"
                />
                <path
                  d="M17.4149 4.71346H15.5823V9.85564H17.4149V4.71346Z"
                  fill="#F4F7FF"
                />
                <path
                  d="M12.3741 4.71346H10.5415V9.85564H12.3741V4.71346Z"
                  fill="#F4F7FF"
                />
              </svg>
            </a>
          </li>
          <li>
            <a href="" className="p-2 inline-block">
              <svg
                width="20"
                height="22"
                viewBox="0 0 20 22"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M0.0999756 0H7.52497V4.88889H9.99994V2.44444H12.475V0H19.9V7.33333H17.4249V9.77775H14.95V12.2222H17.4249V14.6667H19.9V22H12.475V19.5556H9.99994V17.1111H7.52497V22H0.0999756V0Z"
                  fill="#F4F7FF"
                />
              </svg>
            </a>
          </li>
          <li>
            <a href="" className="p-2 inline-block">
              <svg
                width="24"
                height="20"
                viewBox="0 0 24 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M20.3179 2.36545C18.7877 1.66302 17.1481 1.14581 15.4327 0.849932C15.4012 0.844108 15.3698 0.858095 15.3546 0.887217C15.1439 1.26231 14.9098 1.75272 14.7468 2.13714C12.9021 1.86106 11.0668 1.86106 9.25945 2.13714C9.09525 1.7434 8.85302 1.26231 8.64107 0.887217C8.62477 0.859259 8.59334 0.845273 8.56306 0.849932C6.84885 1.14581 5.20802 1.66302 3.67781 2.36545C3.665 2.37127 3.65335 2.38059 3.6452 2.3934C0.533544 7.04363 -0.318923 11.5797 0.0991473 16.0598C0.101476 16.082 0.113124 16.1029 0.130592 16.1158C2.18368 17.6243 4.17274 18.5399 6.12451 19.1468C6.15596 19.1561 6.18856 19.1445 6.20836 19.1188C6.66952 18.4886 7.08177 17.8235 7.43462 17.1234C7.45559 17.0826 7.43461 17.0337 7.39269 17.0174C6.73938 16.7693 6.11867 16.4675 5.5201 16.1251C5.47235 16.0971 5.46888 16.0296 5.51196 15.9969C5.63773 15.9026 5.7635 15.8047 5.88345 15.7057C5.90557 15.6871 5.93584 15.6836 5.96146 15.6952C9.88946 17.4892 14.1424 17.4892 18.0238 15.6952C18.0494 15.6824 18.0797 15.6871 18.1018 15.7045C18.2218 15.8036 18.3475 15.9026 18.4745 15.9969C18.5175 16.0296 18.5152 16.0971 18.4675 16.1251C17.8701 16.4745 17.2482 16.7704 16.5937 17.0174C16.5506 17.0337 16.532 17.0826 16.553 17.1245C16.914 17.8235 17.3251 18.4875 17.7781 19.1188C17.7967 19.1456 17.8305 19.1573 17.8619 19.148C19.823 18.541 21.812 17.6254 23.8651 16.1169C23.8826 16.1041 23.8942 16.0831 23.8966 16.0622C24.3973 10.8831 23.0581 6.3843 20.3482 2.39574C20.3412 2.38292 20.3307 2.37244 20.3168 2.36661L20.3179 2.36545ZM8.0192 13.3317C6.83602 13.3317 5.86249 12.246 5.86249 10.9122C5.86249 9.57842 6.81856 8.49274 8.0192 8.49274C9.21984 8.49274 10.1957 9.5889 10.1759 10.9122C10.1759 12.246 9.21984 13.3317 8.0192 13.3317ZM15.9951 13.3317C14.812 13.3317 13.8384 12.246 13.8384 10.9122C13.8384 9.57842 14.7945 8.49274 15.9951 8.49274C17.1958 8.49274 18.1717 9.5889 18.1519 10.9122C18.1519 12.246 17.2063 13.3317 15.9951 13.3317Z"
                  fill="#F4F7FF"
                />
              </svg>
            </a>
          </li>
          <li>
            <a href="" className="p-2 inline-block">
              <svg
                width="12"
                height="24"
                viewBox="0 0 12 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M11.1853 12.9367L11.8168 8.77614H7.92632V6.07179C7.92632 4.93414 8.46947 3.8225 10.2063 3.8225H12V0.279536C10.9554 0.106836 9.89997 0.0134053 8.8421 0C5.64 0 3.54947 1.99576 3.54947 5.60373V8.77614H0V12.9367H3.54947V24H7.92632V12.9367H11.1853Z"
                  fill="#F4F7FF"
                />
              </svg>
            </a>
          </li>
          <li>
            <a href="" className="p-2 inline-block">
              <svg
                width="22"
                height="24"
                viewBox="0 0 22 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M15.7411 0C15.7411 0.356632 15.7745 0.707851 15.8361 1.04776C16.1325 2.61909 17.0663 3.96754 18.3635 4.80889C19.2692 5.39957 20.3427 5.73951 21.5 5.73951L21.4998 6.65889V9.86296C19.3528 9.86296 17.3625 9.17761 15.741 8.01853V16.4049C15.741 20.5897 12.3193 24 8.12053 24C6.49913 24 4.98947 23.4872 3.75384 22.6235C1.78588 21.2471 0.5 18.9737 0.5 16.4049C0.5 12.2145 3.91611 8.80987 8.11492 8.81535C8.46718 8.81535 8.80822 8.84325 9.1437 8.88787V9.86295L9.13142 9.86881L9.14365 9.86854V13.1005C8.81939 13.0002 8.47274 12.9389 8.11492 12.9389C6.19721 12.9389 4.63731 14.4936 4.63731 16.4049C4.63731 17.7367 5.39767 18.8901 6.50469 19.4753C6.51503 19.4894 6.52551 19.5034 6.53604 19.5173L6.55461 19.5417C6.54188 19.5172 6.52717 19.4932 6.51034 19.4697C6.99674 19.726 7.54464 19.8709 8.12614 19.8709C9.99903 19.8709 11.5311 18.3831 11.5981 16.5331L11.6037 0H15.7411Z"
                  fill="#F4F7FF"
                />
              </svg>
            </a>
          </li>
        </ul>
        <div className="relative mt-7 team-board flex items-center justify-between max-w-[22.5rem] py-6 px-10 rounded-lg w-full mx-auto bg-[linear-gradient(180deg,rgba(48,53,72,0.4)_0%,rgba(48,53,72,0.16)_100%),linear-gradient(85.43deg,rgba(31,116,78,0.12)_3.99%,rgba(31,116,78,0)_32.05%),linear-gradient(85.43deg,rgba(188,50,37,0)_67.72%,rgba(188,50,37,0.12)_100%)] border-t border-[rgba(255,255,255,0.06)] shadow-[0px_4px_12px_0px_#090C1633]">
          <div className="text-center">
            <h3 className="text-[#F4F7FF] text-2xl font-bold">
              1,034 <span className="text-base team-win">Wins</span>
            </h3>
          </div>
          <div className="text-center">
            <h3 className="text-[#F4F7FF] text-2xl font-bold">
            892 <span className="text-base team-loss">Losses</span>
            </h3>
          </div>
        </div>
      </div>
      </div>
      <div className="team_content-right w-full"></div>
      {/* team-bg svg*/}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 440 513"
        width="0"
        height="0"
        preserveAspectRatio="xMidYMid meet"
        role="img"
        aria-label="Decorative clipped shape"
        style={{ position: "absolute" }}
      >
        <defs>
          <clipPath id="clip0" clipPathUnits="userSpaceOnUse">
            <path d="M140 12H244L256 0H352L364 12V64L376 76H428L440 88V172L420 192V284L440 304V465L392 513H198L188 503H24L0 479V304L20 284V192L0 172V32L32 0H128L140 12Z" />
          </clipPath>
          <filter id="blurFilter" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation={12} result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
          <filter id="softShadow" x="-50%" y="-50%" width="200%" height="200%">
            <feDropShadow dx={0} dy={6} stdDeviation={10} floodOpacity={0.25} />
          </filter>
        </defs>
        <rect width="100%" height="100%" fill="transparent" />
        <g clipPath="url(#clip0)">
          <rect
            x={0}
            y={0}
            width={440}
            height={513}
            filter="url(#blurFilter)"
            fill="#000000"
          />
          <rect x={0} y={0} width={440} height={513} fill="#000" />
        </g>
        <path
          d="M140 12H244L256 0H352L364 12V64L376 76H428L440 88V172L420 192V284L440 304V465L392 513H198L188 503H24L0 479V304L20 284V192L0 172V32L32 0H128L140 12Z"
          fill="none"
          stroke="#000"
          strokeWidth={1}
          vectorEffect="non-scaling-stroke"
        />
      </svg>     
{/* team-top shape */}
<svg
    viewBox="0 0 440 160"
    xmlns="http://www.w3.org/2000/svg"
    width="0%"
    height="0%"
    style={{ position: "absolute" }}
  >
    <g clipPath="url(#clip0)">
      <path
        d="M140 12H244L256 0H352L364 12V64L376 76H428L440 88V136L428 148H212L200 160H32L0 128V32L32 0H128L140 12Z"
        fill="url(#gradient0)"
      />
    </g>
    <path
      d="M140 12H244L256 0H352L364 12V64L376 76H428L440 88V136L428 148H212L200 160H32L0 128V32L32 0H128L140 12Z"
      fill="black"
      fillOpacity={0.2}
    />
    <defs>
      <clipPath id="team-top">
        <path d="M140 12H244L256 0H352L364 12V64L376 76H428L440 88V136L428 148H212L200 160H32L0 128V32L32 0H128L140 12Z" />
      </clipPath>
      <linearGradient
        id="gradient0"
        x1={92.6316}
        y1={0}
        x2={92.6316}
        y2={171.429}
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#00178C" stopOpacity={0.92} />
        <stop offset={1} stopColor="#2A54FF" />
      </linearGradient>
      <filter
        id="innerShadow"
        x={0}
        y={0}
        width={440}
        height={160}
        filterUnits="userSpaceOnUse"
      >
        <feOffset dy={2} />
        <feGaussianBlur stdDeviation={6} />
        <feComposite in2="SourceAlpha" operator="arithmetic" k2={-1} k3={1} />
        <feColorMatrix
          type="matrix"
          values="0 0 0 0 0.115 0 0 0 0 0.774 0 0 0 0 0.587 0 0 0 0.24 0"
        />
      </filter>
    </defs>
  </svg>
    </div>
  );
}
