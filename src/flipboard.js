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
  renderFlipBoardRow(num) {
    var n = num * 16;
    return (
      <Fragment>
        {this.renderFlipComponent(0 + n)}
        {this.renderFlipComponent(1 + n)}
        {this.renderFlipComponent(2 + n)}
        {this.renderFlipComponent(3 + n)}
        {this.renderFlipComponent(4 + n)}
        {this.renderFlipComponent(5 + n)}
        {this.renderFlipComponent(6 + n)}
        {this.renderFlipComponent(7 + n)}
        {this.renderFlipComponent(8 + n)}
        {this.renderFlipComponent(9 + n)}
        {this.renderFlipComponent(10 + n)}
        {this.renderFlipComponent(11 + n)}
        {this.renderFlipComponent(12 + n)}
        {this.renderFlipComponent(13 + n)}
        {this.renderFlipComponent(14 + n)}
        {this.renderFlipComponent(15 + n)}
      </Fragment>
    );
  }
  render() {
    return(
      <Fragment>
        {this.renderFlipBoardRow(0)}
        {this.renderFlipBoardRow(1)}
        {this.renderFlipBoardRow(2)}
        {this.renderFlipBoardRow(3)}
      </Fragment>
    )
  }
}

export default FlipBoard;