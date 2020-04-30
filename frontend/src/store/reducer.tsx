import {store} from "../index";
import {Direction} from "../ifaces/direction";
import {Action} from "../ifaces/actions";
import {State} from "../ifaces/state";

const initialState = {
    floors: 4,
    direction: Direction.NONE,
    elevatorOnFloor: 0,
    floorButtonsVisible: true,
    selectedFloors: []
}

const reducer = (state: any = initialState, action: any) => {
    console.log("Reducer " + action.type);
    switch (action.type) {
        case Action.ELEVATOR_BUTTON_PRESSED: return moveElevator(state, action.floor);
        case Action.ELEVATOR_MOVE: return moveElevatorToFloor(state, action.floor);
        case Action.ELEVATOR_READY: return updateElevator(state, action.floor);
        case Action.ELEVATOR_REQUESTED_UP: return requestElevatorUp(state, action.floor);
        case Action.ELEVATOR_REQUESTED_DOWN: return requestElevatorDown(state, action.floor);
    }

    return state;
};

const TRANSITION_TIME = 2000;

const moveElevator = (state: State, toFloor: number): State => {
    if (state.elevatorOnFloor === toFloor) return state;

    if (state.selectedFloors.includes(toFloor)) {
        return state;
    } else {
        const nextState: State = moveElevatorToFloor(state, toFloor);
        return {
             ...nextState,
             selectedFloors: [...state.selectedFloors, toFloor]
         }
    }
}

const requestElevatorUp = (state: State, toFloor: number): State => {
    if (state.elevatorOnFloor === toFloor) return state;

    const id = 'floor-button-up-' + toFloor;
    const style = 'color: green';
    const element: HTMLElement | null = document.getElementById(id);
    if (element) {
        element.setAttribute("style", style);
    }

    return moveElevatorToFloor(state, toFloor);
}

const requestElevatorDown = (state: State, toFloor: number): State => {
    if (state.elevatorOnFloor === toFloor) return state;

    const id = 'floor-button-down-' + toFloor;
    const style = 'color: green';
    const element: HTMLElement | null = document.getElementById(id);
    if (element) {
        element.setAttribute("style", style);
    }

    return moveElevatorToFloor(state, toFloor);
}

const scheduleElevatorMovement = (nextFloor: number, diff: number, toFloor: number) => {
    store.dispatch({
        type: Action.ELEVATOR_READY,
        floor: nextFloor
    })
    const style = 'color: white';
    let id = 'floor-button-up-' + nextFloor;
    let element: HTMLElement | null = document.getElementById(id);
    if (element) {
        element.setAttribute("style", style);
    }
    id = 'floor-button-down-' + nextFloor;
    element = document.getElementById(id);
    if (element) {
        element.setAttribute("style", style);
    }

    if (diff > 1) {
        const action = Action.ELEVATOR_MOVE
        store.dispatch({
            type: action,
            floor: toFloor
        })

    }
}

const moveElevatorToFloor = (state: State, toFloor: number): State => {
    let direction = Direction.NONE;
    if (toFloor > state.elevatorOnFloor) {
        direction = Direction.UP;
    } else if (toFloor < state.elevatorOnFloor) {
        direction = Direction.DOWN;
    }
    let nextFloor = state.elevatorOnFloor;
    if (direction === Direction.UP) {
        nextFloor += 1;
    } else if (direction === Direction.DOWN) {
        nextFloor -= 1;
    }

    if (toFloor >= 0 && toFloor < state.floors) {
        const diff = (Math.abs(toFloor - state.elevatorOnFloor))
        const time = TRANSITION_TIME / 1000;
        const closed = '; background-image: url("/elevator-closed.png")';
        const trans = '; transition: all '  + time + 's';
        const style = 'transform: translateY(calc(' + nextFloor + ' * -1 * (100% + 10px + 1px)))' + trans + closed;
        const elevators: HTMLCollectionOf<Element> = document.getElementsByClassName("Elevator");
        elevators[0].setAttribute("style", style);

        setTimeout( () => scheduleElevatorMovement(nextFloor, diff, toFloor),time * 1000 + 100)

        return {
            ...state,
            direction: direction,
            floorButtonsVisible: false
        }
    }
    return state;
}

const updateElevator = (state: State, floor: number): State => {
    const style = '; background-image: url("/elevator-open.png")';
    const elevators: HTMLCollectionOf<Element> = document.getElementsByClassName("Elevator");
    const currentStyle = elevators[0].getAttribute('style');
    elevators[0].setAttribute('style', currentStyle + style);

    return {
        ...state,
        elevatorOnFloor: floor,
        direction: Direction.NONE,
        floorButtonsVisible: true,
        selectedFloors: [...state.selectedFloors].filter(e => e !== floor)
    }
}

export default reducer;
