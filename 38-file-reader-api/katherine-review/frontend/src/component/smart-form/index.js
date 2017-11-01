import React from 'react';
import * as util from '../../lib/util.js';

let isBooleanType = (type) => type === 'checkbox' || type === 'radio';
let isInput = (type) => type === 'input' || type == 'select' || type == 'textarea';

class Form extends React.Component  {
  constructor(props){
    super(props);

    this.state = { submitted: false};
    this.inputNames = [];

    React.Children.toArray(this.props.children).forEach(e => {
      if(isInput(e.type)) {
        let {name, required, type} = e.props;
        this.inputNames.push(name);
        switch(type){
          case 'number':
            this.state[name] = 0;
            break;
          case 'checkbox':
          case 'radio':
            this.state[name] = false;
            break;
          default:
            this.state[name] = '';
        }
        if(required)
          this.state[name + 'Error'] = `${name} is required!`;

        this.state[name + 'Dirty'] = false;
        this.state[name + 'Touched'] = false;
      }
    })

    this.state = props.data ? {...this.state, ...props.data} : this.state;
    this.emptyState = {...this.state};

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleBlur = this.handleBlur.bind(this);
    this.handleValidate = props.onValidate || (() => null);
  }

  handleChange(e){
    let {type, value, checked, name} = e.target;
    value =  isBooleanType(type) ? checked : value;
    let error = this.handleValidate(e.target);
    this.setState({
      [name]:  value,
      [name + 'Dirty']: true,
      [name + 'Error']: error,
    })
  }

  handleBlur(e){
    let {name} = e.target;
    this.setState({ [name + 'Touched']: true });
  }

  handleSubmit(e){
    e.preventDefault();
    let hasError = this.inputNames.reduce(
      (r, name) => !!this.state[name + 'Error'] || r, false);

    if(hasError) {
      let dirty = {};
      this.inputNames.forEach(name => {
        dirty[name + 'Dirty'] = true;
        dirty[name + 'Touched'] = true;
      })
      this.setState({submitted: true, ...dirty});
    } else {
      this.props.onComplete({...this.state, submitted: true});
      this.setState(this.emptyState);
    }
  }

  render(){
    let children = React.Children.toArray(this.props.children).map((e, i) => {
      let {name} = e.props;
      let value = this.state[name];
      let valueType = isBooleanType(e.props.type) ? 'checked': 'value';

      let className = util.classToggler({
        error: this.state[name + 'Error'],
        dirty: this.state[name + 'Dirty'],
        touched: this.state[name + 'Touched'],
      })

      return (
        <div className={className} key={i}>
          { util.renderIf(this.state[name + 'Error'] && this.state[name + 'Dirty'],
              <p className='tooltip'> {this.state[name+'Error']} </p>
          )}

          {React.cloneElement(e, {
            className,
            [valueType]: value,
            onChange: this.handleChange,
            onBlur: this.handleBlur,
          })}
        </div>
      )
    });

    return (
      <form
        className={util.classToggler({ submitted: this.state.submitted })}
        onSubmit={this.handleSubmit}
        noValidate>

        {children}
      </form>
    )
  }
}

export default Form
