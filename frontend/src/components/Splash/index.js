import React, { Component } from 'react';
import styles from '../../styles/Home.module.css';
import Gallery from 'react-grid-gallery';
import Intro from './Intro';
import Footer from './Footer';

const IMAGES = [
  {
    src:
      'https://static.wixstatic.com/media/a5a55c_996c287cfff84beda18f6b293332d582~mv2_d_3264_2448_s_4_2.jpg/v1/fill/w_1054,h_790,fp_0.50_0.50,q_90/a5a55c_996c287cfff84beda18f6b293332d582~mv2_d_3264_2448_s_4_2.webp?retry=1',
    thumbnail:
      'https://static.wixstatic.com/media/a5a55c_996c287cfff84beda18f6b293332d582~mv2_d_3264_2448_s_4_2.jpg/v1/fill/w_1054,h_790,fp_0.50_0.50,q_90/a5a55c_996c287cfff84beda18f6b293332d582~mv2_d_3264_2448_s_4_2.webp?retry=1',
    thumbnailWidth: 231,
    thumbnailHeight: 171,
    caption: 'Hello'
  },
  {
    src:
      'https://static.wixstatic.com/media/a5a55c_5a35fd4856bc4f6b884b1ddb323181d2~mv2_d_3264_2448_s_4_2.jpg/v1/fill/w_1054,h_790,fp_0.50_0.50,q_90/a5a55c_5a35fd4856bc4f6b884b1ddb323181d2~mv2_d_3264_2448_s_4_2.webp?retry=1',
    thumbnail:
      'https://static.wixstatic.com/media/a5a55c_5a35fd4856bc4f6b884b1ddb323181d2~mv2_d_3264_2448_s_4_2.jpg/v1/fill/w_1054,h_790,fp_0.50_0.50,q_90/a5a55c_5a35fd4856bc4f6b884b1ddb323181d2~mv2_d_3264_2448_s_4_2.webp?retry=1',
    thumbnailWidth: 320,
    thumbnailHeight: 212,
    caption: ''
  },

  {
    src:
      'https://static.wixstatic.com/media/a5a55c_5d548b93078646f6b86ceb84cd158e99~mv2_d_3024_4032_s_4_2.jpg/v1/fill/w_1054,h_1406,fp_0.50_0.50,q_90/a5a55c_5d548b93078646f6b86ceb84cd158e99~mv2_d_3024_4032_s_4_2.webp?retry=1',
    thumbnail:
      'https://static.wixstatic.com/media/a5a55c_5d548b93078646f6b86ceb84cd158e99~mv2_d_3024_4032_s_4_2.jpg/v1/fill/w_1054,h_1406,fp_0.50_0.50,q_90/a5a55c_5d548b93078646f6b86ceb84cd158e99~mv2_d_3024_4032_s_4_2.webp?retry=1',
    thumbnailWidth: 142,
    thumbnailHeight: 187
  },
  {
    src:
      'https://static.wixstatic.com/media/a5a55c_996c287cfff84beda18f6b293332d582~mv2_d_3264_2448_s_4_2.jpg/v1/fill/w_1054,h_790,fp_0.50_0.50,q_90/a5a55c_996c287cfff84beda18f6b293332d582~mv2_d_3264_2448_s_4_2.webp?retry=1',
    thumbnail:
      'https://static.wixstatic.com/media/a5a55c_996c287cfff84beda18f6b293332d582~mv2_d_3264_2448_s_4_2.jpg/v1/fill/w_1054,h_790,fp_0.50_0.50,q_90/a5a55c_996c287cfff84beda18f6b293332d582~mv2_d_3264_2448_s_4_2.webp?retry=1',
    thumbnailWidth: 231,
    thumbnailHeight: 171,
    caption: 'Hello'
  },
  {
    src:
      '../../images/volunteer_app/photo1.png',
    thumbnail:
      '../../images/volunteer_app/photo1.png',
    thumbnailWidth: 320,
    thumbnailHeight: 212,
    caption: ''
  },
  {
    src:
      'https://static.wixstatic.com/media/a5a55c_5a35fd4856bc4f6b884b1ddb323181d2~mv2_d_3264_2448_s_4_2.jpg/v1/fill/w_1054,h_790,fp_0.50_0.50,q_90/a5a55c_5a35fd4856bc4f6b884b1ddb323181d2~mv2_d_3264_2448_s_4_2.webp?retry=1',
    thumbnail:
      'https://static.wixstatic.com/media/a5a55c_5a35fd4856bc4f6b884b1ddb323181d2~mv2_d_3264_2448_s_4_2.jpg/v1/fill/w_1054,h_790,fp_0.50_0.50,q_90/a5a55c_5a35fd4856bc4f6b884b1ddb323181d2~mv2_d_3264_2448_s_4_2.webp?retry=1',
    thumbnailWidth: 320,
    thumbnailHeight: 212,
    caption: ''
  },
  {
    src:
      'https://static.wixstatic.com/media/a5a55c_5a35fd4856bc4f6b884b1ddb323181d2~mv2_d_3264_2448_s_4_2.jpg/v1/fill/w_1054,h_790,fp_0.50_0.50,q_90/a5a55c_5a35fd4856bc4f6b884b1ddb323181d2~mv2_d_3264_2448_s_4_2.webp?retry=1',
    thumbnail:
      'https://static.wixstatic.com/media/a5a55c_5a35fd4856bc4f6b884b1ddb323181d2~mv2_d_3264_2448_s_4_2.jpg/v1/fill/w_1054,h_790,fp_0.50_0.50,q_90/a5a55c_5a35fd4856bc4f6b884b1ddb323181d2~mv2_d_3264_2448_s_4_2.webp?retry=1',
    thumbnailWidth: 320,
    thumbnailHeight: 212,
    caption: ''
  },
  {
    src:
      'https://static.wixstatic.com/media/a5a55c_5a35fd4856bc4f6b884b1ddb323181d2~mv2_d_3264_2448_s_4_2.jpg/v1/fill/w_1054,h_790,fp_0.50_0.50,q_90/a5a55c_5a35fd4856bc4f6b884b1ddb323181d2~mv2_d_3264_2448_s_4_2.webp?retry=1',
    thumbnail:
      'https://static.wixstatic.com/media/a5a55c_5a35fd4856bc4f6b884b1ddb323181d2~mv2_d_3264_2448_s_4_2.jpg/v1/fill/w_1054,h_790,fp_0.50_0.50,q_90/a5a55c_5a35fd4856bc4f6b884b1ddb323181d2~mv2_d_3264_2448_s_4_2.webp?retry=1',
    thumbnailWidth: 320,
    thumbnailHeight: 212,
    caption: ''
  },
  {
    src:
      'https://static.wixstatic.com/media/a5a55c_5a35fd4856bc4f6b884b1ddb323181d2~mv2_d_3264_2448_s_4_2.jpg/v1/fill/w_1054,h_790,fp_0.50_0.50,q_90/a5a55c_5a35fd4856bc4f6b884b1ddb323181d2~mv2_d_3264_2448_s_4_2.webp?retry=1',
    thumbnail:
      'https://static.wixstatic.com/media/a5a55c_5a35fd4856bc4f6b884b1ddb323181d2~mv2_d_3264_2448_s_4_2.jpg/v1/fill/w_1054,h_790,fp_0.50_0.50,q_90/a5a55c_5a35fd4856bc4f6b884b1ddb323181d2~mv2_d_3264_2448_s_4_2.webp?retry=1',
    thumbnailWidth: 320,
    thumbnailHeight: 212,
    caption: ''
  },
  {
    src:
      'https://static.wixstatic.com/media/a5a55c_5a35fd4856bc4f6b884b1ddb323181d2~mv2_d_3264_2448_s_4_2.jpg/v1/fill/w_1054,h_790,fp_0.50_0.50,q_90/a5a55c_5a35fd4856bc4f6b884b1ddb323181d2~mv2_d_3264_2448_s_4_2.webp?retry=1',
    thumbnail:
      'https://static.wixstatic.com/media/a5a55c_5a35fd4856bc4f6b884b1ddb323181d2~mv2_d_3264_2448_s_4_2.jpg/v1/fill/w_1054,h_790,fp_0.50_0.50,q_90/a5a55c_5a35fd4856bc4f6b884b1ddb323181d2~mv2_d_3264_2448_s_4_2.webp?retry=1',
    thumbnailWidth: 320,
    thumbnailHeight: 212,
    caption: ''
  },
  {
    src:
      'https://static.wixstatic.com/media/a5a55c_5a35fd4856bc4f6b884b1ddb323181d2~mv2_d_3264_2448_s_4_2.jpg/v1/fill/w_1054,h_790,fp_0.50_0.50,q_90/a5a55c_5a35fd4856bc4f6b884b1ddb323181d2~mv2_d_3264_2448_s_4_2.webp?retry=1',
    thumbnail:
      'https://static.wixstatic.com/media/a5a55c_5a35fd4856bc4f6b884b1ddb323181d2~mv2_d_3264_2448_s_4_2.jpg/v1/fill/w_1054,h_790,fp_0.50_0.50,q_90/a5a55c_5a35fd4856bc4f6b884b1ddb323181d2~mv2_d_3264_2448_s_4_2.webp?retry=1',
    thumbnailWidth: 320,
    thumbnailHeight: 212,
    caption: ''
  },
  {
    src:
      'https://static.wixstatic.com/media/a5a55c_5a35fd4856bc4f6b884b1ddb323181d2~mv2_d_3264_2448_s_4_2.jpg/v1/fill/w_1054,h_790,fp_0.50_0.50,q_90/a5a55c_5a35fd4856bc4f6b884b1ddb323181d2~mv2_d_3264_2448_s_4_2.webp?retry=1',
    thumbnail:
      'https://static.wixstatic.com/media/a5a55c_5a35fd4856bc4f6b884b1ddb323181d2~mv2_d_3264_2448_s_4_2.jpg/v1/fill/w_1054,h_790,fp_0.50_0.50,q_90/a5a55c_5a35fd4856bc4f6b884b1ddb323181d2~mv2_d_3264_2448_s_4_2.webp?retry=1',
    thumbnailWidth: 320,
    thumbnailHeight: 212,
    caption: ''
  },
  {
    src:
      'https://static.wixstatic.com/media/a5a55c_5a35fd4856bc4f6b884b1ddb323181d2~mv2_d_3264_2448_s_4_2.jpg/v1/fill/w_1054,h_790,fp_0.50_0.50,q_90/a5a55c_5a35fd4856bc4f6b884b1ddb323181d2~mv2_d_3264_2448_s_4_2.webp?retry=1',
    thumbnail:
      'https://static.wixstatic.com/media/a5a55c_5a35fd4856bc4f6b884b1ddb323181d2~mv2_d_3264_2448_s_4_2.jpg/v1/fill/w_1054,h_790,fp_0.50_0.50,q_90/a5a55c_5a35fd4856bc4f6b884b1ddb323181d2~mv2_d_3264_2448_s_4_2.webp?retry=1',
    thumbnailWidth: 320,
    thumbnailHeight: 212,
    caption: ''
  },
  {
    src:
      'https://static.wixstatic.com/media/a5a55c_5a35fd4856bc4f6b884b1ddb323181d2~mv2_d_3264_2448_s_4_2.jpg/v1/fill/w_1054,h_790,fp_0.50_0.50,q_90/a5a55c_5a35fd4856bc4f6b884b1ddb323181d2~mv2_d_3264_2448_s_4_2.webp?retry=1',
    thumbnail:
      'https://static.wixstatic.com/media/a5a55c_5a35fd4856bc4f6b884b1ddb323181d2~mv2_d_3264_2448_s_4_2.jpg/v1/fill/w_1054,h_790,fp_0.50_0.50,q_90/a5a55c_5a35fd4856bc4f6b884b1ddb323181d2~mv2_d_3264_2448_s_4_2.webp?retry=1',
    thumbnailWidth: 320,
    thumbnailHeight: 212,
    caption: ''
  },
  {
    src:
      'https://static.wixstatic.com/media/a5a55c_5a35fd4856bc4f6b884b1ddb323181d2~mv2_d_3264_2448_s_4_2.jpg/v1/fill/w_1054,h_790,fp_0.50_0.50,q_90/a5a55c_5a35fd4856bc4f6b884b1ddb323181d2~mv2_d_3264_2448_s_4_2.webp?retry=1',
    thumbnail:
      'https://static.wixstatic.com/media/a5a55c_5a35fd4856bc4f6b884b1ddb323181d2~mv2_d_3264_2448_s_4_2.jpg/v1/fill/w_1054,h_790,fp_0.50_0.50,q_90/a5a55c_5a35fd4856bc4f6b884b1ddb323181d2~mv2_d_3264_2448_s_4_2.webp?retry=1',
    thumbnailWidth: 320,
    thumbnailHeight: 212,
    caption: ''
  },
];

class Splash extends Component {
  render() {
    return (
      <div>
        <Intro />
        <div className={styles.gallery}>
          <Gallery images={IMAGES} />
        </div>
        <Footer googleClick={this.props.onAuth} />
      </div>
    );
  }
}

export default Splash;
