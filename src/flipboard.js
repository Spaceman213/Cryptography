import React, { Fragment } from "react";

function FlipSquare(props) {
  return(
    <img src = {props.src} className = "flip-square" id = {props.id}></img>
  );
}

function FlipLayer(props) {
  var src1 = "./character-images/[" + props.symbol + "]t.png";
  var src2 = "./character-images/[" + props.symbol + "]b.png";
  var id1 = "t_" + props.symbol + "_" + props.row + "_" + props.column;
  var id2 = "b_" + props.symbol + "_" + props.row + "_" + props.column;
  return(
    <Fragment>
      <FlipSquare
        src = {src1}
        id = {id1}
      />
      <FlipSquare
        src = {src2}
        id = {id2}
      />
    </Fragment>
  );
}

class FlipComponent extends React.Component {
  renderFlipLayer(symbol) {
    return(
      <FlipLayer
        symbol = {symbol}
        row = {this.props.row}
        column = {this.props.column}
      />
    );
  }
  render() {
    return(
      <div>
        {this.renderFlipLayer("A")}
        {this.renderFlipLayer("B")}
        {this.renderFlipLayer("C")}
        {this.renderFlipLayer("D")}
        {this.renderFlipLayer("E")}
        {this.renderFlipLayer("F")}
        {this.renderFlipLayer("G")}
        {this.renderFlipLayer("H")}
        {this.renderFlipLayer("I")}
        {this.renderFlipLayer("J")}
        {this.renderFlipLayer("K")}
        {this.renderFlipLayer("L")}
        {this.renderFlipLayer("M")}
        {this.renderFlipLayer("N")}
        {this.renderFlipLayer("O")}
        {this.renderFlipLayer("P")}
        {this.renderFlipLayer("Q")}
        {this.renderFlipLayer("R")}
        {this.renderFlipLayer("S")}
        {this.renderFlipLayer("T")}
        {this.renderFlipLayer("U")}
        {this.renderFlipLayer("V")}
        {this.renderFlipLayer("W")}
        {this.renderFlipLayer("X")}
        {this.renderFlipLayer("Y")}
        {this.renderFlipLayer("Z")}
        {this.renderFlipLayer("1")}
        {this.renderFlipLayer("2")}
        {this.renderFlipLayer("3")}
        {this.renderFlipLayer("4")}
        {this.renderFlipLayer("5")}
        {this.renderFlipLayer("6")}
        {this.renderFlipLayer("7")}
        {this.renderFlipLayer("8")}
        {this.renderFlipLayer("9")}
        {this.renderFlipLayer("0")}
        {this.renderFlipLayer("ex")}
        {this.renderFlipLayer("as")}
        {this.renderFlipLayer("hash")}
        {this.renderFlipLayer("cash")}
        {this.renderFlipLayer("lpar")}
        {this.renderFlipLayer("rpar")}
        {this.renderFlipLayer("car")}
        {this.renderFlipLayer("min")}
        {this.renderFlipLayer("us")}
        {this.renderFlipLayer("add")}
        {this.renderFlipLayer("and")}
        {this.renderFlipLayer("eq")}
        {this.renderFlipLayer("sc")}
        {this.renderFlipLayer("colon")}
        {this.renderFlipLayer("mul")}
        {this.renderFlipLayer("squote")}
        {this.renderFlipLayer("dquote")}
        {this.renderFlipLayer("com")}
        {this.renderFlipLayer("per")}
        {this.renderFlipLayer("lbr")}
        {this.renderFlipLayer("rbr")}
        {this.renderFlipLayer("fslash")}
        {this.renderFlipLayer("bslash")}
        {this.renderFlipLayer("qm")}
        {this.renderFlipLayer("degree")}
        {this.renderFlipLayer("percent")}
        {this.renderFlipLayer("white")}
        {this.renderFlipLayer("red")}
        {this.renderFlipLayer("orange")}
        {this.renderFlipLayer("yellow")}
        {this.renderFlipLayer("green")}
        {this.renderFlipLayer("blue")}
        {this.renderFlipLayer("purple")}
      </div>
    );
  }
}

class FlipBoard extends React.Component {
  renderFlipComponent(row, column) {
    return (
      <FlipComponent 
        row = {row}
        column = {column}
      />
    );
  }
  render() {
    return(
      <Fragment>
        {this.renderFlipComponent(0,0)}
      </Fragment>
    )
  }
}

/*function Flipboard() {
  return (
    <div>Hello</div>
  );
}*/

export default FlipBoard;