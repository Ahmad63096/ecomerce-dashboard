// import React, { useState } from 'react';
// const Calendar = () => {
//   const [currentDate, setCurrentDate] = useState(new Date());

//   const handlePrevMonth = () => {
//     setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1));
//   };

//   const handleNextMonth = () => {
//     setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1));
//   };

//   const getDaysInMonth = (month, year) => {
//     return new Date(year, month + 1, 0).getDate();
//   };

//   const getFirstDayOfMonth = (month, year) => {
//     return new Date(year, month, 1).getDay();
//   };

//   const renderDays = () => {
//     const days = [];
//     const month = currentDate.getMonth();
//     const year = currentDate.getFullYear();
//     const daysInMonth = getDaysInMonth(month, year);
//     const firstDay = getFirstDayOfMonth(month, year);
//     const lastMonthDays = new Date(year, month, 0).getDate();
//     for (let i = firstDay - 1; i >= 0; i--) {
//       days.push(
//         <div key={`prev-${i}`} className="day previous-month">
//           {lastMonthDays - i}
//         </div>
//       );
//     }
//     for (let i = 1; i <= daysInMonth; i++) {
//       days.push(
//         <div key={`current-${i}`} className="day">
//           {i}
//         </div>
//       );
//     }
//     const totalDays = days.length; 
//     const totalWeeks = Math.ceil(totalDays / 7); 
//     const daysInNextMonth = totalWeeks * 7 - totalDays; 

//     for (let i = 1; i <= daysInNextMonth; i++) {
//       days.push(
//         <div key={`next-${i}`} className="day next-month">
//           {i}
//         </div>
//       );
//     }

//     return days;
//   };

//   return (
//     <div id="calendar">
//       <div id="header">
//         <button onClick={handlePrevMonth}>&#10094;</button>
//         <h2>
//           {currentDate.toLocaleString('default', { month: 'long' })} {currentDate.getFullYear()}
//         </h2>
//         <button onClick={handleNextMonth}>&#10095;</button>
//       </div>
//       <div id="daysOfWeek">
//         <div>S</div>
//         <div>M</div>
//         <div>T</div>
//         <div>W</div>
//         <div>T</div>
//         <div>F</div>
//         <div>S</div>
//       </div>
//       <div id="days">{renderDays()}</div>
//     </div>
//   );
// };

// export default Calendar;
import React from 'react';

function Calender() {
  return (
    <>
      <div className="calendar-container">
        <iframe
          src="https://calendar.google.com/calendar/embed?src=m.hamza%40chatpandas.com&ctz=Asia%2FKarachi"
          style={{ border: '0' }}
          width="100%"
          height="500"
          frameBorder="0"
          scrolling="yes"
          title="Google Calendar"
        ></iframe>
      </div>
    </>
  );
}

export default Calender;
