import React, { Component, PropTypes } from 'react';
import { Table } from 'react-bootstrap';

import FeatureRenderer from 'components/common/featureTestResults';
import RenderCycleId from 'components/common/RenderCycleId';
import RenderCycleTime from 'components/common/RenderCycleTime';
import RenderCycleSummary from 'components/common/RenderCycleSummary';
import RenderCycleCommits from 'components/common/RenderCycleCommits';

class HomePage extends Component {

  renderDashboard(){
   const data = this.model(this.props.cycles);

   return (
    <Table responsive className="table-unstyled">
      <tbody>
        <tr>
          <td></td>
          {data.headers.cycleIds}
        </tr>
        <tr>
          <td></td>
          {data.headers.startTimes}
        </tr>
        <tr>
          <td></td>
          {data.headers.summaries}
        </tr>
        <tr>
          <td></td>
          {data.headers.commits}
        </tr>
        {this.renderFeatureRows(data.featureRows)}
      </tbody>
    </Table>
	);
  }

  /**
   *
   * @param {Array} cycles - array of cycles as it returned from DB and found in store
   */
  model(cycles) {
      const data = cycles.reduce( (data, cycle, ix) => {
        data.headers.cycleIds.push(<RenderCycleId cycle={cycle} ix={ix} />);
        data.headers.startTimes.push(<RenderCycleTime cycle={cycle} ix={ix} />);
        data.headers.summaries.push(<RenderCycleSummary cycle={cycle} ix={ix} />);
        data.headers.commits.push(<RenderCycleCommits cycle={cycle} ix={ix} />);

        cycle.features.reduce( (map, feature) => {
           if (!map[feature.name]) {
             map[feature.name] = { name: feature.name, cycles: cycles };
           }
           return map;
        }, data.features);

        return data;
      }, {
        headers: {
          cycleIds: [],
          startTimes: [],
          summaries: [],
          commits: []
        },
        features: {},
        featureRows: []
      });

      Object.keys(data.features).sort().map(name => {
        data.featureRows.push(data.features[name]);
      });


      //handle covert to array and sorting of feartures
      // data.features =
      //   Object.keys(data.featureRows)
      //         .sort()
      //         .map( name => data.features[name] );

      return data;
  }


  /*
   {
     name: name of feature
     cycles: reference to all cycles
   }
   */
  renderFeatureRows(features) {
      return features.map((feature, i) => {
        const featureName = feature.name;
        const rowCells = [<td className="featureCol" key={`${featureName}_col`}>{featureName}</td>].concat(
          feature.cycles.map((cycle, inx) => {
            return (
              <FeatureRenderer key={`${featureName}${inx}`} cycle={cycle} featureName={featureName} />
            );
          })
        );
        return (<tr className="add-stripes" key={`${featureName}${i}`}>{rowCells}</tr>);
      });
  }

  render() {
    return (
				<div className="page home">
          {this.renderDashboard()}
				</div>
    );
  }
}

HomePage.propTypes = {
  cycles: PropTypes.array
};

export default HomePage;
