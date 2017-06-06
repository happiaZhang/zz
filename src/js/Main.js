import {React, PropTypes, Row, Col} from './vendor';
import Quote from './Quote';
import BestBid from './BestBid';
import BarStack from './BarStack';
import Pie from './Pie';

class Main extends React.Component {
  static propTypes = {
    quotes: PropTypes.array
  };

  static defaultProps = {
    quotes: [
      {id: 1, shortName: '14中铝业CP003', term: '5Y', rate: 'AA', bid: 3.68, ofr: 3.67, type: 'TKN', price: 3.65, time: '10:30'},
      {id: 2, shortName: '160001.IB', term: '5Y', bid: null, ofr: 3.98, type: 'GVN', price: null, time: '10:30'},
      {id: 3, shortName: '150012.IB', term: '3.29Y', bid: null, ofr: 3.99, type: 'GVN', price: 3.91, time: '10:30'},
      {id: 4, shortName: '160010.IB', term: '5Y', bid: null, ofr: 4.01, type: 'TRD', price: 4.00, time: '10:30'}
    ]
  };

  render() {
    const {quotes} = this.props;
    return (
      <div className='wrapper'>
        <div className='example'>
          <Row gutter={8}>
            {quotes.map((quote, i) => {
              return <Col key={i} span={6} className='example-border'><Quote quote={quote} /></Col>
            })}
            <Col className='example-border' span={12}><BestBid /></Col>
            <Col className='example-border' span={12}>
              <BarStack />
              <Pie />
            </Col>
          </Row>
        </div>
      </div>
    )
  }
}

export default Main;
