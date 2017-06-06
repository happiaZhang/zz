/**
 * Created by happia.zhang on 2017/6/1.
 */
import {React, PropTypes, Checkbox, echarts} from './vendor';

const INDICATOR_TYPES = {
  maturity: {name: '到期量', color: '#ffc96c'},
  option: {name: '预计行权量', color: '#b26ed1'},
  unknown: {name: '未知', color: '#25ba93'}
};

class BarStack extends React.Component {
  static propTypes = {
    height: PropTypes.number,
    xAxis: PropTypes.object,
    yAxis: PropTypes.object,
    tooltip: PropTypes.object,
    grid: PropTypes.object,
    seriesData: PropTypes.object
  };

  static defaultProps = {
    height: 200,
    xAxis: {
      type: 'category',
      data: ['2017', '2018', '2019', '2020', '2021', '2022', '2023', '2024', '2025', '2026', '未知'],
      axisLabel: {
        textStyle: {
          color: '#9ba1a4'
        }
      },
      splitLine: {
        show: true,
        lineStyle: {
          color: '#1e2726'
        }
      }
    },
    yAxis: {
      type: 'value',
      axisLabel: {
        textStyle: {
          color: '#9ba1a4'
        }
      },
      splitLine: {
        show: true,
        lineStyle: {
          color: '#1e2726'
        }
      }
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow'
      }
    },
    grid: {
      show: true,
      left: 40,
      top: 10,
      right: 20,
      bottom: 30,
      borderColor: '#1e2726'
    },
    seriesData: {
      maturity: [2.5, 5.4, 7.5, 20, 20, 8, 3, 5, 12, 28, 0],
      option: [0, 0, 25, 0, 0, 28, 0, 0, 0, 0, 0],
      unknown: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 25]
    }
  };

  constructor(props) {
    super(props);
    this.state = {
      checked: true
    };
  }
  componentDidMount() {
    this.renderChart();
  }

  componentDidUpdate() {
    this.renderChart(true);
  }

  componentWillUnmount() {
    echarts.dispose(this.chart);
  }

  _option = () => {
    const {
      xAxis,
      yAxis,
      tooltip,
      grid,
      seriesData
      } = this.props;
    const {checked} = this.state;
    const color = [];
    const series = Object.keys(INDICATOR_TYPES).filter((d) => {
      if (!checked) {
        return d !== 'option';
      } else {
        return true;
      }
    }).map((d) => {
      color.push(INDICATOR_TYPES[d].color);
      return {
        name: INDICATOR_TYPES[d].name,
        data: seriesData[d],
        type: 'bar',
        itemStyle: {normal: {label: {show: false, position: 'insideTop'}}},
        stack: '总量',
        barWidth: '50%'
      };
    });

    return {
      color,
      xAxis,
      yAxis,
      series,
      tooltip,
      grid
    };
  };

  handleClick = (e) => {
    const checked = e.target.checked;
    this.setState({checked});
  };

  renderChart = (notMerge = false) => {
    const barStack = notMerge ? echarts.getInstanceByDom(this.chart) : echarts.init(this.chart);
    barStack.setOption(this._option(), notMerge);
  };

  renderLegend = () => {
    const liz = [];
    Object.keys(INDICATOR_TYPES).forEach((k) => {
      const {name, color} = INDICATOR_TYPES[k];
      const style = {
        background: color
      };

      liz.push(
        <li key={k}>
          <span className='legend-shape' style={style} />
          <span className='legend-name'>{name}</span>
        </li>
      );
    });
    return <ul className='chart-legend'>{liz}</ul>;
  };

  render() {
    const {checked} = this.state;
    const {height} = this.props;
    return (
      <div className='chart-example'>
        <div className='chart-header'>
          <div className='chart-toolbar'>
            <Checkbox defaultChecked={checked} onChange={this.handleClick}>预计行权</Checkbox>
          </div>
          {this.renderLegend()}
        </div>
        <div style={{height: height}} ref={ref => (this.chart = ref)} />
      </div>
    )
  }
}
export default BarStack;
