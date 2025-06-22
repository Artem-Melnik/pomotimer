import AudioPlayer from 'react-modern-audio-player';

const playList = [
    {
        name: 'Jungle Waves (Drum&Bass Electronic Inspiring Promo)',
        writer: 'DIMMYSAD',
        img: 'https://cdn.pixabay.com/audio/2025/05/21/12-47-01-748_200x200.jpg',
        src: 'https://cdn.pixabay.com/download/audio/2025/05/21/audio_fa20813ea6.mp3?filename=jungle-waves-drumampbass-electronic-inspiring-promo-345013.mp3',
        id: 1
    },
    {
        name: 'Gorila',
        src: "https://cdn.pixabay.com/download/audio/2025/03/19/audio_56ae1dae5f.mp3?filename=gorila-315977.mp3",
        writer: 'Alex_MakeMusic',
        img: 'https://cdn.pixabay.com/audio/2025/03/19/20-23-35-428_200x200.png',
        id: 2
    },
    {
        name: 'Lost in Dreams (abstract chill downtempo cinematic future beats)',
        writer: 'Kulakovka',
        src: 'https://cdn.pixabay.com/download/audio/2024/11/29/audio_45bbd49c34.mp3?filename=lost-in-dreams-abstract-chill-downtempo-cinematic-future-beats-270241.mp3',
        img: 'https://cdn.pixabay.com/audio/2024/11/29/13-19-36-180_200x200.jpg',
        id: 3
    },
    {
        name: 'Rain',
        writer: 'Sixicane',
        src: 'https://cdn.pixabay.com/download/audio/2025/05/21/audio_e833e5b2cd.mp3?filename=glitch-overdrive-1-345158.mp3',
        img: 'https://cdn.pixabay.com/audio/2025/05/21/15-43-29-237_200x200.jpg',
        id: 4
    },
    {
        name: 'Drum + Bass',
        writer: 'LBDLPROD',
        src: 'https://cdn.pixabay.com/download/audio/2024/09/22/audio_8acca15fed.mp3?filename=drum-bass-243588.mp3',
        img: 'https://cdn.pixabay.com/gradients/93d9cd-686fee_200x200.png',
        id: 5
    }
]
export function Player() { // ({play}: {play?: boolean}){
    return (
        <div className='container-for-sizing-player mb-5 rounded-[0.75rem] overflow-hidden'>
            <AudioPlayer
                audioInitialState={{curPlayId: 0}} //, isPlaying: play}}
                playList={playList}
                activeUI={{ all: true, progress: false, trackTime: false, repeatType: false }}
            />
        </div>
    )
}