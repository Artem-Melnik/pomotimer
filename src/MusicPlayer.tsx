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
    src: "https://file-examples.com/storage/fe15fd9e66682b77ba42822/2017/11/file_example_MP3_700KB.mp3",
    title: [
        {
            type: 'text',
            content: 'Smoke',
            className: 'title'
        }
    ],
    artist: [
        {
            type: 'text',
            content: 'Oleg Fedak',
            className: 'artist',
            link: 'https://pixabay.com/users/soulprodmusic-30064790/'
        }
    ],
    album: [
        {
            type: 'text',
            content: 'SoulProdMusic',
            className: 'album'
        }
    ],
    duration: "1:58",
    imageSrc: "https://cdn.pixabay.com/audio/2023/03/19/12-27-22-207_200x200.jpg"
}, {
    src: "https://file-examples.com/storage/fe15fd9e66682b77ba42822/2017/11/file_example_MP3_700KB.mp3",
    title: [
        {
            type: 'text',
            content: 'My Universe',
            className: 'title'
        },
        {
            type: 'badge',
            content: 'New',
            className: 'new'
        }
    ],
    artist: [
        {
            type: 'text',
            content: 'Peter Nesterouk',
            className: 'artist',
            link: 'https://pixabay.com/users/nesterouk-34392616/'
        }
    ],
    album: [
        {
            type: 'text',
            content: 'Nesterouk',
            className: 'album'
        }
    ],
    duration: "2:27",
    imageSrc: "https://cdn.pixabay.com/audio/2023/04/24/09-30-22-297_200x200.jpg"
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
            <div className='container-for-sizing-player'>
                <ListPlayer
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