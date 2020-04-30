import React from 'react';
import './ShaftDisplay.scss'
import {Direction} from "../../ifaces/direction";
import {faArrowDown, faArrowUp} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {OverlayTrigger, Tooltip} from "react-bootstrap";

class ShaftDisplay extends React.Component<ShaftDisplayProps> {
    render(): React.ReactNode {
        return <OverlayTrigger placement="bottom" overlay={
                <Tooltip id="shaft-display">Displays position and direction of the elevator.</Tooltip>
            }>
                <div className="ShaftDisplay" id="shaft-display">
                    {this.props.floor}
                    {this.displayDirection(this.props.direction)}
                </div>
            </OverlayTrigger>
    }

    displayDirection(direction: Direction) {
        switch (direction) {
            case Direction.UP:
                return <FontAwesomeIcon icon={faArrowUp} className="direction"/>
            case Direction.DOWN:
                return <FontAwesomeIcon icon={faArrowDown} className="direction"/>
        }
    }
}

interface ShaftDisplayProps {
    floor: number;
    direction: Direction;
}

export default ShaftDisplay;
