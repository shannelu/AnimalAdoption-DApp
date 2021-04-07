import React from 'react';
import {Layout, Menu, Button} from 'antd';
import {} from '@ant-design/icons';
import './Nav.css'

class Nav extends React.Component{
    constructor(props){
        super(props);
        this.state = {
        }
    }

    check_title_index( index ){
        return index === this.state.currentIndex ? "tab_title active" : "tab_title"
    }

    check_item_index( index ){
        return index === this.state.currentIndex ? "tab_item show" : "tab_item"
    }

    render(){
        return(
            <Layout>
                <Layout.Header className="header">
                    <Menu classname = "tab_title_wrap" theme="dark" mode="horizontal" defaultSelectedKeys={['2']}>
                        { 
                            React.Children.map( this.props.children , ( element,index ) => {
                                return(
                                    <Menu.Item key = {element.props.name} className ={ this.check_title_index( index )} onClick={ () => { this.setState({ currentIndex : index }) } }>
                                        {element.props.name}
                                    </Menu.Item>
                                )
                            }) 
                        }
                        <a href="/signin">Sign in</a>
                        <a href="/signup">Sign up</a>
                    </Menu>
                    
                </Layout.Header>
                <Layout.Content className = "tab_item_wrap">
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