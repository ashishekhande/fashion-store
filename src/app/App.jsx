import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import Header from '../components/header/header.component';

import HomePage from '../pages/homepage/homepage.component';
import ShopPage from '../pages/shop/shop.component';
import ContactPage from '../pages/contact/contact.component';
import SigninAndSignupPage from '../pages/sign-in-and-sign-up/sign-in-and-sign-up.component';
import CheckoutPage from '../pages/checkout/checkout.component';

import { setCurrentUser } from '../redux/user/user.actions';
import { getCurrentUser } from '../redux/user/user.selectors';

import { auth, createUserProfileDocument } from '../firebase/firebase.utils';

import { fetch } from "../api/api";
import './App.scss';
const API_URL = 'http://localhost:2121/'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      disc : []
    }
  }

  unsubscribeFromAuth = null;

  componentDidMount = () => {
    const { setCurrentUser } = this.props;

    this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
      // userAuth returns null when auth.signOut() is called
      if (userAuth) {
        const userRef = await createUserProfileDocument(userAuth);

        userRef.onSnapshot(snapShot => {
          setCurrentUser({ id: snapShot.id, ...snapShot.data() });
        });
      }

      setCurrentUser(userAuth);

      window.fetch(`${API_URL}getDiscounts`)
        .then(res => res.json())
        .then(data => {
          this.setState({ disc: data })
        })
        .catch(error => this.setState({ error, isLoading: false }));
    });
  };

  componentWillUnmount = async () => {
    this.unsubscribeFromAuth();
  };

  render() {
    return (
      <div className='App'>
        <Header />
        {
          <div>
            <h1>DISCOUNT AVAILABLE</h1>
            {this.state.disc.map((d, i) => {
              let seg = ['Hat', "Women" , "Men"];

              return(
                <h3 key={d.id}>
                  {seg[d.data.segment] ? seg[d.data.segment] + ' Segment For ' + d.data.forusertype  + ' User - '+ d.data.percent + '%': ''}
                </h3>
              )
            })
            }
          </div>
        }
        <Switch>
          <Route exact path='/' component={HomePage} />
          <Route path='/shop' component={ShopPage} />
          <Route exact path='/contact' component={ContactPage} />
          <Route
            exact
            path='/signIn'
            render={() =>
              this.props.currentUser ? (
                <Redirect to='/' />
              ) : (
                <SigninAndSignupPage />
              )
            }
          />
          <Route exact path='/checkout' component={CheckoutPage} />
        </Switch>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  currentUser: getCurrentUser(state)
});

const mapDispatchToProps = dispatch => ({
  setCurrentUser: user => dispatch(setCurrentUser(user))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
