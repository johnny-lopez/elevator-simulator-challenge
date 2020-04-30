import React from 'react';
import {connect} from 'react-redux'
import './App.scss';
import Shaft from "./components/shaft/Shaft";
import {State} from "./ifaces/state";

class App extends React.Component<State, State> {

    render () {
        return (
            <div className="app">
                <header className="app-header">
                    Elevator simulator v1.0.0
                </header>
                <div className="app-main">
                    <Shaft floors={this.props.floors}
                           elevatorOnFloor={this.props.elevatorOnFloor}
                           direction={this.props.direction}
                    />
                </div>
                <footer className="app-footer">
                </footer>
            </div>
        );
    }

}

const mapStateToProps = (state: State) => {
    return {
        floors: state.floors,
        direction: state.direction,
        elevatorOnFloor: state.elevatorOnFloor,
        selectedFloors: state.selectedFloors,
        floorButtonsVisible: state.floorButtonsVisible
    }
}

export default connect(mapStateToProps)(App);
