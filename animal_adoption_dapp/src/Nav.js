import React from 'react';
import {Layout, Menu, Button, Space, Divider, Col, PageHeader} from 'antd';
import {} from '@ant-design/icons';
import './Nav.css'

class Nav extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            currentIndex : 0
        }
    }

    check_title_index( index ){
        console.log(index)
        return index === this.state.currentIndex ? "nav_title active" : "nav_title"
    }

    check_item_index( index ){
        return index === this.state.currentIndex ? "nav_item show" : "nav_item"
    }

    render(){
        return(
            <Layout>
                <Layout.Header className="header" extra>
                    <Menu classname = "nav_title_wrap" theme="dark" mode="horizontal">
                        { 
                            React.Children.map( this.props.children , ( element,index ) => {
                                return(
                                    <Menu.Item key = {element.props.name} className ={ this.check_title_index( index )} onClick={ () => { this.setState({ currentIndex : index }) } }>
                                        {element.props.name}
                                    </Menu.Item>
                                )
                            }) 
                        }
                    </Menu>
                    <h1>hello</h1>
                </Layout.Header>
                <Layout.Content className = "nav_item_wrap">
                    {
                        React.Children.map(this.props.children,( element,index )=>{
                            return(
                                <div className={ this.check_item_index( index ) }>{ element }</div>
                            )
                        })
                    }
                </Layout.Content>
                <Layout.Footer>
                    Anidopt @2021 Created by LJSW
                </Layout.Footer>
            </Layout>
        )
    }
}

export default Nav;