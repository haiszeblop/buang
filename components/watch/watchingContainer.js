import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Plyr from 'plyr-react';
import 'plyr-react/dist/plyr.css';
import styled from "styled-components";
import PagiNation from "../PagiNation";
import Loader from "../Loader/Loader";
import { resumeAction } from "../../redux/actions/resumeAction";
import Link from "next/link";

const Data=[{id:1,rate:0.25},{id:2,rate:0.5},{id:3,rate:1},{id:4,rate:1.25},{id:5,rate:1.5},{id:6,rate:2}]

const PlayBack=styled.span`

background: ${({ button,active }) => active?button.background:button.hover.background};
  color: ${({ button,active }) => active?button.text:button.hover.text};

border:2px solid ${({ button,active }) => active?button.border:button.hover.border};
&:hover {
  background: ${({ button }) => button.background};
  color: ${({ button }) => button.text};
border:2px solid ${({ button }) => button.border};
}

`


const Select = styled.select`
  appearance: none;
  background-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="50"><polygon  points="0,0 100,0 50,50"  style="fill:${({
    theme,
  }) => theme.svg};"/></svg>');
  background-position: right 10px top 50%;

  background-repeat: no-repeat;
  background-size: 15px;
  padding: 0px 30px;
  &:hover {
    background-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="50"><polygon  points="0,0 100,0 50,50"  style="fill:${({
      theme,
    }) => theme.svghover};"/></svg>');
    background-color: ${({ button }) => button.hover.background};
    color: ${({ button }) => button.hover.text};
  }
`;


const WatchingContainer = ({ data = [], slug }) => {
  const Myref = useRef(null);
  const { theme, loading, resumeId } = useSelector((state) => state);
  const [link, setLink] = useState("");
  const [myList, setMyList] = useState([]);
  const dispatch = useDispatch();
  

 
  const videoSrc = {
  	type: "video",
  	sources: [
  		    {
  		    	src: "https://storage.googleapis.com/crested-booking-306814/242CKYGFD_U/22a_1615155452154126.mp4"
  		    }
  		],
  	
  };
  return loading ? (
    <Loader />
  ) : (

     
        
    <Plyr source={videoSrc}/>
      
       
 
  );
};

export default WatchingContainer;
