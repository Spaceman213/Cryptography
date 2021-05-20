import React, { Fragment } from "react";

function BoardRow(props) {
  return (
    <div id = {props.id} className = "board-row"></div>
  );
}
function BoardColumn(props) {
  return (
    <div id = {props.id} className = "board-column"></div>
  );
}


function FlipSquare(props) {
  return(
    <img src = {props.src} className = "flip-square" id = {props.id}></img>
  );
}

function FlipLayer(props) {
  var src1 = "./character-images/[" + props.symbol + "]t.png";
  var src2 = "./character-images/[" + props.symbol + "]b.png";
  var id1 = "t_" + props.symbol + "_" + props.num;
  var id2 = "b_" + props.symbol + "_" + props.num;
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
        num = {this.props.num}
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
  renderFlipComponent(num) {
    return (
      <FlipComponent 
        num = {num}
      />
    );
  }
  renderBoardRow(num) {
    var id = "row" + num;
    return (
      <BoardRow
        id = {id}
      />
    )
  }
  renderBoardColumn(num) {
    var id = "col" + num;
    return (
      <BoardColumn
        id = {id}
      />
    )
  }
  render() {
    return(
      <Fragment>
        {this.renderFlipComponent(0)}
        {this.renderFlipComponent(1)}
        {this.renderFlipComponent(2)}
        {this.renderFlipComponent(3)}
        {this.renderFlipComponent(4)}
        {this.renderFlipComponent(5)}
        {this.renderFlipComponent(6)}
        {this.renderFlipComponent(7)}
        {this.renderFlipComponent(8)}
        {this.renderFlipComponent(9)}
        {this.renderFlipComponent(10)}
        {this.renderFlipComponent(11)}
        {this.renderFlipComponent(12)}
        {this.renderFlipComponent(13)}
        {this.renderFlipComponent(14)}
        {this.renderFlipComponent(15)}

        {this.renderFlipComponent(16)}
        {this.renderFlipComponent(17)}
        {this.renderFlipComponent(18)}
        {this.renderFlipComponent(19)}
        {this.renderFlipComponent(20)}
        {this.renderFlipComponent(21)}
        {this.renderFlipComponent(22)}
        {this.renderFlipComponent(23)}
        {this.renderFlipComponent(24)}
        {this.renderFlipComponent(25)}
        {this.renderFlipComponent(26)}
        {this.renderFlipComponent(27)}
        {this.renderFlipComponent(28)}
        {this.renderFlipComponent(29)}
        {this.renderFlipComponent(30)}
        {this.renderFlipComponent(31)}

        {this.renderFlipComponent(32)}
        {this.renderFlipComponent(33)}
        {this.renderFlipComponent(34)}
        {this.renderFlipComponent(35)}
        {this.renderFlipComponent(36)}
        {this.renderFlipComponent(37)}
        {this.renderFlipComponent(38)}
        {this.renderFlipComponent(39)}
        {this.renderFlipComponent(40)}
        {this.renderFlipComponent(41)}
        {this.renderFlipComponent(42)}
        {this.renderFlipComponent(43)}
        {this.renderFlipComponent(44)}
        {this.renderFlipComponent(45)}
        {this.renderFlipComponent(46)}
        {this.renderFlipComponent(47)}

        {this.renderFlipComponent(48)}
        {this.renderFlipComponent(49)}
        {this.renderFlipComponent(50)}
        {this.renderFlipComponent(51)}
        {this.renderFlipComponent(52)}
        {this.renderFlipComponent(53)}
        {this.renderFlipComponent(54)}
        {this.renderFlipComponent(55)}
        {this.renderFlipComponent(56)}
        {this.renderFlipComponent(57)}
        {this.renderFlipComponent(58)}
        {this.renderFlipComponent(59)}
        {this.renderFlipComponent(60)}
        {this.renderFlipComponent(61)}
        {this.renderFlipComponent(62)}
        {this.renderFlipComponent(63)}

        {this.renderBoardRow(0)}
        {this.renderBoardRow(1)}
        {this.renderBoardRow(2)}
        {this.renderBoardRow(3)}

        {this.renderBoardColumn(0)}
        {this.renderBoardColumn(1)}
        {this.renderBoardColumn(2)}
        {this.renderBoardColumn(3)}
        {this.renderBoardColumn(4)}
        {this.renderBoardColumn(5)}
        {this.renderBoardColumn(6)}
        {this.renderBoardColumn(7)}
        {this.renderBoardColumn(8)}
        {this.renderBoardColumn(9)}
        {this.renderBoardColumn(10)}
        {this.renderBoardColumn(11)}
        {this.renderBoardColumn(12)}
        {this.renderBoardColumn(13)}
        {this.renderBoardColumn(14)}
        {this.renderBoardColumn(15)}
        {this.renderBoardColumn(16)}
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