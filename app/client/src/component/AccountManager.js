import React, { Component } from 'react';
import Switch from 'react-switch';
import '../css/content.css';

class AccountManager extends Component {
    constructor(props) {
        super(props);

        this.user = this.props.user;

        this.state = {
            isEditMode: false,
        }
    }

    renderButton() {
        let newState = true;
        let buttonMessage = "Edit Settings";

        if (this.state.isEditMode) {
            newState = false;
            buttonMessage = "Save";
        }

        return (
            <button
            className="web-button"
            style={{fontSize: 20}}
            onClick={() => this.setState({isEditMode: newState})}>{buttonMessage}</button>
        )
    }
    
    renderProfile() {
        const number = this.user.phone;
        const numberWithSpaces = `${number.slice(0,4)} ${number.slice(4,7)} ${number.slice(-3)}`;

        return (
            <table>
                <tbody>
                    <tr>
                        <th>Name</th>
                        <td>{this.user.name}</td>
                    </tr>
                    <tr>
                        <th>Email</th>
                        <td>{this.user.email}</td>
                    </tr>
                    <tr>
                        <th>Contact Phone</th>
                        <td>{numberWithSpaces}</td>
                    </tr>
                    <tr>
                        <th>Password</th>
                        <td>*********</td>
                    </tr>
                </tbody>
            </table>
        )
    }

    renderEditProfile() {
        const number = this.user.phone;
        const numberWithSpaces = `${number.slice(0,4)} ${number.slice(4,7)} ${number.slice(-3)}`;

        return (
            <form>
                <table>
                    <tbody>
                        <tr>
                            <th>Name</th>
                            <td><input type="text" name="name" value={this.user.name} readOnly /></td>
                        </tr>
                        <tr>
                            <th>Email</th>
                            <td><input type="text" name="email" value={this.user.email} readOnly /></td>
                        </tr>
                        <tr>
                            <th>Contact Phone</th>
                            <td><input type="text" name="phone" value={numberWithSpaces} readOnly /></td>
                        </tr>
                        <tr>
                            <th>Password</th>
                            <td><input type="password" name="name" value={this.user.password} readOnly /></td>
                        </tr>
                    </tbody>
                </table>
            </form>
        )
    }

    renderBilling() {
        return (
            <table>
                <tbody>
                    <tr>
                        <th>Card Number</th>
                        <td>**** **** **** {this.user.billing.number.slice(-4)}</td>
                    </tr>
                    <tr>
                        <th>Expiry Date</th>
                        <td>{this.user.billing.expMonth}/{this.user.billing.expYear}</td>
                    </tr>
                    <tr>
                        <th>CVV</th>
                        <td>***</td>
                    </tr>
                </tbody>
            </table>
        )
    }

    renderEditBilling() {
        const number = this.user.billing.number;
        const numberWithSpaces = `${number.slice(0,4)} ${number.slice(4,8)} ${number.slice(8,12)} ${number.slice(-4)}`;

        return (
            <form>
                <table>
                    <tbody>
                        <tr>
                            <th>Card Number</th>
                            <td><input type="text" name="card-number" value={numberWithSpaces} readOnly /></td>
                        </tr>
                        <tr>
                            <th>Expiry Date</th>
                            <td>
                                <input className="two-digit" type="text" name="exp-month" value={this.user.billing.expMonth} readOnly />/
                                <input className="two-digit" type="text" name="exp-year" value={this.user.billing.expYear} readOnly />
                            </td>
                        </tr>
                        <tr>
                            <th>CVV</th>
                            <td><input className="three-digit" type="text" name="cvv" value={this.user.billing.cvv} readOnly /></td>
                        </tr>
                    </tbody>
                </table>
            </form>
        )
    }

    renderNotification() {
        return (
            <table>
                <tbody>
                    <tr>
                        <th>Web</th>
                        <td>Always enabled</td>
                    </tr>
                    <tr>
                        <th>Email</th>
                        <td><Switch height={25} onChange={this.props.toggleEmailSwitch} checked={this.user.notif.email} /></td>
                    </tr>
                    <tr>
                        <th>SMS</th>
                        <td><Switch height={25} onChange={this.props.togglePhoneSwitch} checked={this.user.notif.phone} /></td>
                    </tr>
                </tbody>
            </table>
        )
    }

    render() {
        const isEditMode = this.state.isEditMode;

        const containerStyle = {
            display: "flex",
            flexFlow: "row nowrap",
            justifyContent: "space-between",
        }

        const itemStyle = {
            width: "48%",
        }

        return (
            <div className="content">
                <h1>Account Settings</h1>

                <div style={containerStyle}>
                
                    <div style={itemStyle}>
                        <div className="section-heading">PROFILE</div>
                        <hr />
                        <div className="section">
                            {isEditMode ? this.renderEditProfile() : this.renderProfile()}
                        </div>
                    </div>

                    <div style={itemStyle}>
                        <div className="section-heading">NOTIFICATIONS</div>
                        <hr />
                        <div className="section">
                            {this.renderNotification()}
                        </div>
                    </div>
                </div>

                <div className="section-heading">BILLING DETAILS</div>
                <hr />
                <div className="section">
                    {isEditMode ? this.renderEditBilling() : this.renderBilling()}
                </div>
                {this.renderButton()}
            </div>
        )
    }
}

export default AccountManager;