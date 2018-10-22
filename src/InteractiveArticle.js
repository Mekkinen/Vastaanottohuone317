import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import kuvitus1 from './ZELDA_KUVITUS_psykiatri.gif';
import kuvitus2 from './ZELDA_KUVITUS_potilas.gif';
import './InteractiveArticle.css';
import Child1M from './Story';
import Child1A from './Story';
import Child1B from './Story';
import Child2M from './Story';
import Child2A from './Story';
import Child2B from './Story';
import Child3M from './Story';
import Child3A from './Story';
import Child3B from './Story';
import Child4M from './Story';
import Child4A from './Story';
import Child4B from './Story';
import Child5M from './Story';
import Child5A from './Story';
import Child5B from './Story';


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
        <ProceedInArticle />
      </div>
    );
  }
}

class ProceedInArticle extends Component {
  constructor(props) {
    super(props);
    this.state = {currentChildren: [EmptyElem], currentChildNum: 0, numChildren:0};
  };

  render () {
    const ButtonsToAdd = props => (
      <ButtonComponent addChild={this.onAddChild}
                      numOfChildren={this.state.numChildren}>
      </ButtonComponent>
    );  
    const children = [];

    for (var i = 0; i < this.state.numChildren; i += 1) {

      if (this.state.currentChildren !== undefined) {
        this.state.currentChildren.forEach(ChildElem => {
          children.push(<ChildElem />);
        });
      }
    };

    return (
      <section>
        <Child1M/>
        <ButtonsToAdd/>
        {children}
      </section>
    );
  }
  onAddChild = (choiceNum) => {
    const ButtonsToAdd = props => (
      <ButtonComponent addChild={this.onAddChild}
                      numOfChildren={this.state.numChildren}>
      </ButtonComponent>
    );
    var elemToAdd = getChildTexts(this.state.currentChildNum, choiceNum)[0];
    var elemToAdd2 = getChildTexts(this.state.currentChildNum, choiceNum)[1];
    const btns = ButtonsToAdd;
    this.setState(prevState => ({
      currentChildren: [...prevState.currentChildren, elemToAdd]
    }));
    this.setState(prevState => ({
      currentChildren: [...prevState.currentChildren, elemToAdd2]
    }));
    this.setState(prevState => ({
      currentChildren: [...prevState.currentChildren, btns]
    }));
    this.setState({
      numChildren: this.state.numChildren + 1,
      currentChildNum: this.state.currentChildNum + 1
    });
    //console.log("state: " + this.state.currentChildNum + "  " + this.state.numChildren);
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
  <div className="card calculator">
    <p className="ArticleText">
          <button style={{display: 'block', marginBottom: 10}} 
            onClick={function(event){ props.addChild(0); /*props.addChild()*/ }}>
            {(props.numOfChildren !== undefined) ? GetButtonTexts(props.numOfChildren, 0) : GetButtonTexts(0, 0)}
          </button>
          <button style={{display: 'block', marginBottom: 10}} 
            onClick={function(event){ props.addChild(1); /*props.addChild()*/ }}>
            {(props.numOfChildren !== undefined) ? GetButtonTexts(props.numOfChildren, 1) : GetButtonTexts(0, 1)}
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

// Connect button choices to texts:
// ChildTexts[btnNum][choice] = main text + choice text
var ChildTexts = [];
ChildTexts[0] = [[Child1A, Child2M], [Child1B, Child2M]];
ChildTexts[1] = [[Child2A, Child3M], [Child2B, Child4M]];
ChildTexts[2] = [[Child3A, Child5M], [Child3B, TheEnd]];

function getChildTexts(buttonNum, choice) {
  console.log("buttonNum: " + buttonNum + ", choice: " + choice);
  var allText = ChildTexts[buttonNum][choice];
  return allText;
};

export default InteractiveArticle;
