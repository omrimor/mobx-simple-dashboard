import React, { PropTypes } from 'react';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';

const RenderCycleId = ({ cycle, ix }) => {
  const getDuration = () => {
    if (cycle.duration_in_seconds) {
      let d = Number(cycle.duration_in_seconds);
      let h = Math.floor(d / 3600);
      let m = Math.floor(d % 3600 / 60);
      let s = Math.floor(d % 3600 % 60);
      let cycleDuration = '';
      if (h > 0) { cycleDuration = h + ' ' + 'hours '; }
      if (m > 0) { cycleDuration += m + ' ' + 'minutes '; }
      if (s > 0) { cycleDuration += 'and ' + s + ' secs'; }
      return (<p><strong>Duration: </strong> {cycleDuration}</p>);
    }
  };

  const tooltip = (
    <Tooltip id="tooltip">
      <p><strong>Status: </strong> {cycle.status}</p>
      {getDuration()}
    </Tooltip>
  );

  return (
    <td className="text-center" key={`cycle_id_col_${ix}`}>
      <OverlayTrigger placement="top" overlay={tooltip}>
      <div className={'status ' + cycle.status}>
        {cycle.cycle_id}
      </div>
      </OverlayTrigger>
    </td>
  );
};

RenderCycleId.propTypes = {
  cycle: PropTypes.object,
  ix: PropTypes.number
};

export default RenderCycleId;