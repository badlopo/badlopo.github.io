const LoadingMask = () => {
    return (
        <div className={ 'loading-mask' }>
            <img className={ 'spinner' } width={ 30 } height={ 30 } src="/loading.png" alt=""/>
        </div>
    )
}

export {
    LoadingMask,
}
