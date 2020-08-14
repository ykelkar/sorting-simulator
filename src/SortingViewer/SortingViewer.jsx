import React from 'react';
import './SortingViewer.css';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import { mergeSort } from '../Algorithms/mergeSort.js';
import { quickSort } from '../Algorithms/quickSort.js';
import InputSlider from './input.js';
import { getSize } from './helper.js';

const ANIMATION_SPEED_MS = 100;

const PRIMARY_COLOR = 'dodgerblue';

// This is the color of array bars that are being compared throughout the animations.
const SECONDARY_COLOR = 'red';

const ARRAY_SIZE = 10;
export default class SortingViewer extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            array: []
        };
    }

    mergeSort() {
        const animations = mergeSort(this.state.array);
        for (let i = 0; i < animations.length; i++) {
            const arrayBars = document.getElementsByClassName('array-bar');
            const isColorChange = i % 3 !== 2;
            if (isColorChange) {
                const [barOneIdx, barTwoIdx] = animations[i];
                const barOneStyle = arrayBars[barOneIdx].style;
                const barTwoStyle = arrayBars[barTwoIdx].style;
                const color = i % 3 === 0 ? SECONDARY_COLOR : PRIMARY_COLOR;
                setTimeout(() => {
                    barOneStyle.backgroundColor = color;
                    barTwoStyle.backgroundColor = color;
                }, i * ANIMATION_SPEED_MS);
            } else {
                setTimeout(() => {
                    const [barOneIdx, newHeight] = animations[i];
                    const barOneStyle = arrayBars[barOneIdx].style;
                    barOneStyle.height = `${newHeight}px`;
                    document.getElementById(barOneIdx).innerHTML = newHeight;
                }, i * ANIMATION_SPEED_MS);
            }
        }
        //this.disable = false;
    }

    quickSort() {
        quickSort(this.state.array, 0,  ARRAY_SIZE - 1);
    }

    heapSort() {

    }

    insertionSort() {

    }

    bucketSort() {

    }

    componentDidMount() {
        this.resetArray();
    }
    
    resetArray() {
        const array = [];
        const size = ARRAY_SIZE;
        console.log('size' + size);
        for (let i = 0; i < size; i++) {
            array.push(randomIntFromInterval(5, 640));
        }
        this.setState({array});
    }

    render() {
        const {array} = this.state;
        const barWidth = 1200/ARRAY_SIZE;
        const renderValue = (value)=>{
            if(ARRAY_SIZE <= 40){
                return <p className='bar-value'>{value}</p>
            } 
          }
        return (
            <>
                <div className="outer-container">
                    <div className="array-container">
                        {array.map((value, idx) => (
                            <div className="array-bar" 
                            id={idx}
                            key={idx}
                            style={{width: `${barWidth}px`, height: `${value}px`}}>
                                {renderValue(value)}
                            </div>
                        ))}
                    </div>
                </div>
                <div className="footer">
                    <AppBar>
                        <Toolbar className="toolbar">
                            <InputSlider></InputSlider>
                            <Button color="inherit" onClick={() => { this.resetArray() }}>Generate New Array</Button>
                            <Button color="inherit" onClick={() => { this.mergeSort() }}>Merge Sort</Button>
                            <Button color="inherit" onClick={() => { this.quickSort() }}>Quick Sort</Button>
                            <Button color="inherit" onClick={() => { this.insertionSort() }}>Insertion Sort</Button>
                            <Button color="inherit" onClick={() => { this.bucketSort() }}>Bucket Sort</Button>
                            <Button color="inherit" onClick={() => { this.heapSort() }}>Heap Sort</Button>
                        </Toolbar>
                    </AppBar>
                </div>
            </>
        );
    }
}
function randomIntFromInterval(min,max) {
    return Math.floor(Math.random()*(max-min+1)+min); 
}
