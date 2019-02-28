import React from 'react';

const RenderCycleSummary = ({ cycle, ix }) => {
  let summary = { failed: 0, total: 0 };

  cycle.features.map((feature) => {
    let { failed, total } = feature.scenarios;
    summary.failed += failed;
    summary.total += total;
  });

  let className = 'btn-block btn ';
  className += (summary.failed) ? 'btn-danger' : 'btn-success';

  return (
    <td className="text-center" key={`_test_results_summary_col_${ix}`}>
      <span className={className}>
            {summary.failed + '(' + summary.total + ')'}
      </span>
    </td>
  );
};

export default RenderCycleSummary;