// Include the react-fusioncharts component
import ReactFC from 'react-fusioncharts-fix';

// Include the fusioncharts library
import FusionCharts from 'fusioncharts';

// Include the chart type
import charts from 'fusioncharts/fusioncharts.charts';

charts(FusionCharts);

const ChartComponent = ({ data, title, xlabel, ylabel }) => {
  const chartConfigs = {
    type: 'bar3d', // The chart type
    width: '100%', // Width of the chart
    height: '400', // Height of the chart
    dataFormat: 'json', // Data type
    dataSource: {
      // Chart Configuration
      chart: {
        caption: title,
        yAxisName: ylabel,
        xAxisName: xlabel,
        xAxisNameFontSize: '16px',
        yAxisNameFontSize: '16px',
        theme: 'fusion',
      },
      // Chart Data
      data,
    },
  };
  return <ReactFC {...chartConfigs} />;
};

export default ChartComponent;
