const QUOTE = [
    // 'Then am I',
    // 'A happy fly,',
    // 'If I live,',
    // 'Or if I die.',
    'seek out the righteous,',
    'where’er they may be!',
]

const HomePage = () => {
    return (
        <div className={ 'home-page' }>
            <main>
                { QUOTE.map((line, index) => <p key={ index }>{ line }</p>) }
            </main>
        </div>
    )
}

export {
    HomePage,
}
