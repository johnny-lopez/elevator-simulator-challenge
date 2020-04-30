import React from 'react';
import {connect} from 'react-redux'
import './Floor.scss'
import Elevator from "../elevator/Elevator";
import {Col, Row} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowAltCircleDown, faArrowAltCircleUp} from "@fortawesome/free-solid-svg-icons";
import {Action} from "../../ifaces/actions";
import ButtonPanel from "../elevator/ButtonPanel";

class Floor extends React.Component<FloorProps> {
    render(): React.ReactNode {
        return <Row className="Floor">
            <Col xs="3" className="controls">
                <div className="floor-no">{this.props.no === 0 ? "G" : this.props.no}</div>
                <div className="floor-buttons">
                    <FontAwesomeIcon icon={faArrowAltCircleUp} className="floor-button" id={'floor-button-up-' + this.props.no} onClick={this.props.onElevatorRequestedUp}/>
                    <FontAwesomeIcon icon={faArrowAltCircleDown} className="floor-button" id={'floor-button-down-' + this.props.no} onClick={this.props.onElevatorRequestedDown}/>
                </div>
            </Col>
            <Col xs="6" className="elevator">
                <Elevator id={this.props.no} visible={this.props.elevator}/>
            </Col>
            <Col xs="3">
                <ButtonPanel floor={this.props.no} />
            </Col>
        </Row>
    }
}

interface FloorProps {
    no: number;
    elevator: boolean;
    onElevatorRequestedUp?: any,
    onElevatorRequestedDown?: any,
}

const mapDispatchToProps = (dispatch:any, props: FloorProps) => {
    return {
        onElevatorRequestedUp: () => dispatch({type: Action.ELEVATOR_REQUESTED_UP, floor: props.no}),
        onElevatorRequestedDown: () => dispatch({type: Action.ELEVATOR_REQUESTED_DOWN, floor: props.no}),
    };
}

export default connect(null, mapDispatchToProps)(Floor);
