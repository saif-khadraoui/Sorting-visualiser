import './App.css';
import React, { useEffect, useState, useRef } from "react"
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 600,
  height: 600,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};


function App() {
  const [arr, setArr] = useState([])
  const [size, setSize] = useState(20)
  const [speed, setSpeed] = useState(200)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [color, setColor] = useState("black")

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const width = window.screen.width / arr.length


  useEffect(() => {
      const randomArray = Array.from({ length: size }, () => 
        Math.floor(Math.random() * (300 - 1) + 1)
      )
      setArr(randomArray)
  }, [size])

  
  const resetColour = () => {
    console.log("this works")
    let len = arr.length
    for(let i=0; i<len; i++){
      document.getElementById(`bar${i}`).style.backgroundColor = "black"
    }
  }   

  const showFinish = async () => {
    const sleep = ms => new Promise(res => setTimeout(res, ms));
    let len = arr.length
    for(let i=0; i<len; i++){
      document.getElementById(`bar${i}`).style.backgroundColor = "green"
    }
    await sleep(500)
    resetColour()
  }



  const bubbleSort = async () => {
    const sleep = ms => new Promise(res => setTimeout(res, ms));
      let len = arr.length;
      for (let i = 0; i < len; i++) {
          for (let j = 0; j < len; j++) {
              setCurrentIndex(j)
              console.log(j)
              console.log(currentIndex)
              if (arr[j] > arr[j + 1]) {
                  //setColor("green")
                  //console.log(color)
                  //document.getElementById(`bar${j + 1}`).style.backgroundColor = color
                  let tmp = arr[j];
                  arr[j] = arr[j + 1];
                  arr[j + 1] = tmp;
                  setArr([...arr])
              }
              //ColorChange()
              // setColor("black")

              await sleep(speed)
          }
          
      }
      showFinish()
      await sleep(speed)
      
  }


  const mergeSort = async (arr) => {
    let len = arr.length
    let middle = Math.round(len / 2)
    console.log(arr)
    if(len > 1){
      var left_arr = arr.slice(0, middle)
      var right_arr = arr.slice(middle, len - 1)

      mergeSort(left_arr)
      mergeSort(right_arr)

      var i = 0 //index of left array
      var j = 0 //index of right array
      var k = 0 //index of merged array

      while(i<left_arr.length && j<right_arr.length){
        if(left_arr[i] < right_arr[j]){
          arr[k] = left_arr[i]
          i += 1
        } else{
          arr[k] = right_arr[j]
          j += 1
        k+= 1
        }
      }

      while(i<left_arr.length){
        arr[k] = left_arr[i]
        i += 1
        k += 1
      }

      
      while(j<right_arr.length){
        arr[k] = right_arr[j]
        j += 1
        k += 1
      }

    }
    console.log(arr)

  }


  const randomArray = () => {
    setArr(Array.from({ length: size }, () => 
    Math.floor(Math.random() * (300 - 1) + 1)
    
  ))
  }

  const changeSizeOfArray = () => {
    const length = prompt("What size would you like the array to be (3-100)?")
    setSize(length)
  }

  const changeSpeedOfSorting = () => {
    const speedUser = prompt("How long do you want the interval between each swap to be (in ms)")
    setSpeed(speedUser)
  }


  return (
    <div className='container'>
      <nav>
        <div className='nav_content'>
            <p>Sorting Visualizer</p>
            <p onClick={randomArray}>Generate new array</p>
            <p onClick={changeSizeOfArray}>Size of array</p>
            <p onClick={changeSpeedOfSorting}>Speed of sorting</p>
            <div className='sortingAlgorithm'>
            <p onClick={bubbleSort}>Bubble sort</p><HelpOutlineIcon onClick={handleOpen}/>
            </div>
            {/* <div className='sortingAlgorithm'>
              <p onClick={() => {
                mergeSort(arr)
              }}>Merge sort</p><HelpOutlineIcon />
            </div>
            <div className='sortingAlgorithm'>
              <p>Heap sort</p><HelpOutlineIcon />
            </div>
            <div className='sortingAlgorithm'>
              <p>Quick sort</p><HelpOutlineIcon />
            </div> */}
        </div>
        <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <h2>Bubble sort</h2>
          <p>Bubble Sort is the simplest sorting algorithm that works by repeatedly swapping the adjacent elements if they are in wrong order.</p>
          <p>Example:</p>
          <p>5, 2, 4, 1</p>
          <p>First round</p>
          <p>2, 4, 1, 5 &ensp; The first item got swapped with the as it's larger. Then the second item got swapped with the third as it's larger etc...</p>
          <p>Second round</p> 
          <p>2, 1, 4, 5</p>
          <p>Third round</p>
          <p>1, 2, 4, 5</p>
          <br />
          <p>Bubble sort has a time complexity of O(n<sup>2</sup>)</p>
        </Box>
      </Modal>
      </nav>
    <div className='bars'>
      {/* <input placeholder='set size' onChange={((e) => setSize(e.target.value))}/> */}
      {arr.map((height, idx) => {
        return <div key={idx} id={`bar${idx}`} className={"bar"} style={{ height: `${height}px`, width: `${width}px` }}>
          {arr.length < 10 && <p style={{ color: "blue" }}>{Math.floor(height / 2)}</p>}
        </div>
      })}
      {/* <button onClick={randomArray}>click</button> */}

    </div>
    <footer>
      <p>Made By Saif</p>
    </footer>
    </div>
  );
}

export default App;
