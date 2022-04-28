import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';

const TimeFrame = (props)=>{
    const options = [
    '--select--', '9-10AM', '10-11AM', '11-12AM', '12-01PM', '4-5PM', '5-6PM'
    ];
    const selectValue = null
    
    let defaultOption = options[0];
    const timeHandler = (e)=>{
        defaultOption = e.value;
        props.getTime(e)
    }
    return (
        <center>
        <div style={{ width:"150px", padding:"5px"}}>
            
            <Dropdown id='time' options={options} onChange={timeHandler} value={defaultOption} placeholder="Select an option" />
            
        </div>
        </center>
    )
}
export default TimeFrame;