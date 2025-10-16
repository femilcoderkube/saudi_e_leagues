import React from "react";
import { useTranslation } from "react-i18next";
import CustomCheckbox from "./CustomCheckbox";
import { getServerURL } from "../../utils/constant";
import { useSelector } from "react-redux";

const TeamSection = ({
  data,
  section,
  selectedItems,
  onCheckChange,
  noDataMessage,
}) => {
  const { t } = useTranslation();
  const { teamData } = useSelector((state) => state.tournament);

  return (
    <div className="mb-4">
      {data && data?.length > 0 ? (
        <div className="bg-[#05042C] border border-[#393B7A] rounded-lg px-3.5 py-3 space-y-4">
          {data?.map((item, idx) => (
            <div key={idx} className="flex items-center justify-between">
              <div className="flex items-center justify-between gap-3 w-full">
                <label
                  htmlFor={`${section}-checkbox-${idx}`}
                  className="flex items-center gap-3 cursor-pointer"
                >
                  <span className="w-10 h-10">
                    <img
                      src={
                        getServerURL(item?.image) ||
                        getServerURL(item?.profilePicture) ||
                        "https://randomuser.me/api/portraits/men/32.jpg"
                      }
                      alt={t(`tournament.sample_${section}_${idx + 1}`)}
                      className="w-full h-full rounded-full object-cover"
                    />
                  </span>
                  <div className="flex items-center flex-wrap sm:gap-6 gap-1">
                    <p className="text-[#F4F7FF] sm:text-xl text-base !font-bold leading-none">
                      {item?.name || item?.username || "-"}
                    </p>
                    {item.gameId && (
                      <p className="text-md text-[#8598F6] font-medium leading-none">
                        {item?.gameId || "-"}
                      </p>
                    )}
                  </div>
                </label>
                {(teamData?.userRole === "President" ||
                  teamData?.userRole === "Manager") && (
                  <CustomCheckbox
                    checked={selectedItems?.some(
                      (selected) => selected?.id === item?.id
                    )}
                    onChange={() => onCheckChange(section, item)}
                    ariaLabel={t(`tournament.select_${section}_aria`)}
                  />
                )}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-[#05042C] border border-[#393B7A] rounded-lg px-4 py-2.5 text-center text-[#7B7ED0] text-sm font-medium">
          {t(noDataMessage)}
        </div>
      )}
    </div>
  );
};

export default TeamSection;
