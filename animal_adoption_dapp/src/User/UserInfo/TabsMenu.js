import React from 'react';
import "./tab.css"
import {Menu} from 'antd'
import {Layout} from 'antd';

const {Header, Content, Footer, Sider} = Layout;

class TabsMenu extends React.Component{
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
            <Layout>
                <Header style={{ textAlign: 'center', backgroundColor : "White"}}>Welcome</Header>
                <Layout>   
                    <Sider theme = "light">
                        <Menu className="tab_title_wrap" mode = "vertical">
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
                    </Sider>
                    <Content className="tab_item_wrap">
                        {
                            React.Children.map(this.props.children,( element,index )=>{
                                return(
                                    <div className={ this.check_item_index( index ) }>{ element }</div>
                                )
                            })
                        }
                    </Content>
                </Layout>
                <Footer style={{ textAlign: 'center' }}>Anidopt</Footer>
            </Layout>
        )
    }
}

export default TabsMenu