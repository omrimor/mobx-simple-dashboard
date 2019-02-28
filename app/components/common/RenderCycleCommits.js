import React from 'react';
import CommitRenderer from 'components/common/commits';

const RenderCycleCommits = ({ cycle, ix }) => {
  return (
      <td className="text-center" key={`cycle_id_col${ix}`}>
        <CommitRenderer cycle={cycle} />
      </td>
  );
};

export default RenderCycleCommits;