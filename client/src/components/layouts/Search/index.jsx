import React, { useState } from 'react'
import { Input, Button } from 'reactstrap';

const Search = ({ history }) => {
    const [keyword, setKeyword] = useState('')
    const handleSearch = (e) => {
        e.preventDefault();
        if (keyword.trim()) {
            history.push(`/search=${keyword}`)
        } else {
            history.push('/')
            
        }
    }
    return (
        <form onSubmit={handleSearch}>
            <div className="navbar__input">
                <Input
                    type="text"
                    id="search_field"
                    className="form-control navbar__search--field"
                    placeholder="Enter Product Name ..."
                    onChange={(e) => setKeyword(e.target.value)}
                />
                <div className="navbar__input--btn">
                    <Button type="submit" id="search_btn" className="btn navbar__search--btn">
                        <i className="fa fa-search" aria-hidden="true"></i>
                    </Button>
                </div>
            </div>
        </form>
    )
}

export default Search
