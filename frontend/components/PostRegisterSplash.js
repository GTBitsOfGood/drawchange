import React from 'react';
import Col from 'react-bootstrap/lib/Col';
import Image from 'react-bootstrap/lib/Image';
// Local Components

const PostRegisterSplash = () => (
  <div>
    <Col md={6} mdOffset={3}>
      <Image style={{ paddingLeft: "33%" }} src={"http://drawchange.org/wp-content/uploads/2014/02/LOGO_dc.png"} />
      <p>Thank you for submitting your volunteer application for drawchange. We review all our volunteer applications very closely and will notify you when your application status has been decided. Until then please feel free to follow us on social media or check out our website!</p>
    </Col>
  </div>
);


export default PostRegisterSplash;
