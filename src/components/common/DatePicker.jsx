import React, { useState, useRef, useEffect } from 'react';

const DatePicker = ({
  label,
  value,
  onChange,
  minDate,
  maxDate,
  className = '',
  required = false,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [displayMonth, setDisplayMonth] = useState(value ? new Date(value) : new Date());
  const [dropdownPosition, setDropdownPosition] = useState({ top: 0, left: 0 });
  const containerRef = useRef(null);
  const dropdownRef = useRef(null);

  const formatDate = (date) => {
    if (!date) return '';
    const d = new Date(date);
    return d.toLocaleDateString('fr-FR', { day: '2-digit', month: '2-digit', year: 'numeric' });
  };

  const formatInputDate = (date) => {
    if (!date) return '';
    const d = new Date(date);
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDay = firstDay.getDay() === 0 ? 6 : firstDay.getDay() - 1;
    
    const days = [];
    
    // Previous month days
    const prevMonthDays = new Date(year, month, 0).getDate();
    for (let i = startingDay - 1; i >= 0; i--) {
      days.push({
        date: new Date(year, month - 1, prevMonthDays - i),
        isCurrentMonth: false,
      });
    }
    
    // Current month days
    for (let i = 1; i <= daysInMonth; i++) {
      days.push({
        date: new Date(year, month, i),
        isCurrentMonth: true,
      });
    }
    
    // Next month days
    const remainingDays = 42 - days.length;
    for (let i = 1; i <= remainingDays; i++) {
      days.push({
        date: new Date(year, month + 1, i),
        isCurrentMonth: false,
      });
    }
    
    return days;
  };

  const isDateDisabled = (date) => {
    if (minDate && date < new Date(minDate)) return true;
    if (maxDate && date > new Date(maxDate)) return true;
    return false;
  };

  const isToday = (date) => {
    const today = new Date();
    return date.toDateString() === today.toDateString();
  };

  const isSelected = (date) => {
    if (!value) return false;
    return date.toDateString() === new Date(value).toDateString();
  };

  const handleDateClick = (date) => {
    if (isDateDisabled(date)) return;
    onChange(formatInputDate(date));
    setIsOpen(false);
  };

  const navigateMonth = (delta) => {
    setDisplayMonth(new Date(displayMonth.getFullYear(), displayMonth.getMonth() + delta, 1));
  };

  // Update dropdown position when opening
  useEffect(() => {
    if (isOpen && containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      const dropdownHeight = 380; // Approximate dropdown height
      const viewportHeight = window.innerHeight;
      const viewportWidth = window.innerWidth;
      
      // Calculate if dropdown should open above or below
      const spaceBelow = viewportHeight - rect.bottom;
      const spaceAbove = rect.top;
      
      let top;
      if (spaceBelow >= dropdownHeight || spaceBelow >= spaceAbove) {
        // Open below
        top = rect.bottom + 8;
      } else {
        // Open above
        top = rect.top - dropdownHeight - 8;
      }
      
      // Ensure left position doesn't overflow viewport
      let left = rect.left;
      if (left + 288 > viewportWidth) {
        left = viewportWidth - 288 - 16;
      }
      
      setDropdownPosition({ top, left });
    }
  }, [isOpen]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      // Check if click is outside both the container AND the dropdown
      const isOutsideContainer = containerRef.current && !containerRef.current.contains(e.target);
      const isOutsideDropdown = dropdownRef.current && !dropdownRef.current.contains(e.target);
      
      if (isOutsideContainer && isOutsideDropdown) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const weekDays = ['Lu', 'Ma', 'Me', 'Je', 'Ve', 'Sa', 'Di'];
  const monthNames = ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 
                       'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'];

  return (
    <div ref={containerRef} className={`relative mb-4 ${className}`}>
      {label && (
        <label className="block text-sm font-semibold text-gray-300 mb-2 uppercase tracking-wide">
          {label}
          {required && <span className="text-accent-500 ml-1">*</span>}
        </label>
      )}
      
      {/* Input field */}
      <div
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full px-4 py-2.5 bg-dark-900 border border-dark-600 text-gray-100 
                   cursor-pointer transition-all duration-200 font-medium flex items-center justify-between
                   hover:border-primary-500/50 ${isOpen ? 'ring-2 ring-primary-500/50 border-primary-500' : ''}`}
        style={{
          clipPath: 'polygon(0 0, calc(100% - 6px) 0, 100% 6px, 100% 100%, 6px 100%, 0 calc(100% - 6px))',
        }}
      >
        <span className={value ? 'text-gray-100' : 'text-gray-500'}>
          {value ? formatDate(value) : 'Sélectionner une date'}
        </span>
        <svg 
          className={`w-5 h-5 text-gray-400 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      </div>
      
      {/* Calendar dropdown - using portal-like positioning to avoid clipping */}
      {isOpen && (
        <div 
          ref={dropdownRef}
          className="fixed z-[9999] w-72 bg-dark-900 border border-dark-600 shadow-2xl animate-fade-in"
          style={{
            clipPath: 'polygon(0 0, calc(100% - 8px) 0, 100% 8px, 100% 100%, 8px 100%, 0 calc(100% - 8px))',
            boxShadow: '0 4px 30px rgba(0, 0, 0, 0.6), 0 0 20px rgba(0, 212, 255, 0.1)',
            top: dropdownPosition.top,
            left: dropdownPosition.left,
          }}
        >
          {/* Header */}
          <div className="p-3 border-b border-dark-700 flex items-center justify-between">
            <button
              type="button"
              onClick={() => navigateMonth(-1)}
              className="p-1 text-gray-400 hover:text-primary-400 transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <span className="text-sm font-bold text-white uppercase tracking-wide font-display">
              {monthNames[displayMonth.getMonth()]} {displayMonth.getFullYear()}
            </span>
            <button
              type="button"
              onClick={() => navigateMonth(1)}
              className="p-1 text-gray-400 hover:text-primary-400 transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
          
          {/* Week days header */}
          <div className="grid grid-cols-7 p-2 gap-1">
            {weekDays.map((day) => (
              <div key={day} className="text-center text-xs font-semibold text-gray-500 uppercase py-1">
                {day}
              </div>
            ))}
          </div>
          
          {/* Days grid */}
          <div className="grid grid-cols-7 p-2 gap-1">
            {getDaysInMonth(displayMonth).map((day, index) => (
              <button
                key={index}
                type="button"
                onClick={() => handleDateClick(day.date)}
                disabled={isDateDisabled(day.date)}
                className={`
                  relative p-2 text-sm font-medium rounded transition-all duration-150
                  ${!day.isCurrentMonth ? 'text-gray-600' : 'text-gray-300'}
                  ${isToday(day.date) ? 'ring-1 ring-primary-500/50' : ''}
                  ${isSelected(day.date) 
                    ? 'bg-primary-600 text-white shadow-lg' 
                    : 'hover:bg-dark-700 hover:text-primary-400'}
                  ${isDateDisabled(day.date) ? 'opacity-30 cursor-not-allowed' : 'cursor-pointer'}
                `}
                style={isSelected(day.date) ? { boxShadow: '0 0 15px rgba(0, 212, 255, 0.4)' } : {}}
              >
                {day.date.getDate()}
              </button>
            ))}
          </div>
          
          {/* Today button */}
          <div className="p-2 border-t border-dark-700">
            <button
              type="button"
              onClick={() => {
                const today = new Date();
                setDisplayMonth(today);
                handleDateClick(today);
              }}
              className="w-full py-2 text-sm font-semibold text-primary-400 hover:bg-dark-800 
                         transition-colors uppercase tracking-wide"
            >
              Aujourd'hui
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DatePicker;
