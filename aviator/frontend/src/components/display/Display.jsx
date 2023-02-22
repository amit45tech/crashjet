import React from 'react'
import { useState, useRef, useEffect } from 'react';
import Wait from '../../assets/wait.gif';
import Start from "../../assets/start1.png";
import Start1 from "../../assets/start.gif";
import Hold from "../../assets/hold.gif";
import Blast1 from "../../assets/blast1.gif";
import Blast2 from "../../assets/blast2.gif";
import Blast3 from "../../assets/blast3.gif";
import { useSelector, useDispatch } from 'react-redux';
import { setFlewClass, setInstructionClass, setWaitClass, setRstatus } from './displaySlice';
import io from 'socket.io-client';
import { setAmtBet1, setManualClass1, setGameStatus1, setPlayStatus1, setAutoClass1, setBet1 } from '../control1/control1Slice';
import { setAmtBet2, setManualClass2, setGameStatus2, setAutoClass2, setBet2 } from '../control2/control2Slice';
import { useLayoutEffect } from 'react';



// const socket = io.connect("http://localhost:5000");
const socket = new WebSocket("ws://cgp-websocket-ecs-lb-986756641.eu-west-2.elb.amazonaws.com/cgp-ws2/RGONLINE:SGJET101:STGJET101");


const Display = () => {
  const ref = useRef(null);

  const [height, setHeight] = useState();
  const [width, setWidth] = useState();


  useLayoutEffect(() => {
    setHeight(ref.current.clientHeight);
    setWidth(ref.current.clientWidth);
  }, []);

  const [imageUrl, setImageUrl] = useState();
  const [flewClass, setFlewClass] = useState();
  const [waitClass, setWaitClass] = useState();
  const [crashed, setCrashed] = useState();
  const [result, setResult] = useState();

  const [count, setCount] = useState(1);
  const [intervalTime, setIntervalTime] = useState(100);
  const [status, setStatus] = useState("");

  socket.onmessage = function(event) {
    let msg = JSON.parse(event.data)
    setStatus(msg.roundStatus);
    console.log(msg.roundStatus, msg.betStatus, msg.result);
  };

  useEffect(() => {
    
      let interval;
      if (status === "ROUND_START") {
        setIntervalTime(100);
        setCount(1);
        setImageUrl(Start);
        setFlewClass("dynamic-text11");
        setWaitClass("dynamic-text22")
      } else if (status === "NO_MORE_BETS") {

        setCrashed("");
        setImageUrl(Hold);
        setFlewClass("dynamic-text1");
        setWaitClass("dynamic-text2");

        interval = setInterval(() => {
          setCount(count => count + 0.01);
          // console.log(count + "------------");
          setIntervalTime(intervalTime => intervalTime -1); // Speed up the interval over time
        }, intervalTime);

        return () => clearInterval(interval);
      } else if (status === "ROUND_END") {
        clearInterval(interval);
        setImageUrl(Blast2);
        setFlewClass("dynamic-text1");
        setWaitClass("dynamic-text2");
        setCrashed("Crashed");
      }
      
  }, [ status, intervalTime]); 





  // const [result, setResult] = useState('');
  // const [crashed, setCrashed] = useState('');
  // const [fle, setfle] = useState('dynamic-text11');
  // const [wai, setwai] = useState('dynamic-text22');


  // const instructionClass = useSelector((state) => state.display.instructionClass);
  // const flewClass = useSelector((state) => state.display.flewClass);
  // const waitClass = useSelector((state) => state.display.waitClass);
  // const round_Status = useSelector((state) => state.display.rStatus);

  // const dispatch = useDispatch();

  // const bet1 = useSelector((state) => state.control1.bet1);
  // const betInQueue1 = useSelector((state) => state.control1.playStatus1);
  // const autoplay1 = useSelector((state) => state.control1.autoPlay1);


  // const stateRef = useRef();
  // stateRef.auto1 = autoplay1;
  // stateRef.flewclass = fle;
  // stateRef.waitclass = wai;
  // stateRef.resu = result;


  // const ref = useRef(null);

  // const [showAnim, setShowAnim] = useState("wait");
  // const [height, setHeight] = useState();
  // const [width, setWidth] = useState();

  // stateRef.anim = showAnim;

  // useLayoutEffect(() => {
  //   setHeight(ref.current.clientHeight);
  //   setWidth(ref.current.clientWidth);
  // }, []);




  // stateRef.roundStat = round_Status;

  // socket.onmessage = function (event) {
  //   let msg = JSON.parse(event.data)
  //   dispatch(setRstatus(msg.roundStatus));
  //   console.log(msg.roundStatus, msg.betStatus);

  //   if (stateRef.roundStat === "ROUND_START") {
  //     setfle("dynamic-text11");
  //     setwai("dynamic-text22");
  //   } else if (stateRef.roundStat === "NO_MORE_BETS") {
  //     setfle("dynamic-text1");
  //     setwai("dynamic-text2");
  //     setCrashed("");

  //   } else if (stateRef.roundStat === "ROUND_END") {
  //     setCrashed("Crashed");
  //     setResult(msg.result)
  //   }
  // };





  // socket.on("Crash", (payload) => {
  //   setCrashed(payload);
  //   // dispatch(setInstructionClass("instruction5"));
  //   if(result < 1.1){
  //     setShowAnim("blast2");
  //   }else{
  //     setShowAnim("blast3");
  //   }

  //   if (stateRef.auto1 === "false") {
  //     dispatch(setBet1("false"));
  //   }
  //   dispatch(setBet2("false"));
  // });

  // socket.on("finalResult", (payload) => {
  //   setPreResult(...preResult, payload);

  // })

  // socket.on("Wait", (payload) => {
  //   if (payload) {
  //     // dispatch(setInstructionClass("instruction2"));
  //     setShowAnim("wait")
  //     dispatch(setFlewClass("dynamic-text11"));
  //     dispatch(setWaitClass("dynamic-text22"));
  //     setCrashed("");

  //     dispatch(setGameStatus1("waiting"));

  //     dispatch(setGameStatus2("waiting"));

  //   } else {
  //     dispatch(setPlayStatus1(""));

  //     dispatch(setFlewClass("dynamic-text1"));
  //     dispatch(setWaitClass("dynamic-text2"));
  //     // dispatch(setInstructionClass("instruction3"));
  //     setShowAnim("start")


  //     dispatch(setGameStatus1("started"));

  //     dispatch(setGameStatus2("started"));
  //   }
  // });




  // socket.on("Greater", (payload) => {
  //   // dispatch(setInstructionClass("instruction4"));
  //   setShowAnim("hold")

  // });

  // socket.on("Result", (payload) => {
  //   setResult(payload);
  // });

  return (
    <div className="App-display">

      <div className="display-heading">FUN MODE</div>
      <div className="instruction" ref={ref}>
        <img height={height} className="animation" width={width} src={imageUrl} alt="" />

        <div className={flewClass}>
          <div className="flew-away">{crashed}</div>
          <div className="result">{count.toFixed(2)}x</div>
        </div>
        <div className={waitClass}>
          <img src={Wait} alt="waiting..." />
          <div className="waiting">BET NOW. Waiting for the next round...</div>
        </div>
      </div>


      {/* <div className="instruction" ref={ref}>
        {(stateRef.anim === "wait") ? (<img height={height} className="animation" width={width} src={Start} alt="" />) : ""}
        {(stateRef.anim === "hold") ? (<img height={height} className="animation" width={width} src={Hold} alt="" />) : ""}
        {(stateRef.anim === "start") ? (<img height={height} className="animation" width={width} src={Start1} alt="" />) : ""}
        {(stateRef.anim === "blast1") ? (<img height={height} className="animation" width={width} src={Blast1} alt="" />) : ""}
        {(stateRef.anim === "blast2") ? (<img height={height} className="animation" width={width} src={Blast2} alt="" />) : ""}
        {(stateRef.anim === "blast3") ? (<img height={height} className="animation" width={width} src={Blast3} alt="" />) : ""}

        <div className={stateRef.flewclass}>
          <div className="flew-away">{crashed}</div>
          <div className="result">{stateRef.resu}x</div>
        </div>
        <div className={stateRef.waitclass}>
          <img src={Wait} alt="waiting..." />
          <div className="waiting">BET NOW. Waiting for the next round...</div>
        </div>
      </div> */}
    </div>
  )
}

export default Display
