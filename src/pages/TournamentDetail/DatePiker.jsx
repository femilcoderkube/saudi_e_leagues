import React, { useState, useEffect } from 'react';
import { ChevronUp, ChevronDown } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { setShowCalendar, setDateRange } from '../../app/slices/constState/constStateSlice';

const TournamentDatepiker = ({ startDate: propStartDate, endDate: propEndDate, onUpdate }) => {
  const [currentDate, setCurrentDate] = useState(new Date(2025, 6, 17));
  const [startDate, setStartDate] = useState(propStartDate || null);
  const [endDate, setEndDate] = useState(propEndDate || null);
  const dispatch = useDispatch();
  
  // Get date range from Redux state
  const { selectedStartDate, selectedEndDate } = useSelector((state) => state.constState);

  useEffect(() => {
    // Initialize with Redux state if available, otherwise use props
    if (selectedStartDate && selectedEndDate) {
      setStartDate(new Date(selectedStartDate));
      setEndDate(new Date(selectedEndDate));
    } else {
      setStartDate(propStartDate || null);
      setEndDate(propEndDate || null);
    }
  }, [propStartDate, propEndDate, selectedStartDate, selectedEndDate]);

  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const weekDays = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];

  const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    const days = [];

    // Previous month days
    for (let i = 0; i < startingDayOfWeek; i++) {
      const prevMonthDay = new Date(year, month, -startingDayOfWeek + i + 1);
      days.push({
        date: prevMonthDay,
        isCurrentMonth: false
      });
    }

    // Current month days
    for (let day = 1; day <= daysInMonth; day++) {
      days.push({
        date: new Date(year, month, day),
        isCurrentMonth: true
      });
    }

    // Fill remaining cells with next month
    const remainingCells = 42 - days.length;
    for (let day = 1; day <= remainingCells; day++) {
      days.push({
        date: new Date(year, month + 1, day),
        isCurrentMonth: false
      });
    }

    return days;
  };

  const changeMonth = (increment) => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + increment, 1));
  };

  const handleDateClick = (clickedDate) => {
    if (!startDate || (startDate && endDate)) {
      setStartDate(clickedDate);
      setEndDate(null);
    } else if (clickedDate < startDate) {
      setStartDate(clickedDate);
      setEndDate(null);
    } else {
      setEndDate(clickedDate);
    }
  };

  const isSameDate = (date1, date2) => {
    return (
      date1?.getDate() === date2?.getDate() &&
      date1?.getMonth() === date2?.getMonth() &&
      date1?.getFullYear() === date2?.getFullYear()
    );
  };

  const isInRange = (date) => {
    return (
      startDate && endDate &&
      date >= startDate &&
      date <= endDate
    );
  };

  const handleReset = () => {
    setStartDate(null);
    setEndDate(null);
  };

  const handleUpdate = () => {
    dispatch(setShowCalendar(false));
    
    // Update Redux state with selected date range
    dispatch(setDateRange({
      startDate: startDate,
      endDate: endDate
    }));
    
    if (onUpdate) {
      onUpdate(startDate, endDate);
    }
  };

  const days = getDaysInMonth(currentDate);

  // Find which rows have in-range dates
  const rows = [];
  for (let i = 0; i < 35; i += 7) {
    rows.push(days.slice(i, i + 7));
  }

  return (
    <div className="datepiker-wp w-100 rounded-xl sm:px-6 py-6 px-4 text-white">
      {/* Header */}
      <div className="datepiker-head flex items-center justify-between mb-5 pb-6 relative">
        <h2 className="text-lg font-semibold text-[#F4F7FF]">
          {months[currentDate.getMonth()]}, {currentDate.getFullYear()}
        </h2>
        <div className="flex">
          <button 
            onClick={() => changeMonth(1)}
            className="p-1 hover:bg-slate-700 rounded transition-colors"
          >
            <ChevronUp size={16} />
          </button>
          <button 
            onClick={() => changeMonth(-1)}
            className="p-1 hover:bg-slate-700 rounded transition-colors"
          >
            <ChevronDown size={16} />
          </button>
        </div>
      </div>

      {/* Weekdays */}
      <div className="grid grid-cols-7 gap-1 mb-2">
        {weekDays.map((day) => (
          <div key={day} className="text-center text-sm text-[#F4F7FF] py-2">
            {day}
          </div>
        ))}
      </div>

      {/* Calendar Days */}
      {rows.map((row, rowIdx) => {
        // Check if this row contains any in-range date
        const rowHasRange = row.some(({ date }) => isInRange(date));
        return (
          <div
            key={rowIdx}
            className={`grid grid-cols-7 mb-1 `}
          >
            {row.map(({ date, isCurrentMonth }, colIdx) => {
              const isSelectedStart = isSameDate(date, startDate);
              const isSelectedEnd = isSameDate(date, endDate);
              const inRange = isInRange(date);
              let rangeClass = '';
              if (inRange) {
                if (isSelectedStart && isSelectedEnd) {
                  rangeClass = 'bg-blue-500 text-white rounded-lg';
                } else if (isSelectedStart) {
                  rangeClass = 'bg-blue-500 text-white rounded-l-lg';
                } else if (isSelectedEnd) {
                  rangeClass = 'bg-blue-500 text-white rounded-r-lg';
                } else {
                  rangeClass = 'bg-blue-500 text-white';
                }
              }
              return (
                <button
                  key={colIdx}
                  onClick={() => handleDateClick(date)}
                  className={`w-13 h-13 mb-1 md:text-lg text-sm transition-all duration-200
                    ${rangeClass}
                    ${!inRange && isSelectedStart || !inRange && isSelectedEnd
                      ? 'bg-gradient-to-b from-[#458CF3] to-[#4354EA] shadow-[inset_0px_4px_4px_0px_#FFFFFF3D] !text-[#141721] rounded-lg'
                      : ''}
                    ${!inRange && !isSelectedStart && !isSelectedEnd && isCurrentMonth
                      ? 'text-white hover:bg-blue-500 rounded-lg'
                      : ''}
                    ${!inRange && !isSelectedStart && !isSelectedEnd && !isCurrentMonth
                      ? 'text-[#687092] hover:bg-blue-400 rounded-lg'
                      : ''}
                  `}
                >
                  {date.getDate()}
                </button>
              );
            })}
          </div>
        );
      })}
      {/* Actions */}
      <div className="flex justify-end">
        <button 
          onClick={handleReset}
          className="px-8 py-3 text-[#9E9ECC] hover:text-white transition-colors text-base font-bold cursor-pointer"
        >
          Reset
        </button>
        <button 
          onClick={handleUpdate}
          className="update-btn px-[2.2rem] py-3 rounded-lg text-white text-base font-bold cursor-pointer"
        >
          Update
        </button>
      </div>
    </div>
  );
};

export default TournamentDatepiker;
