/**
 * Created by happia.zhang on 2017/6/1.
 */
import {React, PropTypes, Table, Icon, isNil} from './vendor';

const BROKER_TYPES = {
  'ALL': '全部',
  'TP': '国利',
  'ICAP': '国际',
  'PATR': '平安',
  'BGC': '中诚',
  'TJXT': '信唐'
};

class BestBid extends React.Component {
  static propTypes = {
    data: PropTypes.array.isRequired
  };

  static defaultProps = {
    data: [
      {key: '1', broker: 'TP', shortName: '170210.IB', bidVol: '2000', bid: '4.25', ofr: '4.22', ofrVol: '1000'},
      {key: '2', broker: 'TP', shortName: '160213.IB', bidVol: '5000', ofr: '4.07', ofrVol: '2000'},
      {key: '3', broker: 'TP', shortName: '130814.SH', bidVol: '3000', bid: '3.87', ofr: '3.86', ofrVol: '3000'},
      {key: '4', broker: 'TP', shortName: '160310.IB', bidVol: '1000', ofrVol: '1000'},
      {key: '5', broker: 'TP', shortName: '13青国投MTN002', bidVol: '5000', bid: '3.98', ofr: '3.90', ofrVol: '2000'},
      {key: '6', broker: 'TP', shortName: '160307.IB', bid: '4.25', ofr: '4.20', ofrVol: '3000'},
      {key: '7', broker: 'TP', shortName: '135557.SH', bidVol: '5000', bid: '4.01', ofrVol: '5000'},
      {key: '8', broker: 'TP', shortName: '170210.IB', bidVol: '2000', bid: '4.25', ofr: '4.22', ofrVol: '1000'},
      {key: '9', broker: 'ICAP', shortName: '14青国投MTN002', bidVol: '3000', bid: '4.25', ofr: '4.22', ofrVol: '1000'},
      {key: '10', broker: 'ICAP', shortName: '160213.BJ', bidVol: '5000', ofr: '4.07', ofrVol: '4000'},
      {key: '11', broker: 'ICAP', shortName: '130814.SH', bidVol: '3000', bid: '3.87', ofr: '3.86', ofrVol: '3000'},
      {key: '12', broker: 'ICAP', shortName: '160310.IB', bidVol: '1000', ofrVol: '1000'},
      {key: '13', broker: 'ICAP', shortName: '13青国投MTN002', bidVol: '5000', bid: '3.98', ofr: '3.90', ofrVol: '2000'},
      {key: '14', broker: 'ICAP', shortName: '160307.IB', bid: '4.25', ofr: '4.20', ofrVol: '3000'},
      {key: '15', broker: 'ICAP', shortName: '135557.SH', bidVol: '5000', bid: '4.01', ofrVol: '5000'},
      {key: '16', broker: 'ICAP', shortName: '170210.IB', bidVol: '2000', bid: '4.25', ofr: '4.22', ofrVol: '1000'},
      {key: '17', broker: 'PATR', shortName: '170210.IB', bidVol: '2000', bid: '4.25', ofr: '4.22', ofrVol: '1000'},
      {key: '18', broker: 'PATR', shortName: '13中建MTN002', bidVol: '5000', ofr: '4.07', ofrVol: '2000'},
      {key: '19', broker: 'PATR', shortName: '130814.SH', bidVol: '3000', bid: '3.87', ofr: '3.86', ofrVol: '3000'},
      {key: '20', broker: 'PATR', shortName: '160310.IB', bidVol: '1000', ofrVol: '1000'},
      {key: '21', broker: 'PATR', shortName: '13青国投MTN002', bidVol: '5000', bid: '3.98', ofrVol: '2000'},
      {key: '22', broker: 'PATR', shortName: '160307.IB', bid: '4.25', ofr: '4.20', ofrVol: '3000'},
      {key: '23', broker: 'PATR', shortName: '135557.SH', bidVol: '5000', bid: '4.01', ofrVol: '5000'},
      {key: '24', broker: 'PATR', shortName: '170210.IB', bidVol: '2000', bid: '4.25', ofr: '4.22', ofrVol: '1000'},
      {key: '25', broker: 'BGC', shortName: '170210.BJ', bidVol: '2000', bid: '4.25', ofr: '4.22', ofrVol: '1000'},
      {key: '26', broker: 'BGC', shortName: '160213.IB', bidVol: '5000', ofr: '4.07', ofrVol: '2000'},
      {key: '27', broker: 'BGC', shortName: '130814.SH', bidVol: '3000', bid: '3.87', ofr: '3.86', ofrVol: '3000'},
      {key: '28', broker: 'BGC', shortName: '160310.IB', bidVol: '1000', ofrVol: '1000'},
      {key: '29', broker: 'BGC', shortName: '13青国投MTN002', bidVol: '5000', bid: '3.98', ofr: '3.90', ofrVol: '2000'},
      {key: '30', broker: 'BGC', shortName: '160307.IB', bid: '4.25', ofr: '4.20', ofrVol: '3000'},
      {key: '31', broker: 'BGC', shortName: '135557.SH', bidVol: '5000', bid: '4.01', ofrVol: '5000'},
      {key: '32', broker: 'BGC', shortName: '170210.IB', bidVol: '2000', bid: '4.25', ofr: '4.22', ofrVol: '1000'},
      {key: '33', broker: 'TJXT', shortName: '13中建MTN002', bidVol: '2000', bid: '3.92', ofr: '3.90', ofrVol: '3000'},
      {key: '34', broker: 'TJXT', shortName: '160213.IB', bidVol: '5000', ofr: '4.07', ofrVol: '2000'},
      {key: '35', broker: 'TJXT', shortName: '130814.SH', bidVol: '3000', bid: '3.87', ofr: '3.86', ofrVol: '3000'},
      {key: '36', broker: 'TJXT', shortName: '160310.IB', bidVol: '1000', ofrVol: '1000'},
      {key: '37', broker: 'TJXT', shortName: '13青国投MTN002', bidVol: '5000', bid: '3.98', ofr: '3.90', ofrVol: '2000'},
      {key: '38', broker: 'TJXT', shortName: '160307.IB', bid: '4.25', ofr: '4.20', ofrVol: '3000'},
      {key: '39', broker: 'TJXT', shortName: '135557.SH', bidVol: '5000', bid: '4.01', ofrVol: '5000'},
      {key: '40', broker: 'TJXT', shortName: '170210.IB', bidVol: '2000', bid: '4.25', ofr: '4.22', ofrVol: '1000'}
    ]
  };

