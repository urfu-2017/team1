import React from 'react';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import Timer from 'material-ui/svg-icons/image/timer';

const items = [];

items.push(<MenuItem value={null} key={1} label={<Timer />} primaryText={`Off`} />);
items.push(<MenuItem value={1} key={2} label="1 s" primaryText={'1 second'} />);
items.push(<MenuItem value={2} key={3} label="2 s" primaryText={'2 seconds'} />);
items.push(<MenuItem value={5} key={4} label="5 s" primaryText={'5 seconds'} />);
items.push(<MenuItem value={10} key={5} label="10 s" primaryText={'10 seconds'} />);
items.push(<MenuItem value={30} key={6} label="30 s" primaryText={'30 seconds'} />);
items.push(<MenuItem value={60} key={7} label="1 m" primaryText={'1 minute'} />);
items.push(<MenuItem value={3600} key={8} label="1 h" primaryText={'1 hour'} />);

export default class LifeTimeDropOutMenu extends React.Component {
  constructor(props) {
    super(props);
    this.state = {value: null};
  }

  handleChange = (event, index, value) => {
      this.setState({value});
      this.props.setLifeTime(value);
  }

  render() {
    return (
      <DropDownMenu maxHeight={200} value={this.state.value} onChange={this.handleChange}>
        {items}
      </DropDownMenu>
    );
  }
}