import React from 'react';
import './Elevator.scss'
import './Display'
import Display from "./Display";
import {connect} from 'react-redux'


class Elevator extends React.Component<ElevatorProps> {
    render(): React.ReactNode {
        return  <div className={ this.props.visible ? "Elevator" : "ElevatorHidden" } >
            { this.props.visible ? <Display /> : null }
        </div>
    }
}

interface ElevatorProps {
    visible: boolean;
    id: number
}

export default connect()(Elevator);
