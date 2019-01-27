import React, { Component } from 'react';
import { Card, CardImg, CardText, CardBody, CardTitle, CardSubtitle, Button } from 'reactstrap';
import _ from 'lodash';


const VolunteerCard = ({name, email, interest}) => {
    return(
        <div>
          <Card>
            <CardImg top width="100%" src="https://placeholdit.imgix.net/~text?txtsize=33&txt=318%C3%97180&w=318&h=180" alt="Card image cap" />
            <CardBody>
              <CardTitle>{name}</CardTitle>
              <CardSubtitle>{email}</CardSubtitle>
              <CardText>{interest}</CardText>
              <Button>More</Button>
            </CardBody>
          </Card>
        </div>
    )
}

export default VolunteerCard; 