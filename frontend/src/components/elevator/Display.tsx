import React from 'react'
import './Display.scss'
import {connect} from 'react-redux'
import {State} from "../../ifaces/state";

class Display extends React.Component<DisplayProps> {
    render(): React.ReactNode {
        return <div className="Display">
            { Array.from({length:this.props.size}, (value, index) => {
                return <span className={this.props.selectedFloors.includes(index) ? "selected" : "unselected"}
                      key={index}
                >{index}</span>})
            }
        </div>
    }
}

interface DisplayProps {
    selectedFloors: number[];
    size: number;
}

const mapStateToProps = (state: State) => {
    return {
        size: state.floors,
        selectedFloors: state.selectedFloors
    }
}

export default connect(mapStateToProps)(Display);
