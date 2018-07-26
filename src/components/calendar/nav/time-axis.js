import React, { Component } from 'react';

import styled from 'styled-components';

const TimeContainer = styled.div`
width: 60px;
height: 100vh;
//  display:grid;
//  grid-template-rows: 25% 60px auto;
 background: black;
 padding-top:45px;
`;

const TimeSlot = styled.div`
    height: 60px;
    font-size: 0.8rem;
    color:black;
    text-align:center;
    background: white;
`;

var TimeIntervals= [
{
    time: "01:00"
},
{
    time: "02:00"
},
{
    time: "03:00"
},
{
    time: "04:00"
},
{
    time: "05:00"
},
{
    time: "06:00"
},
{
    time: "07:00"
},
{
    time: "08:00"
},
{
    time: "09:00"
},
{
    time: "10:00"
},
{
    time: "11:00"
},
{
    time: "12:00"
},
{
    time: "13:00"
},
{
    time: "14:00"
},
{
    time: "15:00"
},
{
    time: "16:00"
},
{
    time: "17:00"
},
{
    time: "18:00"
},
{
    time: "19:00"
},
{
    time: "20:00"
},
{
    time: "21:00"
},
{
    time: "22:00"
},
{
    time: "23:00"
},
{
    time: "24:00"
}
];
class CalendarDataAxis extends Component {


  render() {
    const TimeSlots = TimeIntervals.map((slot) => <TimeSlot>{slot.time}</TimeSlot>);

    return <TimeContainer>
            {TimeSlots}
    </TimeContainer>
  }
}



export default CalendarDataAxis;
