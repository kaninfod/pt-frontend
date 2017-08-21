import React from 'react';
import { Header } from './header';

export default class Info extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    const info = infoItemProps(this.props.data.photo);
    return (
      <div className="pt-widget">
        <Header handleClose={this.props.widgetHandlers.HIDE} title="Photo Information"/>
        <div className="pt-widget content">
          <ul className="pt-info">
            {info.map(infoItem.bind(this))}
          </ul>
        </div>
      </div>
    );
  }
}

var infoItemProps = function (props) {

  return (
    [
      { key: 1, label: 'IDis',     info: props.get('id') },
      { key: 2, label: 'Date',     info: props.get('date_taken_formatted') },
      { key: 3, label: 'Address',  info: props.getIn(['location', 'address']) },
      { key: 4, label: 'Country',  info: props.getIn(['location', 'country_name']) },
      { key: 5, label: 'Model',    info: props.get('model') },
      { key: 6, label: 'Make',     info: props.get('make'), },
  ]);
};

var infoItem = function (props) {
  return (
    <li key={props.key}>
      <label>{props.label}</label>
      <div className="content">{props.info}</div>
    </li>
  );
};
