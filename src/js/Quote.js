import {React, PropTypes, Row, Col, isEmpty, isNil} from './vendor';

class Quote extends React.Component {
  static propTypes = {
    quote: PropTypes.object.isRequired
  };

  static defaultProps = {
    quote: {
      id: 1,
      shortName: '14中铝业CP003',
      term: '5Y',
      rate: 'AA',
      bid: 3.68,
      ofr: 3.67,
      type: 'TKN',
      price: 3.65,
      time: '10:30'
    }
  };

  renderHeader() {
    const {shortName} = this.props.quote;
    return (
      <div className='quote-header'>
        <h4>{shortName}</h4>
      </div>
    );
  }

  renderLabel() {
    const {term, rate} = this.props.quote;
    return (
      <div className='quote-label'>
        {isNil(term) ? '' : <span>{term}</span>}
        {isNil(rate) ? '' : <span>{rate}</span>}
      </div>
    );
  }

  renderInfo(price, type, isType = false) {
    const QUOTE_THEMES = {
      TKN: 'taken',
      GVN: 'given',
      TRD: 'trade'
    };

    let className = 'quote-info';
    if (isNil(price)) {
      className += ' none';
    } else {
      className += ' ' + QUOTE_THEMES[type];
    }

    return (
      <div className={className}>
        <span className='quote-type'>{isType ? type : ''}</span>
        <span className='quote-price'>{isNil(price) ? '--' : price.toFixed(2)}</span>
      </div>
    );
  }

  render() {
    const {quote} = this.props;
    if (isEmpty(quote)) {
      return <div hidden />
    }

    const {bid, ofr, type, price} = quote;
    return (
      <div className='quote'>
        {this.renderHeader()}
        <div className='quote-body'>
          {this.renderLabel()}
          <Row gutter={16}>
            <Col span={12}>
              {this.renderInfo(bid, 'TKN')}
            </Col>
            <Col span={12}>
              {this.renderInfo(ofr, 'GVN')}
            </Col>
          </Row>
          <div className='quote-time'>
            <label>10:30</label>
          </div>
          {this.renderInfo(price, type, true)}
          <div className='quote-time'>
            <label>10:30</label>
          </div>
        </div>
      </div>
    )
  }
}

export default Quote;
