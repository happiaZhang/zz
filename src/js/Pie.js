import {React, PropTypes, echarts} from './vendor';

class Pie extends React.Component {
  static propTypes = {
    height: PropTypes.number,
    data: PropTypes.array,
    radius: PropTypes.oneOfType([
      PropTypes.array,
      PropTypes.number
    ]),
    tooltip: PropTypes.object
  };

  static defaultProps = {
    height: 210,
    data: [
      {value: 16, name: '国债', color: '#dc4444'},
      {value: 75, name: '金融债', color: '#dc6b35'},
      {value: 178, name: '短融', color: '#fbff1e'},
      {value: 97, name: '中票', color: '#7adc4e'},
      {value: 209, name: '企业债', color: '#25ba93'},
      {value: 16, name: '央票', color: '#4876cf'},
      {value: 75, name: '超短融', color: '#b26ed0'},
      {value: 178, name: '地方债', color: '#f04971'}
    ],
    radius: ['50%', '70%'],
    tooltip: {
      trigger: 'item',
      formatter: '{b} : {c}笔 ({d}%)'
    }
  };

  constructor(props) {
    super(props);
    this.state = {
      time: this.setTime()
    };
  }

  componentDidMount() {
    this.renderChart();
    this.interval = setInterval(() => {
      const time = this.setTime();
      this.setState({time});
    }, 1000);
  }

  componentWillUnmount() {
    echarts.dispose(this.pie);
    clearInterval(this.interval);
  }

  shouldComponentUpdate(nextProps, nextState) {
    return nextState.time !== this.state.time;
  }

  setTime = () => {
    const _now = new Date();
    return _now.toLocaleTimeString(undefined, {
      hour12: false,
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  renderChart = () => {
    const pie = echarts.init(this.pie);
    pie.setOption(this._option());
  };

  _option = () => {
    const {data, radius, tooltip} = this.props;
    const series = [{
      type: 'pie',
      radius: radius,
      data: data,
      label: {
        normal: {show: false},
        emphasis: {show: false}
      }
    }];
    const color = [];
    data.forEach(d => (color.push(d.color)));

    return {
      tooltip,
      series,
      color
    };
  };

  renderLegend() {
    const liz = [];
    const {data} = this.props;
    const sum = data.reduce((acc, d) => acc + d.value, 0);
    data.forEach((item) => {
      const {name, value, color} = item;
      const style = {background: color};
      liz.push(
        <li className='legend-item' key={name} >
          <span className='legend-shape' style={style} />
          <span className='legend-name'>{name}</span>
          <span className='legend-value'>{value} 笔</span>
          <span className='legend-value'>{(value / sum * 100).toFixed(2)} %</span>
        </li>
      );
    });
    return <ul className='pie-addon'>{liz}</ul>;
  }

  render () {
    const {height} = this.props;
    const {time} = this.state;
    return (
      <div className='pie'>
        <div className='pie-container'>
          <div ref={ref => (this.pie = ref)} style={{height: height}} />
          <div className='pie-time'>{time}</div>
        </div>
        {this.renderLegend()}
      </div>
    )
  }
}

export default Pie;
