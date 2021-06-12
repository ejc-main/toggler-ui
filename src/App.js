import './App.css';
import { Component } from 'react';
import { Button, Container, Row } from 'react-bootstrap';

const dummyOptions = [
  {
    name: "Album 1",
    active: true,
    enabled: true
  },
  {
    name: "Album 2",
    active: false,
    enabled: true
  },
  {
    name: "Album 3",
    active: false,
    enabled: false
  },
  {
    name: "Album 4",
    active: false,
    enabled: true
  },
]

class App extends Component {
  constructor(props) {
    super(props);

    this.getOptions = this.getOptions.bind(this);
    this.activateOption = this.activateOption.bind(this);

    this.state = {
      options: []
    };
  }

  componentDidMount() {
    this.getOptions().then(response => {
      this.setState({
        options: response
      });
    });
  }

  render() {
    const buttons = this.state.options.map(option =>
      <Button key={option.name} block disabled={!option.enabled || option.active} 
          variant={option.active ? "success" : "secondary"}
          onClick={(e) => this.activateOption(option, e)}>
        {option.name}
      </Button>
    );
    return (
      <Container>
        <Row>
          {buttons}
        </Row>
      </Container>
    );
  }

  getOptions() {
    return Promise.resolve(dummyOptions);
  }

  activateOption(option) {
    let ndx = dummyOptions.findIndex(item => item.name === option.name);
    dummyOptions.forEach(item => {
      item.active = false;
    });
    dummyOptions[ndx].active = true;

    this.getOptions().then(response => {
      this.setState({
        options: response
      });
    })
  }
}

export default App;
