import React, { Component }  from 'react';
import LoadData from './Component/loadData'
import FilterData from './Component/filterData'


class Home extends Component {

    render(){

        return (
            <div>
                <FilterData {...this.props}/>
                <LoadData {...this.props}/>
            </div>
        );
    }
}


export default Home