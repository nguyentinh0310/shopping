class APIFeature {
    constructor(query, queryStr) {
        this.query = query
        this.queryStr = queryStr
    }
    search() {
        const search = this.queryStr.search ? {
            name: {
                $regex: this.queryStr.search,
                $options: 'i'
            },
          
            
        } : {}
        this.query = this.query.find({ ...search })
        return this
    }
    filter() {
        const queryCopy = { ...this.queryStr }//this.queryStr = (category,price,rating)
        // xóa các trường trước khi filter

        const removeFields = ['search', 'limit', 'page']
        removeFields.forEach(el => delete queryCopy[el])

        // lọc price,rating
        // chuyển obj sang dạng string
        let queryStr = JSON.stringify(queryCopy)

        // chuyển thành dạng "regex" -> "$regex" 
        const regex = /\b(gt|gte|lt|lte)\b/g
        queryStr = queryStr.replace(regex, match => `$${match}`)



        // convert to array
        this.query = this.query.find(JSON.parse(queryStr))
        return this


    }

    pagination(resPerPage) {
        const currentPage = Number(this.queryStr.page) || 1
        const skip = resPerPage * (currentPage - 1)

        this.query = this.query.limit(resPerPage).skip(skip)
        return this
    }
    sorting() {
        if (this.queryString.sort) {
            const sortBy = this.queryString.sort.split(',').join(' ')
            this.query = this.query.sort(sortBy)
        } else {
            this.query = this.query.sort('-createdAt')
        }
    }
}

module.exports = APIFeature