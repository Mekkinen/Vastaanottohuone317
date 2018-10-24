import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import kuvitus1 from './ZELDA_KUVITUS_psykiatri.gif';
import kuvitus2 from './ZELDA_KUVITUS_potilas.gif';
import './InteractiveArticle.css';
import STORYEXP from './Story';

  // const { Child1M, Child1A, Child1B, Child2M, Child2A, Child2B, Child3M, Child3A, Child3B, Child4M, Child4A, Child4B, 
  //   Child5M, Child5A, Child5B, Child6M, Child6A, Child6B, Child7M, Child7A, Child7B } = STORYEXP;
const Child1M = STORYEXP[0];
const Child1A = STORYEXP[1];
const Child1B = STORYEXP[2];
const Child2M = STORYEXP[3];
const Child2A = STORYEXP[4];
const Child2B = STORYEXP[5];
const Child3M = STORYEXP[6];
const Child3A = STORYEXP[7];
const Child3B = STORYEXP[8];
const Child4M = STORYEXP[9];
const Child4A = STORYEXP[10];
const Child4B = STORYEXP[11];
const Child5M = STORYEXP[12];
const Child5A = STORYEXP[13];
const Child5B = STORYEXP[14];
const Child6M = STORYEXP[15];
const Child6A = STORYEXP[16];
const Child6B = STORYEXP[17];
const Child7M = STORYEXP[18];
const Child7A = STORYEXP[19];
const Child7B = STORYEXP[20];

class InteractiveArticle extends Component {
  render() {
    return (
      <div className="InteractiveArticle">
        <div className="Article-header">
          <img src={kuvitus1} className="psychiatristImage" alt="psychiatristImage" />
          <p>
            Vastaanottohuone 317
          </p>
        </div>
        <ArticleList />
      </div>
    );
  }
}

class ArticleList extends Component {
  constructor(props) {
    super(props);
    this.state = {currentChildren: [EmptyElem], numChildren: 0, nextButtonNum: 0 };
  };

  render () {

    const texts = [];
    for (var i = 0; i < this.state.numChildren; i += 1) {
      if (this.state.currentChildren !== undefined) {
        this.state.currentChildren.forEach(ChildElem => {
          texts.push(ChildElem);
        });
      }
    };

    var StartParagraphs = [];
    Child1M.forEach(elem => StartParagraphs.push(<p className="ArticleText">{elem}</p>));

    let renderPicture = false;
    (this.state.nextButtonNum === 3) ? renderPicture = true : renderPicture = false;
    const Picture2 = (<img src={kuvitus2} className="psychiatristImage" alt="psychiatristImage" />);

    return (
      <section>
        {StartParagraphs}
        {renderPicture && Picture2}
        {texts}
        <ButtonComponent addChild={this.onAddChild}
                      nextButtonNum={this.state.nextButtonNum}>
        </ButtonComponent>
      </section>
    );
  }
  onAddChild = (choiceNum) => {
    // Get chosen texts
    let textArray = getChildTexts(this.state.numChildren, choiceNum);
    let elemToAdd = textArray[0];
    let elemToAdd2 = textArray[1];
    let jumpToBtn = textArray[2];
    let paragraphs1 = [];
    elemToAdd.forEach(elem => paragraphs1.push(<p className="ArticleText">{elem}</p>));
    let paragraphs2 = [];
    elemToAdd2.forEach(elem => paragraphs2.push(<p className="ArticleText">{elem}</p>));

    // Update state
    this.setState(prevState => ({
      currentChildren: [...prevState.currentChildren, paragraphs1]
    }));
    this.setState(prevState => ({
      currentChildren: [...prevState.currentChildren, paragraphs2]
    }));
    this.setState({
      numChildren: this.state.numChildren + 1,
      nextButtonNum: jumpToBtn
    });
    console.log("state: " + this.state.numChildren + "  next btn: " + this.state.nextButtonNum);
  }
};

