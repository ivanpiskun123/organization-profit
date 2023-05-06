import React from 'react';
import NVD3Chart from 'react-nvd3';


const MultiBarChart = ({data}) => {

  return <NVD3Chart type="multiBarChart"
                    datum={data} x="x" y="y"
                    height={400} showValues
                    groupSpacing={0.2}
                    margin = { { "top":30,"bottom":50} }  rotateLabels={-45}
  />;
};

export default MultiBarChart;
