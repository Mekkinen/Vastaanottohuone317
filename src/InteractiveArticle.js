import React, { Component } from "react";
import kuvitus1 from "./ZELDA_KUVITUS_psykiatri.gif";
import kuvitus2 from "./ZELDA_KUVITUS_potilas.gif";
import "./InteractiveArticle.css";
import { getChildTexts, GetButtonTexts, Child1M } from "./Story";

class InteractiveArticle extends Component {
  render() {
    return (
      <div className="InteractiveArticle">
        <div className="Article-header">
          <img
            src={kuvitus1}
            className="psychiatristImage"
            alt="psychiatristImage"
          />
          <p>Vastaanottohuone 317</p>
        </div>
        <ArticleList />
      </div>
    );
  }
}

// Contains all StoryComponents
class ArticleList extends Component {
  constructor(props) {
    super(props);
    this.state = { texts: [EmptyElem], numChildren: 0, nextButtonNum: 0 };
  }

  onAddStory = choiceNum => {
    // Get next texts and button
    let textArray = getChildTexts(this.state.nextButtonNum, choiceNum);
    let elemToAdd = textArray[0];
    let elemToAdd2 = textArray[1];
    let jumpToBtn = textArray[2];
    let paragraphs1 = [];
    let paragraphs2 = [];
    elemToAdd.forEach(elem =>
      paragraphs1.push(<p className="ArticleText">{elem}</p>)
    );
    elemToAdd2.forEach(elem =>
      paragraphs2.push(<p className="ArticleText">{elem}</p>)
    );

    // Update state
    this.state.texts.push([paragraphs1, paragraphs2, jumpToBtn]);
    this.setState(this.state);
    this.setState({
      numChildren: this.state.numChildren + 1,
      nextButtonNum: jumpToBtn
    });
  };

  render() {
    // Start paragraphs (Child1M)
    var startParagraphs = [];
    Child1M.forEach(elem =>
      startParagraphs.push(<p className="ArticleText">{elem}</p>)
    );

    // Map StoryComponents
    var onAdd = this.onAddStory;
    var storyNodes = this.state.texts.map(function(component, index) {
      return (
        <StoryComponent
          choiceComponent={component[0]}
          MComponent={component[1]}
          nextButtonNum={component[2]}
          key={index}
          addChild={onAdd}
        />
      );
    });

    return (
      <section>
        {startParagraphs}
        {storyNodes}
      </section>
    );
  }
}

/* Story Component
 - returns a comoponent of the story:
 text, possible pics and the next button 
 */

class StoryComponent extends Component {
  render() {
    // Kuvituskuva 2
    let renderPicture = false;
    this.props.nextButtonNum === 4
      ? (renderPicture = true)
      : (renderPicture = false);
    const Picture2 = (
      <img
        src={kuvitus2}
        className="psychiatristImage"
        alt="psychiatristImage"
      />
    );
    // Are we at the end?
    let isThisRefreshSymbol =
      this.props.nextButtonNum == 10 ? " fas fa-redo-alt the-end" : "";

    // Purkka-scroll
    var Scroll = require("react-scroll");
    var Element = Scroll.Element;
    var scroller = Scroll.scroller;

    return (
      <section>
        {this.props.choiceComponent}
        {renderPicture && Picture2}
        {isThisRefreshSymbol ? (
          <div className="the-end-container ArticleText">
            <a href="." className={isThisRefreshSymbol}> </a>
          </div>
        ) : (
          <div>{this.props.MComponent}</div>
        )}
        <Element name="myScrollToElement" />
        <ButtonComponent
          name="myScrollToElement"
          addChild={this.props.addChild}
          nextButtonNum={this.props.nextButtonNum}
          onClick={scroller.scrollTo("myScrollToElement", {
            duration: 1000,
            delay: 100,
            smooth: true
          })}
        />
      </section>
    );
  }
}

/* Button Component returns two buttons, which represent the choices that the reader can make.
 - if the next button number is 10, the story is over and no new buttons will be added
*/
class ButtonComponent extends Component {
  constructor(props) {
    super(props);
    this.state = { buttonsDisabled: false, notChosenButton: 0 };
  }
  disableBtn = num => {
    this.refs.btn.setAttribute("disabled", "disabled");
    this.refs.btn2.setAttribute("disabled", "disabled");
    this.setState({
      buttonsDisabled: true,
      notChosenButton: num
    });
  };
  render() {
    var addChildPointer = this.props.addChild;
    var disableBtnPointer = this.disableBtn;

    return this.props.nextButtonNum == "10" ? (
      ""
    ) : (
      <div className="ButtonComp">
        <p className="ArticleText">
          <button
            ref="btn"
            style={{ display: "block", marginBottom: 10 }}
            className={
              this.state.buttonsDisabled
                ? this.state.notChosenButton === 1
                  ? "disabled chosen"
                  : "disabled"
                : ""
            }
            onClick={function(event) {
              addChildPointer(0);
              disableBtnPointer(1);
            }}
          >
            {this.props.nextButtonNum !== undefined
              ? GetButtonTexts(this.props.nextButtonNum, 0)
              : GetButtonTexts(0, 0)}
          </button>
          <button
            ref="btn2"
            style={{ display: "block", marginBottom: 10 }}
            className={
              this.state.buttonsDisabled
                ? this.state.notChosenButton === 0
                  ? "disabled chosen"
                  : "disabled"
                : ""
            }
            onClick={function(event) {
              addChildPointer(1);
              disableBtnPointer(0);
            }}
          >
            {this.props.nextButtonNum !== undefined
              ? GetButtonTexts(this.props.nextButtonNum, 1)
              : GetButtonTexts(0, 1)}
          </button>
        </p>
      </div>
    );
  }
}

const EmptyElem = props => <section />;

export default InteractiveArticle;
