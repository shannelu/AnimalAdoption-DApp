import React from 'react';
import "./tab.css"

class TabsControl extends React.Component{
    constructor(){
        super()
        this.state = { 
            currentIndex : 0
        }
    }

    check_title_index( index ){
        return index === this.state.currentIndex ? "tab_title active" : "tab_title"
    }

    check_item_index( index ){
        return index === this.state.currentIndex ? "tab_item show" : "tab_item"
    }

    render(  ){
        let _this = this
        return(
            <div>
                { /* Tabs */ }
                <div className="tab_title_wrap">
                    { 
                        React.Children.map( this.props.children , ( element,index ) => {
                            return(
                                <button onClick={ () => { this.setState({ currentIndex : index }) } } className={ this.check_title_index( index ) }>{ element.props.name }</button>
                            )
                        }) 
                    }
                </div>
                { /* Tab content */ }
                <div className="tab_item_wrap">
                    {
                        React.Children.map(this.props.children,( element,index )=>{
                            return(
                                <div className={ this.check_item_index( index ) }>{ element }</div>
                            )
                        })
                    }
                </div>
            </div>
        )
    }
}

export default TabsControl