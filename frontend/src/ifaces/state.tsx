import {Direction} from "./direction";

export interface State {
    floors: number;
    elevatorOnFloor: number;
    direction: Direction;
    selectedFloors: number[];
    floorButtonsVisible: boolean;
}
