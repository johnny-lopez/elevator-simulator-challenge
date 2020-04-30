import React from 'react';
import './ButtonPanel.scss'
import {connect} from 'react-redux'
import {State} from "../../ifaces/state";
import {Action} from "../../ifaces/actions";

class ButtonPanel extends React.Component<ButtonPanelProps>{
    render(): React.ReactNode {
        return <div className="ButtonPanel" style={{display: this.props.floor === this.props.elevatorOnFloor && this.props.visible ? 'block' : 'none'}}>
            { Array.from({length:this.props.size}, (value, index) => {
                const floor = this.props.size - index - 1;
                return <div className={this.props.selectedFloors.includes(floor) ? "floor-select-button-active" : "floor-select-button-inactive"}
                     key={floor}
                     onClick={this.props.onElevatorMove}
                     id={'floor-select-button-' + floor}
                >{floor}</div>})
            }
        </div>
    }
}

interface ButtonPanelProps {
    size: number;
    elevatorOnFloor?: number;
    visible?: boolean;
    floor: number;
    selectedFloors: number [];
    onElevatorMove?: any;
}

const extractFloor = (e: any): number => {
    const floor = e.target.id.substr(20);
    return parseInt(floor);
}

const mapStateToProps = (state: State) => {
    return {
        elevatorOnFloor: state.elevatorOnFloor,
        size: state.floors,
        visible: state.floorButtonsVisible,
        selectedFloors: state.selectedFloors
    }
}

const mapDispatchToProps = (dispatch:any) => {
    return {
        onElevatorMove: (e: any) => dispatch({type: Action.ELEVATOR_BUTTON_PRESSED, floor: extractFloor(e)}),
    };
}



export default connect(mapStateToProps, mapDispatchToProps)(ButtonPanel);
