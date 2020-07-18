import React from 'react';
import ReactDOM from 'react-dom';

export default class Form extends React.PureComponent {

    constructor(props) {
        super(props);
        this.containerEl = null;
        this.externalWindow = null;
        this.divMain = null;
      }

      componentDidMount() {
        // STEP 1: Create a new window, a div, and append it to the window. The div 
        // *MUST** be created by the window it is to be appended to (Edge only)
        this.externalWindow = window.open('', '', 'width=600,height=400,left=200,top=200');
        this.containerEl = this.externalWindow.document.createElement('div');
        this.containerEl.className = 'list';


        //create import bootstrap
        let link1 = this.externalWindow.document.createElement('link');
        link1.rel = 'stylesheet';
        link1.href= 'https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/css/bootstrap.min.css';
        link1.integrity = 'sha384-9aIt2nRpC12Uk9gS9baDl411NQApFmC26EwAOH8WgZl5MYYxFfc+NcPb1dKGj7Sk';
        link1.crossOrigin = 'anonymous';
        this.externalWindow.document.head.appendChild(link1);

        //create form elements

        this.divMain = this.externalWindow.document.createElement('div');
        this.divMain.className = "container";
        this.divMain.innerText = "Edit user";
        //form
        let form = this.externalWindow.document.createElement('form');
        form.className = "container";
        form.onsubmit = this.props.editUser;
        //div
        let div1 = this.externalWindow.document.createElement('div', {className: 'form-group'});
        let div2 = this.externalWindow.document.createElement('div', {className: 'form-group'});  
        let div3 = this.externalWindow.document.createElement('div', {className: 'form-group'});
        let div4 = this.externalWindow.document.createElement('div', {className: 'form-group'});
        //label
        let label2 = this.externalWindow.document.createElement('label');
        label2.for = 'name';
        label2.innerText = 'Name';
        let label3 = this.externalWindow.document.createElement('label');
        label3.for = 'age';
        label3.innerText = 'Age';
        let label4 = this.externalWindow.document.createElement('label');
        label4.for = 'city';
        label4.innerText = 'City';
        //input
        let input1 = this.externalWindow.document.createElement('input');
        input1.type = 'hidden';
        input1.className = 'form-control';
        input1.id = 'id';
        input1.value = this.props.user.id;
        let input2 = this.externalWindow.document.createElement('input');
        input2.type = 'text';
        input2.className = 'form-control';
        input2.id = 'name';
        input2.value = this.props.user.name;
        let input3 = this.externalWindow.document.createElement('input');
        input3.type = 'text';
        input3.className = 'form-control';
        input3.id = 'age';
        input3.value = this.props.user.age;
        let input4 = this.externalWindow.document.createElement('input');
        input4.type = 'text';
        input4.className = 'form-control';
        input4.id = 'city';
        input4.value = this.props.user.city;

        //button
        let button = this.externalWindow.document.createElement('button');
        button.type = 'submit';
        button.className='btn btn-primary';
        button.innerText='Submit';

        //add form elements
        div2.appendChild(label2);
        div3.appendChild(label3);
        div4.appendChild(label4);
        div1.appendChild(input1);
        div2.appendChild(input2);
        div3.appendChild(input3);
        div4.appendChild(input4);
        form.appendChild(div1);
        form.appendChild(div2);
        form.appendChild(div3);
        form.appendChild(div4);
        form.appendChild(button);



        
  
        this.divMain.appendChild(form);
        this.containerEl.appendChild(this.divMain);
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