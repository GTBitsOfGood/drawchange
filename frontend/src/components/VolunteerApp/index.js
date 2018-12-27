import React, { Component } from 'react';
import { Row, Col, Progress } from 'reactstrap';
import PropTypes from 'prop-types';

import Step1 from './VolunteerInfoForm';
import Step2 from './ShortAnswerForm';
import Step3 from './EmploymentInfoForm';
import Step4 from './ReferenceForm';
import Step5 from './ICEForm';
import Step6 from './CriminalForm';
import Step7 from './PermissionsForm';
import FluidImage from './FluidImage';

import images from '../../images/volunteer_app';
// const defaultOnSubmit = (values, { setSubmitting }) => {
//   setTimeout(() => {
//     alert(JSON.stringify(values, null, 2));
//     setSubmitting(false);
//   }, 400);
// };

class VolunteerApp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      step: 1,
      data: {}
    };
  }
  steps = [Step1, Step2, Step3, Step4, Step5, Step6, Step7];

  onSubmit = formData => {
    if (this.state.step < this.steps.length) {
      this.setState(({ step, data }) => ({ step: step + 1, data: { ...data, ...formData } }));
    } else if (this.state.step === this.steps.length) {
      this.props.onSubmit({ ...this.state.data, ...formData });
    }
  };

  onBack = _ => this.setState(({ step }) => ({ step: step - 1 }));

  render() {
    const right_styles =
      window.innerWidth > 575 ? { margin: '65px 0px 10px 10px' } : { margin: '10px' };
    const CurrentStep = this.steps[this.state.step - 1];
    const currentImage = images[this.state.step - 1];
    const percent = Math.ceil(((this.state.step - 1) / this.steps.length) * 100) + 10;
    return (
      <Row>
        <Col xs={12} sm={4} md={{ size: 4, offset: 1 }}>
          <div style={right_styles}>
            <FluidImage src={currentImage} alt="volunteer app image" />
            <div className="text-center" style={{ marginTop: '10px' }}>
              {percent}% Done
            </div>
            <Progress value={percent} color="success" />
          </div>
        </Col>
        <Col
          xs={12}
          sm={8}
          md={6}
          style={{ height: '90vh', overflow: 'hidden', overflowY: 'scroll' }}
        >
          <CurrentStep initValues={this.state.data} onBack={this.onBack} onSubmit={this.onSubmit} />
        </Col>
      </Row>
    );
  }
}

VolunteerApp.propTypes = {
  onSubmit: PropTypes.func.isRequired
};

export default VolunteerApp;
