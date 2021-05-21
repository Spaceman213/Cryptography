import React, { Fragment } from "react";

function FlipSquare(props) {
  return(
    <div className = "flip-square" id = {props.id}></div>
  );
}

function FlipCard(props) {
  var id1 = "FS_0_" + props.cardNum + "_" + props.componentNum;
  var id2 = "FS_1_" + props.cardNum + "_" + props.componentNum;
  return(
    <Fragment>
      <FlipSquare
        id = {id1}
      />
      <FlipSquare
        id = {id2}
      />
    </Fragment>
  );
}

class FlipComponent extends React.Component {
  renderFlipCard(cardNum) {
    return(
      <FlipCard
        componentNum = {this.props.componentNum}
        cardNum = {cardNum}
      />
    );
  }
  render() {
    return(
      <Fragment>
        {this.renderFlipCard(0)}
        {this.renderFlipCard(1)}
      </Fragment>
    );
  }
}

class FlipBoard extends React.Component {
  renderFlipComponent(componentNum) {
    return (
      <FlipComponent 
        componentNum = {componentNum}
      />
    );
  }
  render() {
    return(
      <Fragment>
        {this.renderFlipComponent(0)}
      </Fragment>
    )
  }
}

export default FlipBoard;