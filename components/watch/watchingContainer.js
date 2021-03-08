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
  useEffect(() => {
    if (data.links?.length > 0) {
      setMyList([...data.links]);
      setLink(data.links[0].src);

      if (
        Myref.current &&
        resumeId &&
        slug[0] == resumeId.data[0] &&
        slug[1] == resumeId.data[1]
      ) {
        Myref.current.currentTime = parseFloat(resumeId.time);
      }
      var myInterval = setInterval(() => {
        dispatch(
          resumeAction({
            data: slug,
            time: Myref.current?.currentTime ? Myref.current.currentTime : 0,
          })
        );
      }, 5000);
    }
    return () => clearInterval(myInterval);
  }, [data.links]);

  const handleClick=(rate)=>{
    Myref.current.playbackRate=rate;

  }
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
    <div className="relative lg:h-1/3  flex justify-center items-center text-left flex-col h-screen w-full px-2 ">
      <div
        className={` flex flex-col pb-2 xl:w-player justify-between items-center w-full ${theme.text.selected}   my-4`}
      >
        <div className="w-full py-4 uppercase flex flex-col items-start lg:items-start">
          <Link href={`/details/${slug[0]}`}>
          <span style="font-size:10px;" className={`font-light text-2xl lg:text-4xl ml-0 lg:ml-7 cursor-pointer text-blue-500`}>
            {slug[0].replaceAll("-", " ")}
          </span>

          </Link>
          <div className={`bg-gray-400 rounded-full h-0.5 ml-0 lg:ml-8 w-1/12`} />
        </div>
        <div className="flex w-full justify-between items-end">
          <span className={`${theme.text.selected} ml-0 lg:ml-7 text-3xl lg:text-3xl`}>
            {"Ep:" + slug[1]}
          </span>
       
        </div>
      </div>
      <div className="col-lg-12 col-12">

<Plyr source={videoSrc}/>
      
        </div>
      <PagiNation
        page={[slug[0], slug[1]]}
        heading={"Ep"}
        total={data.totalepisode}
        />
    </div>
  );
};

export default WatchingContainer;
