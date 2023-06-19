// @ts-ignore
import React, {useEffect, useState} from "react";
import axios from "axios";
import awsTranscribeToVtt from 'aws-transcription-to-vtt';


export default function VideoWithSubtitle({lecture, videoRef}) {

    const [subContent, setSubContent] = useState([]);


    useEffect(() => {
        const getSubtitleFromUrl = async (link) => {
            //console.log(lecture.transcriptUrl);
            const response = await axios.get(link,
                {
                    headers: {
                        'Content-Type': '*/*',
                        'Access-Control-Allow-Origin': 'http://localhost:3000'
                    },
                });
            if (response.status === 200) {
                if (response.data.results.items) {
                    console.log(response.data.results.items)
                    const vttContent = await awsTranscribeToVtt(response.data)
                    setSubContent(vttContent)
                }
            }else{
                setSubContent(null);
            }
        }

        if (lecture?.transcriptUrl !== null) {
            getSubtitleFromUrl(lecture.transcriptUrl)
        }else{
            setSubContent(null);
        }


    }, [lecture]);

    return (
        <div>
            <video
                id="myVideo"
                className="learn__video"
                width="100%"
                height="500px"
                src={lecture.link}
                controls
                autoPlay
                ref={videoRef}
                crossOrigin="anonymous"
            >
                <source src={lecture.link}/>
                {subContent != null ?
                    <track src={URL.createObjectURL(new Blob([subContent], {type: 'text/vtt'}))} kind="subtitles"
                           srcLang="en"
                           label="Auto"/>
                    :
                    null
                }
            </video>
        </div>
    );

}