  constructor(props) {
    super(props);
    this.state = {
      data: props.data,
      activeBroker: 'ALL'
    }
  }

  changeTab(activeBroker) {
    this.setState({activeBroker});
  }

  renderTab() {
    const {activeBroker} = this.state;
    const tabs = [];
    Object.keys(BROKER_TYPES).forEach((k) => {
      const props = {
        key: k,
        className: 'bid-tab-item ' + k
      };
      if (k === activeBroker) {
        props.className += ' active';
      } else {
        props.onClick = this.changeTab.bind(this, k);
      }
      tabs.push(<span {...props}>{BROKER_TYPES[k]}</span>);
    });
    return <div className='bid-tab'>{tabs}</div>;
  }

  setData() {
    const {data, activeBroker} = this.state;
    if (activeBroker === 'ALL') return data;
    return data.filter(d => d.broker === activeBroker);
  }

  setColumns() {
    return [
      {title: '', dataIndex: 'isMarked', width: 40, className: 'marked', render: this.renderMark, onCellClick: this.onMark},
      {title: '债券', dataIndex: 'shortName', className: 'bond'},
      {title: 'Vol.Bid', dataIndex: 'bidVol', width: 70, render: this.renderNumber},
      {title: 'Bid', dataIndex: 'bid', width: 65, className: 'bid', render: this.renderNumber},
      {title: 'Ofr', dataIndex: 'ofr', width: 65, className: 'ofr', render: this.renderNumber},
      {title: 'Vol.Ofr', dataIndex: 'ofrVol', width: 70, render: this.renderNumber}
    ];
  }

  renderMark = (text) => {
    const style = {
      fontSize: 16,
      color: isNil(text) || !text ? '#5e5f63' : '#f5b45f'
    };
    return <span style={style}><Icon type='star' /></span>;
  };

  onMark = (record) => {
    const {isMarked, key} = record;
    record.isMarked = !isMarked;

    let {data} = this.state;
    data = data.map((d) => {
      if (d.key === key) {
        return record;
      } else {
        return d;
      }
    });
    this.setState({data});
  };

  renderNumber = (text) => {
    return isNil(text) ? '--' : text;
  };

  renderTable() {
    return (
      <Table
        dataSource={this.setData()}
        columns={this.setColumns()}
        pagination={false}
        scroll={{y: 320}} />
    );
  }

  render() {
    return (
      <div className='best-bid'>
        <h4 className='bid-title'>最优报价</h4>
        {this.renderTab()}
        {this.renderTable()}
      </div>
    );
  }
}

export default BestBid;
