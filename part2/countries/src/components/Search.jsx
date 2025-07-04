const Search = ({value, onChange}) => {
    return (
        <>
            <p>find countries <input value={value} onChange={(e) => onChange(e.target.value)} /></p>
        </>
    )
}

export default Search