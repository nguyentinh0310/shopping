import React, { useState } from 'react';
import { Button } from 'react-bootstrap';

const Search = (props) => {
    const {history} = props
    const [keyword, setKeyword] = useState('')
    const handlerSearch = (e) => {
        e.preventDefault()
        if(keyword.trim()){
            history.push(`/search/${keyword}`)
            setKeyword('')
        }else{
            history.push('/')
        }
    }
    return (
        <form onSubmit={handlerSearch}>
            <div className="navbar__input">
                <input
                    type="text"
                    className="form-control navbar__search--field"
                    placeholder="Tìm kiếm tên sản phẩm..."
                    value={keyword}
                    onChange={e => setKeyword(e.target.value)}
                />
                <div className="navbar__input--btn">
                    <Button type="submit" className="btn navbar__search--btn">
                        <i className="fa fa-search" aria-hidden="true"></i>
                    </Button>
                </div>
            </div>
        </form>
    );
}

export default Search;