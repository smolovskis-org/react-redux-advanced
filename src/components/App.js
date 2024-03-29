import React, {Component} from 'react';
import {Link, Route} from 'react-router-dom';
import {connect} from 'react-redux';
import CommentBox from 'components/CommentBox';
import CommentList from 'components/CommentList';
import * as actions from 'actions';

class App extends Component {
    renderHeader() {
        return (
            <ul>
                <li>
                    <Link to="/">Home</Link>
                </li>
                <li>
                    <Link to="/post">Post A Comment</Link>
                </li>
                <li>
                    {this.renderButton()}
                </li>
            </ul>
        )
    }

    render() {
        return (
            <div>
                {this.renderHeader()}
                <Route path="/post" component={CommentBox}/>
                <Route path="/" component={CommentList}/>
            </div>
        )
    }

    renderButton() {
        if (this.props.auth) {
            return (
                <button onClick={() => this.props.changeAuth(false)}>Sign Out</button>
            )
        } else {
            return (
                <button onClick={() => this.props.changeAuth(true)}>Sign In</button>
            )
        }
    }
}

function mapStateToProps(state) {
    return {auth: state.auth};
}

export default connect(mapStateToProps, actions)(App);