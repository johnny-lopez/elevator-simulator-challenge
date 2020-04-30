import React from 'react';
import './Shaft.scss'
import Floor from "./Floor";
import {Container} from "react-bootstrap";
import ShaftDisplay from "./ShaftDisplay";
import {Direction} from "../../ifaces/direction";

class Shaft extends React.Component<ShaftProps> {
    render(): React.ReactNode {
        return <Container className="Shaft">
            <ShaftDisplay floor={this.props.elevatorOnFloor} direction={this.props.direction}/>
            { Array.from({length:this.props.floors}, (value, index) => {
                    const floor = this.props.floors - index - 1;
                    return <Floor no={floor} elevator={floor === 0} key={index}/>
                }
            )}
        </Container>
    }
}

interface ShaftProps {
    floors: number
    elevatorOnFloor: number
    direction: Direction
}

export default Shaft;
