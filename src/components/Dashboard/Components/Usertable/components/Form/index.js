import React from 'react'
import ReactDOM from 'react-dom'

export default class Form extends React.PureComponent {

    constructor(props) {
        super(props);
        this.containerEl = null;
        this.externalWindow = null;
        this.div1 = null;
      }

      componentDidMount() {
        // STEP 1: Create a new window, a div, and append it to the window. The div 
        // *MUST** be created by the window it is to be appended to (Edge only)
        this.externalWindow = window.open('', '', 'width=600,height=400,left=200,top=200');
        this.containerEl = this.externalWindow.document.createElement('div');
        this.containerEl.className = 'list';

        //create form elements
        let form = this.externalWindow.document.createElement('form');
        let div2 = this.externalWindow.document.createElement('div');
        div2.className = 'form-group';
        let input1 = this.externalWindow.document.createElement('input');
        input1.type = 'text';
        input1.placeholder = 'add text';


        //add form elements
        div2.appendChild(input1);
        form.appendChild(div2);


        let button = this.externalWindow.document.createElement('button');
        this.div1 = this.externalWindow.document.createElement('div');
        this.div1.innerText = this.props.user.name;
        button.innerText = "asdas";
        this.containerEl.appendChild(button);
        this.containerEl.appendChild(this.div1);
        // this.containerEl.innerText = this.props.user.name;
        this.externalWindow.document.body.appendChild(this.containerEl);
      }

      componentWillUnmount() {
        // STEP 2: This will fire when this.state.showWindowPortal in the parent component
        // becomes false so we tidy up by just closing the window
        this.externalWindow.close();
      }

      
    render() { 
        if (!this.containerEl) {
            return null;
          } 

          return ReactDOM.createPortal(this.props.children, this.containerEl);  
}
};