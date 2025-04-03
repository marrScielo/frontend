import { Calendar } from 'react-big-calendar';
import { dayjsLocalizer } from 'react-big-calendar';
import dayjs from 'dayjs';
export default function Calendario() {
 const localizer = dayjsLocalizer(dayjs);
  return (
    <div className="calendario">        
    <Calendar
      localizer={localizer}
      style={{ height: 500 }}
      events={[]}
      defaultView="month"
      views={["month", "week", "day"]}
      step={30}
      showMultiDayTimes
      defaultDate={new Date()}
      onSelectEvent={(event) => console.log(event)} 

    />
    </div>
  );
}