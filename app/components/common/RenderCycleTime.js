import React from 'react';
import Moment from 'moment';

const RenderCycleTime = ({ cycle, ix }) => {
    let time = Moment(cycle.start_time).format('DD/MM/YY HH:mm');
    return (
      <td className="text-center" key={`start_time_col${ix}`}>
        <small>{time}</small>
      </td>
    );
};

export default RenderCycleTime;