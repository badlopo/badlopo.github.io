// const QUOTE = [
//     // 'Then am I',
//     // 'A happy fly,',
//     // 'If I live,',
//     // 'Or if I die.',
//     'seek out the righteous,',
//     'where’er they may be!',
// ]

const HomePage = () => {
    return (
        <div className={ 'home-page' }>
            <img style={ { width: '100%', height: '100%' } } src="/drafting.svg" alt=""/>
            {/*<main>*/ }
            {/*    { QUOTE.map((line, index) => <p key={ index }>{ line }</p>) }*/ }
            {/*</main>*/ }
        </div>
    )
}

export {
    HomePage,
}
