const song = 'Ye Elders of Israel'

const HiddenPage = () => {
    return (
        <main>
            <audio src={ '/audio/Ye Elders of Israel.m4a' } controls/>

            <button onClick={() => {
                const audio = new Audio('/audio/Ye Elders of Israel.m4a')
                audio.play()
            }}>play</button>

            <div className={ 'player' }>
                { song }
            </div>
        </main>
    )
}

export {
    HiddenPage,
}
