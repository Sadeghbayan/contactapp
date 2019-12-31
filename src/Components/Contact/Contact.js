import React, {Component} from 'react';
import { Tabs, Spin } from 'antd';
import styles from './Contact.module.scss'
import ContactItem from '../ContactItem/ContactItem'
import {CONFIG} from '../../Config'
const { TabPane } = Tabs;



class Contact extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isItemContentVisible: "",
            showUserCard:false
        }
    }
    componentDidMount() {
        this.props.fetchContactsRequest()
    }

    displayUserCard = (id) => {
        this.setState({
            isItemContentVisible: id,
            showUserCard: !this.state.showUserCard ? true : true
        });
    }

    closeUserCard = () => {
        this.setState({
            isItemContentVisible: null,
            showUserCard: this.state.showUserCard? false : false
        })

    }

    renderSplit(arr) {

        const secondColumnStart = Math.floor(arr.length / 2);
        return (
            <ul className={styles.listWrapper}>
                <li className={styles.listItem}>
                    {arr.slice(0,secondColumnStart).map(item => (
                            <ContactItem
                                item={item}
                                showUserCard={this.state.showUserCard}
                                isItemContentVisible={this.state.isItemContentVisible}
                                key={item.login.uuid}
                                displayUserCard={this.displayUserCard}
                                closeUserCard={this.closeUserCard}
                            />
                        )
                    )}



                </li>
                <li className={styles.listItem}>
                    {arr.slice(secondColumnStart).map(item =>(
                        <ContactItem
                            item={item}
                            showUserCard={this.state.showUserCard}
                            isItemContentVisible={this.state.isItemContentVisible}
                            key={item.login.uuid}
                            displayUserCard={this.displayUserCard}
                            closeUserCard={this.closeUserCard}
                        />
                    ))}
                </li>
            </ul>
        );
    }


    render() {
        return (
            <div className="container margin--top">

                <h4 className={styles.title}>
                    {CONFIG.title}
                </h4>

                {
                    this.props.contacts.contacts ? (
                        <Tabs type="card" defaultActiveKey="1">
                            {this.props.contacts.contacts.tabs.map(i => (
                                <TabPane tab={
                                    <div className={styles.tabItem}>
                                          <span class={styles.tabItemChar}>{i}</span> <span className={styles.tabItemLength}> {this.props.contacts.contacts.contactArray[i].length}</span>
                                    </div>
                                     } disabled={this.props.contacts.contacts.contactArray[i].length === 0} key={i}>

                                    {this.props.contacts.contacts.contactArray[i].length > 0 ?(
                                        <div>
                                            {this.renderSplit(this.props.contacts.contacts.contactArray[i])}
                                        </div>
                                    ) : null}
                                </TabPane>
                            ))}
                        </Tabs>
                    ) : (
                        <div className="text-center">
                            <Spin/> Loading ...
                        </div>
                    )
                }



            </div>
        );
    }
}

export default Contact;