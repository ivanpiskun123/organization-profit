import React from 'react';
import NVD3Chart from 'react-nvd3';


const BarDiscreteChart = ({data}) => {
  return <NVD3Chart tooltip={{ enabled: true }} type="discreteBarChart" datum={data} x="label" y="value" height={500} showValues
                    margin = { { "top":10,"bottom":190} }  rotateLabels={-45}
  />;
};

export default BarDiscreteChart;
