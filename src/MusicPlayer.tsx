// TODO: Fix music player; it currently crashes the site

import {useRef, useState} from 'react';
import {listInfo, ListPlayer, ListPlayerContext, track} from 'react-list-player';

import './MusicPlayer.css'
// The following test object has type ListInfo which is defined in the ListPlayer file
const testListInfo: listInfo = {
    type: 'playlist',
    name: 'Royalty Free Playlist',
    creationDate: "1/16/2024",
    numTracks: 2,
    duration: "24 min"
}; // object needed to populate the playlist header with

// The following test array has type Track which is defined in the ListPlayer file
const testTracks: track[] = [{
    src: "https://cdn.pixabay.com/download/audio/2025/05/21/audio_fa20813ea6.mp3?filename=jungle-waves-drumampbass-electronic-inspiring-promo-345013.mp3",
    title: [
        {
            type: 'text',
            // style: {color: "red"},
            content: 'Jungle Waves (Drum&Bass Electronic Inspiring Promo)',
            className: 'title'
        }
    ],
    artist: [
        {
            type: 'text',
            content: 'DIMMYSAD',
            className: 'artist',
            link: 'https://pixabay.com/users/dimmysad-48986751/'
        }
    ],
    album: [
        {
            type: 'text',
            content: 'SoulProdMusic',
            className: 'album'
        }
    ],
    duration: "2:11",
    imageSrc: "https://cdn.pixabay.com/audio/2025/05/21/12-47-01-748_200x200.jpg"
}, {
    src: "https://cdn.pixabay.com/download/audio/2025/03/19/audio_56ae1dae5f.mp3?filename=gorila-315977.mp3",
    title: [
        {
            type: 'text',
            content: 'Gorila',
            className: 'title'
        },
    ],
    artist: [
        {
            type: 'text',
            content: 'Alex_MakeMusic',
            className: 'artist',
            link: 'https://pixabay.com/users/alex_makemusic-24186663/'
        }
    ],
    album: [
        // {
        //     type: 'text',
        //     content: 'Nesterouk',
        //     className: 'album'
        // }
    ],
    duration: "1:55",
    imageSrc: "https://cdn.pixabay.com/audio/2025/03/19/20-23-35-428_200x200.png"
},
]; // array of track objects needed populate the playlist rows with

export function MusicPlayer() {
    const [selectedTrack, setSelectedTrack] = useState(-1);   // -1 means no track is selected
    const [isPlaying, setIsPlaying] = useState(false);        // play/pause
    const [isMuted, setIsMuted] = useState(false);            // mute/unmute
    const audioRef = useRef<HTMLAudioElement>(null);
    const handleOnPlay = (index: number, resume: boolean) => {
        if (index === selectedTrack && !resume) {
            audioRef.current?.load();
            audioRef.current?.play();
        } else {
            audioRef.current?.play();
        }
    }

    const handleOnPause = () => {
        audioRef.current?.pause();
    }
    return (
        <ListPlayerContext.Provider
            value={{selectedTrack, setSelectedTrack, isPlaying, setIsPlaying, isMuted, setIsMuted}}>
            <div className='container-for-sizing-player mb-5'>
                <ListPlayer //playerMode={'miniplayer'}
                    tracks={testTracks}
                    listInfo={testListInfo}
                    playCallback={handleOnPlay}
                    pauseCallback={handleOnPause}
                />
            </div>
            <audio
                ref={audioRef}
                // src="https://www.youtube.com/watch?v=4SErIMflSLQ"
                src={selectedTrack >= 0 && selectedTrack < testTracks.length ? testTracks[selectedTrack % testTracks.length].src : undefined}
                muted={isMuted}
                onEnded={() => {
                    setSelectedTrack(selectedTrack + 1)
                }}
            />
        </ListPlayerContext.Provider>
    )
}