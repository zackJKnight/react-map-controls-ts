import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import ConcentricRings from './concentric-rings'
import DraggableIcon from './draggable-icon'
import CircleWithLabelComponent from './circle-with-label'
import CircleLabelCorrected from './circle-label-corrected'
import CircleWithLabelCorrected from './circle-label-corrected'

function App() {
  const [count, setCount] = useState(0)
  const settings = [
    { label: 'course', min: 0, max: 360, selected: 180, displayOptions: { radius: 10} },
    { label: 'descent angle', min: 0, max: 360, selected: 180, displayOptions: { radius: 10} },
  ];

  return (
    <div className="App">
      <div style={{ width: '100%' }}>
        <h1>Delivery Drone Deployment Plan</h1>
        <p>How might we let drone testers plan for a variety of deliveries; some where a higher drop is OK? Some where a slower drop is required? Some may need a manuever around an obstacle.</p>
        <p>Visual control of parameters you can command.</p>
        <h2>Angle Controls</h2>

        <ul>
          <li>Heading</li>
          <li>Course</li>
          <li>Descent</li>
        </ul>
        <p>Imagine these crude drag handles followed the mouse or finger.</p>
      <ConcentricRings settings={settings} />
      <br />
      <CircleWithLabelCorrected radius={80}/>
      <br />
      <h2>Velocity Controls</h2>
      <p>Imagine an approach velocity control that visualizes a faster descent when dragged farther from center.</p>
      <DraggableIcon>
      {'>'}
    </DraggableIcon>
      <h2>Association Controls</h2>
      <p>How might we let the user assign a drone to drop points along a route?</p>
      <p>What if we had drone launch and recovery trucks? Can we set the direction/speed/time/launch points?</p>
    </div>
    </div>
  )
}

export default App
