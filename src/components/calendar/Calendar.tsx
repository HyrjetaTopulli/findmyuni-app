import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { fetchCalendarEvents, setSelectedDate } from '../../redux/slices/calendarSlice';
import { Link } from 'react-router-dom';
import { useAppDispatch } from '../../hooks/useAppDispatch';

const Calendar: React.FC = () => {
  const dispatch = useAppDispatch();
  const { events, selectedDate, isLoading } = useSelector((state: RootState) => state.calendar);
  
  const [currentMonth, setCurrentMonth] = useState(new Date());
  
  useEffect(() => {
    dispatch(fetchCalendarEvents());
  }, [dispatch]);
  
  // Get events for the selected date
  const selectedDateEvents = events.filter(
    event => selectedDate && event.date.toDateString() === selectedDate.toDateString()
  );
  
  // Generate calendar days for the current month
  const generateCalendarDays = () => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    
    // Get the first day of the month
    const firstDay = new Date(year, month, 1);
    // Get the last day of the month
    const lastDay = new Date(year, month + 1, 0);
    
    // Calculate the number of days to show from the previous month
    const daysFromPrevMonth = firstDay.getDay();
    
    // Get the last day of the previous month
    const lastDayPrevMonth = new Date(year, month, 0).getDate();
    
    const days = [];
    
    // Add days from the previous month
    for (let i = daysFromPrevMonth - 1; i >= 0; i--) {
      days.push({
        date: new Date(year, month - 1, lastDayPrevMonth - i),
        isCurrentMonth: false,
      });
    }
    
    // Add days from the current month
    for (let i = 1; i <= lastDay.getDate(); i++) {
      days.push({
        date: new Date(year, month, i),
        isCurrentMonth: true,
      });
    }
    
    // Add days from the next month to fill the grid
    const remainingDays = 42 - days.length; // 6 rows x 7 days
    for (let i = 1; i <= remainingDays; i++) {
      days.push({
        date: new Date(year, month + 1, i),
        isCurrentMonth: false,
      });
    }
    
    return days;
  };
  
  const calendarDays = generateCalendarDays();
  
  // Check if a date has events
  const dateHasEvents = (date: Date) => {
    return events.some(event => event.date.toDateString() === date.toDateString());
  };
  
  // Navigate to the previous month
  const prevMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1));
  };
  
  // Navigate to the next month
  const nextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1));
  };
  
  // Format date for display
  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', { month: 'long', year: 'numeric' }).format(date);
  };
  
  if (isLoading) {
    return <div className="p-6 text-center">Loading calendar...</div>;
  }
  
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">University Calendar</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="flex justify-between items-center p-4 border-b">
              <button
                onClick={prevMonth}
                className="p-2 hover:bg-gray-100 rounded"
              >
                &lt;
              </button>
              <h2 className="text-xl font-bold">{formatDate(currentMonth)}</h2>
              <button
                onClick={nextMonth}
                className="p-2 hover:bg-gray-100 rounded"
              >
                &gt;
              </button>
            </div>
            
            <div className="grid grid-cols-7 text-center p-2 border-b">
              {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                <div key={day} className="py-2 font-semibold text-gray-600">
                  {day}
                </div>
              ))}
            </div>
            
            <div className="grid grid-cols-7 gap-1 p-2">
              {calendarDays.map((day, index) => {
                const isToday = day.date.toDateString() === new Date().toDateString();
                const isSelected = selectedDate && day.date.toDateString() === selectedDate.toDateString();
                const hasEvents = dateHasEvents(day.date);
                
                return (
                  <button
                    key={index}
                    className={`p-3 rounded-lg flex flex-col items-center ${
                      isSelected
                        ? 'bg-blue-600 text-white'
                        : isToday
                        ? 'bg-blue-100 text-blue-800'
                        : day.isCurrentMonth
                        ? hasEvents
                          ? 'bg-blue-50 hover:bg-blue-100'
                          : 'hover:bg-gray-100'
                        : 'text-gray-400 hover:bg-gray-50'
                    }`}
                    onClick={() => dispatch(setSelectedDate(day.date))}
                  >
                    <span>{day.date.getDate()}</span>
                    {hasEvents && !isSelected && (
                      <span className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-1"></span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
          
          <div className="mt-6 bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Announcements</h2>
            
            <div className="space-y-4">
              <div className="p-3 border-l-4 border-yellow-500 bg-yellow-50">
                <h3 className="font-semibold">Application Deadlines Approaching</h3>
                <p className="text-sm text-gray-700">
                  Don't miss the application deadlines for fall admissions. Many universities close applications on June 1st.
                </p>
              </div>
              
              <div className="p-3 border-l-4 border-green-500 bg-green-50">
                <h3 className="font-semibold">University Open Days</h3>
                <p className="text-sm text-gray-700">
                  Check out upcoming virtual and in-person open days in the calendar section.
                </p>
              </div>
              
              <div className="p-3 border-l-4 border-blue-500 bg-blue-50">
                <h3 className="font-semibold">Scholarship Opportunities</h3>
                <p className="text-sm text-gray-700">
                  New scholarship opportunities for international students have been posted. See details in the calendar.
                </p>
              </div>
            </div>
          </div>
        </div>
        
        <div>
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4">
              {selectedDate ? (
                <span>{selectedDate.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}</span>
              ) : (
                <span>Select a Date</span>
              )}
            </h2>
            
            {selectedDateEvents.length > 0 ? (
              <div className="space-y-4">
                {selectedDateEvents.map(event => {
                  let borderColor = '';
                  switch (event.type) {
                    case 'openDay':
                      borderColor = 'border-green-500';
                      break;
                    case 'applicationDeadline':
                      borderColor = 'border-red-500';
                      break;
                    case 'scholarshipExam':
                      borderColor = 'border-yellow-500';
                      break;
                    case 'meeting':
                      borderColor = 'border-blue-500';
                      break;
                    default:
                      borderColor = 'border-gray-500';
                  }
                  
                  return (
                    <div key={event.id} className={`p-4 border-l-4 ${borderColor} bg-gray-50 rounded-r`}>
                      <h3 className="font-semibold text-gray-800">{event.title}</h3>
                      <p className="text-sm text-gray-600 mb-2">
                        {event.date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
                      </p>
                      <p className="text-sm text-gray-700">{event.description}</p>
                      
                      {event.universityId && (
                        <div className="mt-2">
                          <Link
                            to={`/university-browser/${event.universityId}`}
                            className="text-blue-600 hover:underline text-sm"
                          >
                            View University
                          </Link>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            ) : selectedDate ? (
              <p className="text-gray-500 text-center py-6">No events for this date</p>
            ) : (
              <p className="text-gray-500 text-center py-6">Please select a date to view events</p>
            )}
          </div>
          
          <div className="mt-6 bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Event Legend</h2>
            
            <div className="space-y-3">
              <div className="flex items-center">
                <div className="w-4 h-4 bg-green-500 rounded-full mr-3"></div>
                <span>Open Days</span>
              </div>
              <div className="flex items-center">
                <div className="w-4 h-4 bg-red-500 rounded-full mr-3"></div>
                <span>Application Deadlines</span>
              </div>
              <div className="flex items-center">
                <div className="w-4 h-4 bg-yellow-500 rounded-full mr-3"></div>
                <span>Scholarship Exams</span>
              </div>
              <div className="flex items-center">
                <div className="w-4 h-4 bg-blue-500 rounded-full mr-3"></div>
                <span>Meetings</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Calendar;