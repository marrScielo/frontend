import { Calendar } from 'react-big-calendar';
import { dayjsLocalizer } from 'react-big-calendar';
import dayjs from 'dayjs';
export default function Calendario() {
 const localizer = dayjsLocalizer(dayjs);
  return (
    <div style={{
      height: '95vh',
      width: '70wh',
    }}>        
    <Calendar
      localizer={localizer}       
    />
    </div>
  );
}