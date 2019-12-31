import React, {Component} from 'react';
import styles from "./ContactItem.module.scss";
import {Icon} from "antd";
import PropTypes from 'prop-types';
import {makeStringtoUpperCase} from '../../util'


class ContactItem extends Component {

    displayUserCard = (e, id) => {
        e.stopPropagation();
        this.props.displayUserCard(id)
    }

    closeUserCard = (e) => {
        e.stopPropagation();
        this.props.closeUserCard()
    }

    render() {
        const { item, showUserCard, isItemContentVisible } = this.props;
        return (
            <div>
                <div
                    key={item.login.uuid}
                    onClick={(e) => this.displayUserCard(e, item.login.uuid)}
                    className={`${styles.listItemInner} ${isItemContentVisible === item.login.uuid ? styles.autoHeight : styles.fixedHeight}`}
                >
                    <span>{item.name.last}, {makeStringtoUpperCase(item.name.first)}</span>

                    {isItemContentVisible === item.login.uuid && showUserCard ?
                        (
                            <div className={styles.contactCard}>
                                <span onClick={(e) => this.closeUserCard(e)}
                                      className={styles.closeIcon}>
                                    <Icon type="close"/>
                                </span>
                                <div className={styles.photo}>
                                    <img src={item.picture.medium} alt={`${item.name.first} ${item.name.last}`}/>
                                </div>
                                <div className={styles.information}>
                                    <div className={styles.fullname}>{makeStringtoUpperCase(item.name.first)}, {item.name.last}</div>
                                    <div className={styles.item}>
                                        <label>e-mail</label>
                                        <span>{item.email}</span>
                                    </div>
                                    <div className={styles.item}>
                                        <label>phone</label>
                                        <span>{item.phone}</span>
                                    </div>
                                    <div className={styles.item}>
                                        <label>street</label>
                                        <span>{item.location.street.number} {item.location.street.name}</span>
                                    </div>
                                    <div className={styles.item}>
                                        <label>city</label>
                                        <span>{item.location.city}</span>
                                    </div>
                                    <div className={styles.item}>
                                        <label>state</label>
                                        <span>{item.location.state}</span>
                                    </div>
                                    <div className={styles.item}>
                                        <label>postcode</label>
                                        <span>{item.location.postcode}</span>
                                    </div>
                                </div>
                                <div className={styles.username}>
                                    <label>
                                        username

                                    </label>
                                    {item.login.username}
                                </div>
                            </div>
                        )
                        : null
                    }
                </div>
            </div>
        );
    }
}



ContactItem.propTypes = {
    item: PropTypes.object.isRequired,
    isItemContentVisible: PropTypes.string.isRequired,
    closeUserCard: PropTypes.func.isRequired,
    displayUserCard: PropTypes.func.isRequired,
};
export default ContactItem;