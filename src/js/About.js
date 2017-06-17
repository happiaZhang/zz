import {React} from './vendor';

class About extends React.Component {
  render() {
    return (
      <div className='example'>
        <h2>行内元素margin、padding、border属性</h2>
        <p>
          <span className='inline-elm'>行内元素1</span>
          <span className='inline-elm'>行内元素2</span>
          <span className='inline-elm'>行内元素3</span>
        </p>
      </div>
    )
  }
}

export default About;