var ButtonTexts = [];
ButtonTexts[0] = ["En osaa sanoa, auttaako lääke.", "Kerron, että lääke ei auta."];
ButtonTexts[1] = ["Kerron, että pärjään.", "Sanon, että en luota itseeni."];
ButtonTexts[2] = ["Otan esille toiveeni saada puheapua.", "Ei ole."];
ButtonTexts[3] = ["Suostun sähköhoitoon pelostani huolimatta.", "En halua sähköhoitoa."];
ButtonTexts[4] = ["En voi luovuttaa vielä. Vaadin puheapua.", "Pysyn hiljaa. Eivät sanani merkitse mitään."];
ButtonTexts[5] = ["Ei käy!", "Pyydän psykiatrilta anteeksi."];
ButtonTexts[6] = ["Luotan psykiatrin arvioon.", "Kieltäydyn menemästä osastolle."];

function GetButtonTexts(buttonNum, selectedChoice) {
  return ButtonTexts[buttonNum][selectedChoice];
};

// Tried buttoncomp. as class because wanted to deactive them
// class ButtonComponent extends Component {
//   constructor(props) {
//     super(props);
//     this.deactive = this.deactivate.bind(this);
//     this.state = { active: true };
//   }
//   deactivate() {
//     this.className = "deactivatedBtn";
//   }
//   render() {
//     return (
//     <div className="card calculator">
//       <p className="ArticleText">
//             <button style={{display: 'block', marginBottom: 10}} 
//               onClick={function(event){ this.addChild(0); this.deactivate(); /*props.addChild()*/ }}>
//               {(this.props.numOfChildren !== undefined) ? GetButtonTexts(this.props.numOfChildren, 0) : GetButtonTexts(0, 0)}
//             </button>
//             <button style={{display: 'block', marginBottom: 10}} 
//               onClick={function(event){ this.addChild(1); /*props.addChild()*/ }}>
//               {(this.props.numOfChildren !== undefined) ? GetButtonTexts(this.props.numOfChildren, 1) : GetButtonTexts(0, 1)}
//             </button>
//       </p>
//     </div>
//     )};
//   }

const ButtonComponent = props =>
  (
  <div className="ButtonComp">
    <p className="ArticleText">
          <button style={{display: 'block', marginBottom: 10}} 
            onClick={function(event){ props.addChild(0); /*props.addChild()*/ }}>
            {(props.nextButtonNum !== undefined) ? GetButtonTexts(props.nextButtonNum, 0) : GetButtonTexts(0, 0)}
          </button>
          <button style={{display: 'block', marginBottom: 10}} 
            onClick={function(event){ props.addChild(1); /*props.addChild()*/ }}>
            {(props.nextButtonNum !== undefined) ? GetButtonTexts(props.nextButtonNum, 1) : GetButtonTexts(0, 1)}
          </button>
    </p>
  </div>
);

const EmptyElem = props => (
  <section>
  </section>
);

const TheEnd = props => (
  <section>
    <p className="ArticleText">
      LOPPU.
    </p>
    </section>
);


/* Create the story map
 Connect button choices to texts:
 ChildTexts[btnNum][choice] = main text, choice text, button to jump to 
*/

var ChildTexts = [];
ChildTexts[0] = [[Child1A, Child2M, 1], [Child1B, Child2M, 1]];
ChildTexts[1] = [[Child2A, Child3M, 2], [Child2B, Child4M, 3]];
ChildTexts[2] = [[Child3A, Child5M, 4], [Child3B, TheEnd, 10]];
ChildTexts[3] = [[Child4A, Child7M, 6], [Child4B, Child5M, 4]];
ChildTexts[4] = [[Child5A, Child6M, 5], [Child5B, TheEnd, 10]];
ChildTexts[5] = [[Child6A, TheEnd, 10], [Child6B, TheEnd, 10]];
ChildTexts[6] = [[Child7A, TheEnd, 10], [Child7B, TheEnd, 10]];

function getChildTexts(buttonNum, choice) {
  console.log("buttonNum: " + buttonNum + ", choice: " + choice);
  return ChildTexts[buttonNum][choice];
};

export default InteractiveArticle;
